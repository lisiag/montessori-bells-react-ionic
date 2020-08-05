import { IonCol, IonIcon } from "@ionic/react";
import { notifications } from "ionicons/icons";
import React, { ReactNode } from "react";
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

export class Bell extends React.Component<BellProps> {
    bell: ReactNode;
    howl: Howl;

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
        this.howl = new Howl({ src: [Util.notes[props.note].soundLocation] });
    }

    alignYIfClose(ui: DraggableData): number {
        const bound = ui.node.getBoundingClientRect();
        /* get all the bells in the right column */
        const rightBells = ui.node
            .closest("ion-grid")!
            .getElementsByClassName("rightBell");

        /* find which of the bells in the right column is closest */
        let closest = rightBells[0];
        let minDiff = 1000000;
        for (let i = 0; i < rightBells.length; ++i) {
            const rBellBound = rightBells[i].getBoundingClientRect();
            const currentDiff = Math.abs(bound.top - rBellBound.top);
            if (currentDiff < minDiff) {
                minDiff = currentDiff;
                closest = rightBells[i];
            }
        }

        /* Adjust my y such that I align with the closest bell in the right column */
        const diff = bound.top - closest.getBoundingClientRect().top;
        return ui.y - diff;
    }

    render() {
        if (this.props.cls === "left_icon") {
            // create a bell in the left column that can be dragged around the screen
            return (
                <IonCol>
                    <Draggable
                        position={this.controlledPosition}
                        defaultClassNameDragging=""
                        defaultClassNameDragged=""
                        onStart={(_ev, ui) => {
                            this.startPosition = {
                                x: ui.x,
                                y: ui.y
                            };
                        }}
                        onStop={(_ev, ui) => {
                            /* only play the note if bell is clicked but not dragged */
                            if (
                                this.startPosition.x === ui.x &&
                                this.startPosition.y === ui.y
                            ) {
                                this.howl.play();
                            } else {
                                {
                                    /* Bell has been dragged. */
                                    /* If it has been dragged off screen, snap it back to edge of screen. */
                                }
                                let { x, y } = ui;
                                const grid = ui.node.closest("ion-grid")!;
                                const gridBound = grid.getBoundingClientRect();
                                const bound = ui.node.getBoundingClientRect();

                                if (
                                    bound.right >
                                    gridBound.right - 1.6 * bound.width
                                ) {
                                    x = gridBound.right - 2.3 * bound.width;
                                    y = this.alignYIfClose(ui);
                                } else {
                                    if (bound.left < gridBound.left) {
                                        /* snap bell back */
                                        x = -LEFT_BOUND;
                                    }
                                    if (bound.top < gridBound.top) {
                                        y = -TOP_BOUND;
                                    } else if (
                                        bound.bottom > gridBound.bottom
                                    ) {
                                        y += gridBound.bottom - bound.bottom;
                                    }
                                }
                                this.controlledPosition.x = x;
                                this.controlledPosition.y = y;
                            }
                        }}
                    >
                        <IonIcon
                            className={this.props.cls}
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
                            className={this.props.cls + " rightBell"}
                            icon={notifications}
                        />
                    </Draggable>
                </IonCol>
            );
        }
    }
}
