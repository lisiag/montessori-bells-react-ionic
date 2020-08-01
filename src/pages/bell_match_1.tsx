import {
    IonContent,
    IonHeader,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
    IonPage,
    IonTitle,
    IonToolbar,
    IonIcon
} from "@ionic/react";
import { notifications } from "ionicons/icons";
import React from "react";
import "./bell_match_1.css";
import { Util } from "../util";
import Draggable from "react-draggable";

export class BellMatch extends React.Component {
    labelRef: any;
    constructor(props: any) {
        super(props);
        this.labelRef = React.createRef<HTMLDivElement>();
    }

    /*
       Get indices for 3 random bells for the righthand column
     */
    threeRandof8 = Util.getRandoms(8, 3);

    /*
       Pick a random bell from the three on the right, for the user to match
     */
    oneRand = this.threeRandof8[Math.floor(Math.random() * 3)];

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
        return (
            <IonPage ref={this.labelRef}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Match bell first title</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonGrid>
                        <IonRow>
                            <IonCol></IonCol>
                            <IonCol></IonCol>
                            <IonCol>
                                <Draggable
                                    onStart={() => {
                                        Util.notes[this.threeRandof8[0]].play();
                                        return false;
                                    }}
                                >
                                    <IonIcon
                                        className="right_icon"
                                        icon={notifications}
                                    />
                                </Draggable>
                            </IonCol>
                        </IonRow>
                        <IonRow>
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
                                        console.log(ev);
                                        if (
                                            this.state.deltaPosition.x === 0 &&
                                            this.state.deltaPosition.y === 0
                                        ) {
                                            Util.notes[this.oneRand].play();
                                        }
                                    }}
                                >
                                    <IonIcon
                                        className="left_icon"
                                        icon={notifications}
                                    />
                                </Draggable>
                            </IonCol>
                            <IonCol></IonCol>
                            <IonCol>
                                <Draggable
                                    onStart={() => {
                                        Util.notes[this.threeRandof8[1]].play();
                                        return false;
                                    }}
                                >
                                    <IonIcon
                                        className="right_icon"
                                        icon={notifications}
                                    />
                                </Draggable>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol></IonCol>
                            <IonCol></IonCol>
                            <IonCol>
                                <Draggable
                                    onStart={() => {
                                        Util.notes[this.threeRandof8[2]].play();
                                        return false;
                                    }}
                                >
                                    <IonIcon
                                        className="right_icon"
                                        icon={notifications}
                                    />
                                </Draggable>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        );
    }
}
