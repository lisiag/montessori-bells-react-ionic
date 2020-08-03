import React from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel
} from "@ionic/react";
import "./home.css";

const homepage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Activities</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {/* List of Montessori Bells activities */}
                <IonList>
                    <IonItem routerLink="/bell_match">
                        <IonLabel>Match bell</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Match bells: 3</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Match bells: octave</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Sort bells: high/low</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Sort bells: 3</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Sort bells: octave</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Make music</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default homepage;
