import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import './bell_match_1.css';

const bell_match_1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Match bell</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Match bell</IonTitle>
          </IonToolbar>
        </IonHeader>

          <IonImg id="test" src="../../assets/img/bell.jpg" alt="golden bell" />


      </IonContent>
    </IonPage>
  );
};

export default bell_match_1;
