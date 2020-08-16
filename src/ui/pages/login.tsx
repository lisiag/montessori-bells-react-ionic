import React from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { Topbar } from "../components/topbar";
import "./login.css";

const login: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <Topbar title="" />
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
