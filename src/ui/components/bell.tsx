import { IonCol } from "@ionic/react";
import { Howl } from "howler";
import React from "react";
import Draggable, { DraggableData } from "react-draggable";
import { Util } from "../../business/util";
import "./bell.css";

export interface BellProps {
    note: number;
    cls: string;
}

const LEFT_BOUND = 10;
const TOP_BOUND = 7;
const RIGHT_BOUND_FACTOR = 2.12;

export class Bell extends React.Component<BellProps> {
    /* Definite assignment assertion so howl can be initialized in a function separate from constructor */
    howl!: Howl;
    currentNote = -1;

    startPosition = {
        x: 0,
        y: 0
    };
    controlledPosition = {
        x: 0,
        y: 0
    };

    constructor(props: BellProps) {
        super(props);
        this.changeNote(props.note);
    }

    private changeNote(note: number) {
        this.currentNote = note;
        this.howl = new Howl({
            src: [Util.notes[this.currentNote].soundLocation]
        });
        this.startPosition = {
            x: 0,
            y: 0
        };
        this.controlledPosition = {
            x: 0,
            y: 0
        };
    }

    onStart(ui: DraggableData) {
        this.startPosition = {
            x: ui.x,
            y: ui.y
        };
    }

    onStop(ui: DraggableData) {
        /* only play the note if bell is clicked but not dragged */
        if (this.startPosition.x === ui.x && this.startPosition.y === ui.y) {
            this.howl.play();
        } else {
            /* Bell has been dragged.
             * If it has been dragged next to one of the righthand bells, snap it to sit immediately to the left of that bell.
             * If it has been dragged outside the clear space left of the righthand bells, snap it back into that space. */
            let { x, y } = this.positionBell(ui);
            this.controlledPosition.x = x;
            this.controlledPosition.y = y;
        }
    }

    /* If bell is close to or overlapping righthand bells:
     *     if it is close to a righthand bell: adjust x and y so it is aligned vertically with that bell and sitting immediately to the left of that bell
     *     else if it is overlapping or beyond the righthand bells: snap x back to the left of the righthand bells
     * Else if bell is beyond grid to the left: snap x back to within grid
     * If bell is beyond grid to the top/bottom: snap y back to within grid
     */
    positionBell(ui: DraggableData): { x: number; y: number } {
        const grid = ui.node.closest("ion-grid")!;
        const gridBound = grid.getBoundingClientRect();
        const bound = ui.node.getBoundingClientRect();
        let { x, y } = ui;

        if (bound.right > gridBound.right - 1.6 * bound.width) {
            /* Bell is close to or overlapping righthand bells */
            ({ x, y } = this.positionBellRight(ui));
        } else if (bound.left < gridBound.left) {
            /* If bell is off screen to the left, snap bell back just inside screen */
            x = -LEFT_BOUND;
        }
        /* If y has not been modified by positionBellRight() above, check whether bell is off screen
        to the top or bottom and snap bell back just inside screen */
        if (y === ui.y) {
            if (bound.top < gridBound.top) {
                y += gridBound.top - bound.top - TOP_BOUND;
            } else if (bound.bottom > gridBound.bottom) {
                y += gridBound.bottom - bound.bottom;
            }
        }

        return { x, y };
    }

