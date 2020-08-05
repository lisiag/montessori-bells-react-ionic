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
        return ui.y;
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

                                if (bound.left < gridBound.left) {
                                    /* snap bell back */
                                    x = -LEFT_BOUND;
                                } else if (
                                    bound.right >
                                    gridBound.right - 1.6 * bound.width
                                ) {
                                    x = gridBound.right - 2.3 * bound.width;
                                    y = this.alignYIfClose(ui);
                                }
                                if (bound.top < gridBound.top) {
                                    y = -TOP_BOUND;
                                } else if (bound.bottom > gridBound.bottom) {
                                    y += gridBound.bottom - bound.bottom;
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
                            className={this.props.cls}
                            icon={notifications}
                        />
                    </Draggable>
                </IonCol>
            );
        }
    }
}
