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

export class Bell extends React.Component<BellProps> {
    bell: ReactNode;

    state = {
        startPosition: {
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
                            if (
                                this.state.startPosition.x === ui.x &&
                                this.state.startPosition.y === ui.y
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

    render() {
        return this.bell;
    }
}
