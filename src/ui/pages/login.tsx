import React from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./login.css";

const login: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Log In</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Log In</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer name="Login page" />
            </IonContent>
        </IonPage>
    );
};

export default login;
