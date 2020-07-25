import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./bells.css";

const bells: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bells</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Bells</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Bells page" />
      </IonContent>
    </IonPage>
  );
};

export default bells;
