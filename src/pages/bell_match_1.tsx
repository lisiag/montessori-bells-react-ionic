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
import { Howl, Howler } from "howler";

const labelRef = React.createRef<HTMLDivElement>();
const a4 = new Howl({
    src: ["../../assets/sounds/pianoA4.mp3"]
});

const bell_match_1: React.FC = () => {
    return (
        <IonPage ref={labelRef}>
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
                                    a4.play();
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
                            <IonItem
                                button
                                onClick={() => {
                                    a4.play();
                                }}
                            >
                                <IonIcon
                                    class="left_icon"
                                    icon={notifications}
                                />
                            </IonItem>
                        </IonCol>
                        <IonCol></IonCol>
                        <IonCol>
                            <IonItem
                                button
                                onClick={() => {
                                    a4.play();
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
                                    a4.play();
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
};

export default bell_match_1;
