import {
    IonContent,
    IonHeader,
    IonGrid,
    IonRow,
    IonCol,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React from "react";
import "./bell_match.css";
import { Util } from "../util";
import { Bell } from "../bell";

export class BellMatch extends React.Component {
    labelRef: any;
    constructor(props: any) {
        super(props);
        this.labelRef = React.createRef<HTMLDivElement>();
    }

    /*
       Get 3 random notes for the bells in the righthand column
     */
    threeRandof8 = Util.getRandoms(8, 3);

    /*
       Pick a random note from the three bells in the righthand column, for the user to match
     */
    randNote = this.threeRandof8[Math.floor(Math.random() * 3)];

    render() {
        return (
            <IonPage ref={this.labelRef}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Pair the matching bells</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonGrid>
                        <IonRow>
                            <IonCol></IonCol>
                            <IonCol></IonCol>
                            <Bell
                                note={this.threeRandof8[0]}
                                cls="right_icon"
                            />
                        </IonRow>
                        <IonRow>
                            <Bell note={this.randNote} cls="left_icon" />
                            <IonCol></IonCol>
                            <Bell
                                note={this.threeRandof8[1]}
                                cls="right_icon"
                            />
                        </IonRow>
                        <IonRow>
                            <IonCol></IonCol>
                            <IonCol></IonCol>
                            <Bell
                                note={this.threeRandof8[2]}
                                cls="right_icon"
                            />
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        );
    }
}
