import { IonCol, IonIcon } from "@ionic/react";
import { notifications } from "ionicons/icons";
import React, { ReactNode } from "react";
import Draggable from "react-draggable";
import "./bell.css";
import { Util } from "./util";

export interface BellProps {
    note: number;
    cls: string;
}

export class Bell extends React.Component<BellProps> {
    bell: ReactNode;

    constructor(props: BellProps) {
        super(props);
        if (this.props.cls === "left_icon") {
            // create a bell in the left column that can be dragged around the screen
            this.bell = (
                <IonCol>
                    <Draggable
                        defaultClassNameDragging=""
                        defaultClassNameDragged=""
                        onStart={() => {
                            this.setState({
                                deltaPosition: {
                                    x: 0,
                                    y: 0
                                }
                            });
                        }}
                        onDrag={this.handleDrag}
                        onStop={ev => {
                            if (
                                this.state.deltaPosition.x === 0 &&
                                this.state.deltaPosition.y === 0
                            ) {
                                Util.notes[this.props.note].play();
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

    state = {
        deltaPosition: {
            x: 0,
            y: 0
        }
    };

    handleDrag = (e: any, ui: any) => {
        this.setState({
            deltaPosition: {
                x: ui.deltaX,
                y: ui.deltaY
            }
        });
    };

    render() {
        return this.bell;
    }
}
