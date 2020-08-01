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

    c4 = new Howl({
        src: ["../../assets/sounds/pianoC4.mp3"]
    });
    d4 = new Howl({
        src: ["../../assets/sounds/pianoD4.mp3"]
    });
    e4 = new Howl({
        src: ["../../assets/sounds/pianoE4.mp3"]
    });
    f4 = new Howl({
        src: ["../../assets/sounds/pianoF4.mp3"]
    });
    g4 = new Howl({
        src: ["../../assets/sounds/pianoG4.mp3"]
    });
    a4 = new Howl({
        src: ["../../assets/sounds/pianoA4.mp3"]
    });
    b4 = new Howl({
        src: ["../../assets/sounds/pianoB4.mp3"]
    });
    c5 = new Howl({
        src: ["../../assets/sounds/pianoC5.mp3"]
    });

    notes = [
        this.c4,
        this.d4,
        this.e4,
        this.f4,
        this.g4,
        this.a4,
        this.b4,
        this.c5
    ];

    /*
       Get n random numbers between 0 (inclusive) and arrLen (exclusive).
       Intended for use getting n random elements from an array of length arrLen.
     */
    getRandoms = (arrLen: number, n: number) => {
        if (n > arrLen)
            throw new RangeError(
                "getRandoms: more elements taken than available"
            );
        let result = new Array(n);
        let workArr = new Array(arrLen);
        for (let i = 0; i < arrLen; ++i) {
            workArr[i] = i;
        }
        for (let i = 0; i < n; ++i) {
            let x = Math.floor(Math.random() * workArr.length);
            result[i] = workArr[x];
            // remove the number from workArr so it can't be selected again
            workArr.splice(x, 1);
        }
        return result;
    };

    /*
       Get indices for 3 random bells for the righthand column
     */
    threeRandof8 = this.getRandoms(8, 3);

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
                                <IonItem
                                    button
                                    onClick={() => {
                                        this.notes[this.threeRandof8[0]].play();
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
                                            this.notes[this.oneRand].play();
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
                                        this.notes[this.threeRandof8[1]].play();
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
                                        this.notes[this.threeRandof8[2]].play();
                                        for (const num of this.threeRandof8) {
                                            console.log(num);
                                        }
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
