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
import { Howl } from "howler";
import Draggable from "react-draggable";

export class BellMatch extends React.Component {
    labelRef: any;
    constructor(props: any) {
        super(props);
        this.labelRef = React.createRef<HTMLDivElement>();
    }

    a4 = new Howl({
        src: ["../../assets/sounds/pianoA4.mp3"]
    });

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
                                <IonItem
                                    button
                                    onClick={() => {
                                        this.a4.play();
                                    }}
                                >
                                    <IonIcon
                                        class="right_icon"
                                        icon={notifications}
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <Draggable
                                    defaultClassNameDragging=""
                                    defaultClassNameDragged=""
                                    grid={[100, 100]}
                                    onStart={() => {
                                        this.state.deltaPosition.x = 0;
                                        this.state.deltaPosition.y = 0;
                                    }}
                                    onDrag={this.handleDrag}
                                    onStop={ev => {
                                        console.log(ev);
                                        if (
                                            this.state.deltaPosition.x == 0 &&
                                            this.state.deltaPosition.y == 0
                                        ) {
                                            this.a4.play();
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
                                <IonItem
                                    button
                                    onClick={() => {
                                        this.a4.play();
                                    }}
                                >
                                    <IonIcon
                                        class="right_icon"
                                        icon={notifications}
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol></IonCol>
                            <IonCol></IonCol>
                            <IonCol>
                                <IonItem
                                    button
                                    onClick={() => {
                                        this.a4.play();
                                    }}
                                >
                                    <IonIcon
                                        class="right_icon"
                                        icon={notifications}
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        );
    }
}
