import { IonCol, IonIcon } from "@ionic/react";
import { notifications } from "ionicons/icons";
import React, { ReactNode } from "react";
import Draggable from "react-draggable";
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

    state = {
        startPosition: {
            x: 0,
            y: 0
        },
        controlledPosition: {
            x: 0,
            y: 0
        }
    };

    constructor(props: BellProps) {
        super(props);
        if (this.props.cls === "left_icon") {
            // create a bell in the left column that can be dragged around the screen
            this.bell = (
                <IonCol>
                    <Draggable
                        position={this.state.controlledPosition}
                        defaultClassNameDragging=""
                        defaultClassNameDragged=""
                        onStart={(ev, ui) => {
                            this.setState({
                                startPosition: {
                                    x: ui.x,
                                    y: ui.y
                                }
                            });
                        }}
                        onStop={(ev, ui) => {
                            /* only play the note if bell is clicked but not dragged */
                            if (
                                this.state.startPosition.x === ui.x &&
                                this.state.startPosition.y === ui.y
                            ) {
                                Util.notes[this.props.note].play();
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
                                }
                                if (
                                    bound.right >
                                    gridBound.right - 1.6 * bound.width
                                ) {
                                    x = gridBound.right - 2.3 * bound.width;
                                }
                                if (bound.top < gridBound.top) {
                                    y = -TOP_BOUND;
                                }
                                {
                                    /*Important note: this.setState doesn't work here for some reason! */
                                }
                                this.state.controlledPosition.x = x;
                                this.state.controlledPosition.y = y;
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
            this.bell = (
                <IonCol>
                    <Draggable
                        onStart={() => {
                            Util.notes[this.props.note].play();
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

    render() {
        return this.bell;
    }
}
