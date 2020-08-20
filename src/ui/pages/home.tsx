import React from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonIcon,
    IonList,
    IonItem,
    IonLabel
} from "@ionic/react";
import { informationCircle } from "ionicons/icons";
import { Topbar } from "../components/topbar";
import "./home.css";

const homepage: React.FC = () => {
    return (
        <IonPage>
            {/* use class "home" so css knows to highlight the home icon */}
            <IonHeader className="home">
                <Topbar title="Home" />
            </IonHeader>
            <IonContent className="ion-padding">
                {/* List of Montessori Bells activities plus About page */}
                <IonList>
                    <IonItem routerLink="/bell_match/1">
                        <IonLabel>Match bell</IonLabel>
                    </IonItem>
                    <IonItem routerLink="/bell_match/3">
                        <IonLabel>Match bells: 3</IonLabel>
                    </IonItem>
                    <IonItem routerLink="/bell_match/8">
                        <IonLabel>Match bells: octave</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel className="greyOut">
                            Sort bells: high/low (Coming soon)
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel className="greyOut">
                            Sort bells: 3 (Coming soon)
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel className="greyOut">
                            Sort bells: octave (Coming soon)
                        </IonLabel>
                    </IonItem>
                    <IonItem routerLink="/make_music">
                        <IonLabel>Make music</IonLabel>
                    </IonItem>
                    <IonItem routerLink="/about">
                        <IonIcon icon={informationCircle} />
                        <IonLabel class="aboutLabel">About</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default homepage;
