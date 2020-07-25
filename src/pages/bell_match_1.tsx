import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon
} from "@ionic/react";
import { notifications } from "ionicons/icons";
import React from "react";
import "./bell_match_1.css";

const labelRef = React.createRef<HTMLDivElement>();

const bell_match_1: React.FC = () => {
  return (
    <IonPage ref={labelRef}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Match bell first title</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem
            button
            onClick={() => {
              const label = labelRef.current?.querySelector("#testLabel");
              label!.textContent = "BOO";
            }}
          >
            <IonIcon class="icon" size="large" icon={notifications} />
          </IonItem>
          <IonLabel id="testLabel">Change me.</IonLabel>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default bell_match_1;
