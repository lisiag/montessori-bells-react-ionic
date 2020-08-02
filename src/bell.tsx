import { IonCol, IonIcon } from "@ionic/react";
import { notifications } from "ionicons/icons";
import React, { ReactNode } from "react";
import { Util } from "./util";
import Draggable from "react-draggable";

export class Bell extends React.Component {
    bell: ReactNode;
    constructor(props: any) {
        super(props);
        this.bell = (
            <IonCol>
                <Draggable
                    onStart={() => {
                        Util.notes[this.threeRandof8[0]].play();
                        return false;
                    }}
                >
                    <IonIcon className="right_icon" icon={notifications} />
                </Draggable>
            </IonCol>
        );
    }

    /*
       Get indices for 3 random bells for the righthand column
     */
    threeRandof8 = Util.getRandoms(8, 3);

    /*
       Pick a random bell from the three in the righthand column, for the user to match
     */
    randBell = this.threeRandof8[Math.floor(Math.random() * 3)];

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
}
