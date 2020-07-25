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
        <IonList>
          <IonItem
            button
            onClick={() => {
              a4.play();
            }}
          >
            <IonIcon class="icon" icon={notifications} />
          </IonItem>
          <IonLabel id="testLabel">Change me.</IonLabel>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default bell_match_1;
