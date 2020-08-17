import {
    IonContent,
    IonHeader,
    IonPage,
    IonInput,
    IonButton
} from "@ionic/react";
import React, { useState } from "react";
import { Topbar } from "../components/topbar";
import "./login.css";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let registerUser = () => {
        console.log(username, password);
    };

    return (
        <IonPage>
            <IonHeader>
                <Topbar title="" />
            </IonHeader>
            <IonContent className="ion-padding">
                <IonInput
                    placeholder="username"
                    onIonChange={(e: any) => setUsername(e.target.value)}
                />
                <IonInput
                    type="password"
                    placeholder="password"
                    onIonChange={(e: any) => setPassword(e.target.value)}
                />
                <IonButton onClick={registerUser}>Register</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Login;