    /* If bell is close to or overlapping righthand bells:
     *     if it is close to a righthand bell: adjust x and y so it is aligned vertically with that bell and sitting immediately to the left of that bell
     *     else if it is overlapping or beyond the righthand bells: snap x back to the left of the righthand bells
     */
    positionBellRight(ui: DraggableData): { x: number; y: number } {
        const bound = ui.node.getBoundingClientRect();
        let { x, y } = ui;
        const grid = ui.node.closest("ion-grid")!;
        /* get all the bells in the right column */
        const fixedBells = grid.getElementsByClassName("fixedBell");

        /* find which of the bells in the right column is closest */
        let closestBound = fixedBells[0].getBoundingClientRect();
        let minVertDiff = Math.abs(bound.top - closestBound.top);
        for (let i = 1; i < fixedBells.length; ++i) {
            const rBellBound = fixedBells[i].getBoundingClientRect();
            const vertDiff = Math.abs(bound.top - rBellBound.top);
            if (vertDiff < minVertDiff) {
                minVertDiff = vertDiff;
                closestBound = rBellBound;
            }
        }

        const vertDiff = bound.top - closestBound.top;
        const horizDiff = bound.left - closestBound.left;
        const gridBoundRight = grid.getBoundingClientRect().right;
        if (Math.abs(vertDiff) < 40 && Math.abs(horizDiff) < 150) {
            /* Bell is close to closest, so adjust bell's x and y such that it aligns vertically with closest and sits immediately left of it */
            x = gridBoundRight - RIGHT_BOUND_FACTOR * bound.width;
            y = y - vertDiff;
        } else if (bound.right > gridBoundRight - 0.9 * bound.width) {
            /* Bell is overlapping or beyond the righthand bells, so adjust bell's x so it is to the left of the righthand bells */
            x = gridBoundRight - RIGHT_BOUND_FACTOR * bound.width;
        }

        return { x, y };
    }

    bellSvg(type: string) {
        const id = type;
        let color1 = "#1e90ff";
        let color2 = "#1e50af";
        if (type === "draggableBell") {
            color1 = "#42dd42";
            color2 = "#329d32";
        }
        return (
            <div className={`${type} note${this.props.note}`}>
                {/* This is the svg that Ionic uses for its "notifications" icon. There are many
                other bell images available online. I like this one because it is clear and simple.
                I use the svg directly rather than through IonIcon so that I can modify its
                appearance with a gradient of color and a shadow border.  Shadow root seems to
                prevent that if I use IonIcon here. */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    /* Define the colour gradient that gives the bells a nice
                    appearance and a sort of 3D feel. */
                    <defs>
                        <linearGradient id={id}>
                            <stop offset="5%" stopColor={color1} />
                            <stop offset="95%" stopColor={color2} />
                        </linearGradient>
                    </defs>
                    <path
                        fill={`url(#${id})`}
                        d="M440.08 341.31c-1.66-2-3.29-4-4.89-5.93-22-26.61-35.31-42.67-35.31-118 0-39-9.33-71-27.72-95-13.56-17.73-31.89-31.18-56.05-41.12a3 3 0 01-.82-.67C306.6 51.49 282.82 32 256 32s-50.59 19.49-59.28 48.56a3.13 3.13 0 01-.81.65c-56.38 23.21-83.78 67.74-83.78 136.14 0 75.36-13.29 91.42-35.31 118-1.6 1.93-3.23 3.89-4.89 5.93a35.16 35.16 0 00-4.65 37.62c6.17 13 19.32 21.07 34.33 21.07H410.5c14.94 0 28-8.06 34.19-21a35.17 35.17 0 00-4.61-37.66zM256 480a80.06 80.06 0 0070.44-42.13 4 4 0 00-3.54-5.87H189.12a4 4 0 00-3.55 5.87A80.06 80.06 0 00256 480z"
                    ></path>
                </svg>
            </div>
        );
    }

    render() {
        if (this.howl == null || this.currentNote !== this.props.note) {
            this.changeNote(this.props.note);
        }

        if (this.props.cls === "draggable") {
            // create a draggable bell in the left column - that can be dragged around the screen
            return (
                <IonCol>
                    <Draggable
                        position={this.controlledPosition}
                        defaultClassNameDragging=""
                        defaultClassNameDragged=""
                        onStart={(_ev, ui) => {
                            this.onStart(ui);
                        }}
                        onStop={(_ev, ui) => {
                            this.onStop(ui);
                        }}
                    >
                        {this.bellSvg("draggableBell")}
                    </Draggable>
                </IonCol>
            );
        } else {
            // create a fixed bell in the right column - that cannot be dragged around the screen
            return (
                <IonCol>
                    <Draggable
                        onStart={() => {
                            this.howl.play();
                            return false;
                        }}
                    >
                        {this.bellSvg("fixedBell")}
                    </Draggable>
                </IonCol>
            );
        }
    }
}
