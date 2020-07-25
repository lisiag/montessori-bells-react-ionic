import {
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
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
              debugger;
              const label = labelRef.current?.querySelector("#testLabel");
              label!.textContent = "BOO";
            }}
          >
            <IonImg
              id="test"
              src="../../assets/img/bell.jpg"
              alt="golden bell in item"
            />
          </IonItem>
          <IonLabel id="testLabel">Change me.</IonLabel>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default bell_match_1;
