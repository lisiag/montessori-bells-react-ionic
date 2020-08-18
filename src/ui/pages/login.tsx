import {
    IonContent,
    IonHeader,
    IonPage,
    IonInput,
    IonButton
} from "@ionic/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Topbar } from "../components/topbar";
import { loginUser } from "../../firebaseConfig";
import "./login.css";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        await loginUser(username, email, password);
    }

    return (
        <IonPage>
            <IonHeader>
                <Topbar title="Log in" />
            </IonHeader>
            <IonContent className="ion-padding">
                <IonInput
                    type="email"
                    placeholder="email"
                    onIonChange={(e: any) => setEmail(e.target.value)}
                />
                <IonInput
                    type="password"
                    placeholder="password"
                    onIonChange={(e: any) => setPassword(e.target.value)}
                />
                <IonButton onClick={login}>Log in</IonButton>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </IonContent>
        </IonPage>
    );
};

export default Login;
