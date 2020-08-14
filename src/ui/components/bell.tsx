import { IonCol, IonIcon } from "@ionic/react";
import { notifications } from "ionicons/icons";
import React from "react";
import Draggable, { DraggableData } from "react-draggable";
import { Howl } from "howler";
import "./bell.css";
import { Util } from "../../business/util";

export interface BellProps {
    note: number;
    cls: string;
}

const LEFT_BOUND = 10;
const TOP_BOUND = 125;
const RIGHT_BOUND_FACTOR = 2.25;

export class Bell extends React.Component<BellProps> {
    /* Definite assignment assertion so I can initialize in my own function, not in constructor */
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
        /* If bell is off screen to the top or bottom, snap bell back just inside screen */
        if (bound.top < gridBound.top) {
            y = -TOP_BOUND;
        } else if (bound.bottom > gridBound.bottom) {
            y += gridBound.bottom - bound.bottom;
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
        const rightBells = grid.getElementsByClassName("rightBell");

        /* find which of the bells in the right column is closest */
        let closestBound = rightBells[0].getBoundingClientRect();
        let minVertDiff = Math.abs(bound.top - closestBound.top);
        for (let i = 1; i < rightBells.length; ++i) {
            const rBellBound = rightBells[i].getBoundingClientRect();
            const vertDiff = Math.abs(bound.top - rBellBound.top);
            if (vertDiff < minVertDiff) {
                minVertDiff = vertDiff;
                closestBound = rBellBound;
            }
        }

        const vertDiff = bound.top - closestBound.top;
        const horizDiff = bound.left - closestBound.left;
        const gridBoundRight = grid.getBoundingClientRect().right;
        if (Math.abs(vertDiff) < 20 && Math.abs(horizDiff) < 100) {
            /* Bell is close to closest, so adjust bell's x and y such that it aligns vertically with closest and sits immediately left of it */
            x = gridBoundRight - RIGHT_BOUND_FACTOR * bound.width;
            y = ui.y - vertDiff;
        } else if (bound.right > gridBoundRight - 1.1 * bound.width) {
            /* Bell is overlapping or beyond the righthand bells, so adjust bell's x so it is to the left of the righthand bells */
            x = gridBoundRight - RIGHT_BOUND_FACTOR * bound.width;
        }

        return { x, y };
    }

    render() {
        if (this.howl == null || this.currentNote !== this.props.note) {
            this.changeNote(this.props.note);
        }

        if (this.props.cls === "left_icon") {
            // create a bell in the left column that can be dragged around the screen
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
                        <IonIcon
                            className={this.props.cls + " bell"}
                            icon={notifications}
                        />
                    </Draggable>
                </IonCol>
            );
        } else {
            // create a bell in the right column that cannot be dragged around the screen
            return (
                <IonCol>
                    <Draggable
                        onStart={() => {
                            this.howl.play();
                            return false;
                        }}
                    >
                        <IonIcon
                            className={this.props.cls + " rightBell bell"}
                            icon={notifications}
                        />
                    </Draggable>
                </IonCol>
            );
        }
    }
}
