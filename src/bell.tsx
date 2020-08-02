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
        this.bell = (
            <IonCol>
                <Draggable
                    onStart={() => {
                        Util.notes[this.props.note].play();
                        return false;
                    }}
                >
                    <IonIcon className={this.props.cls} icon={notifications} />
                </Draggable>
            </IonCol>
        );
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
