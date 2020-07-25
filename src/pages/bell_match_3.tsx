import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import "./bell_match_3.css";

const bell_match_3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Match bells</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding"></IonContent>
    </IonPage>
  );
};

export default bell_match_3;
