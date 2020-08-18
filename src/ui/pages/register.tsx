import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonPage
} from "@ionic/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Topbar } from "../components/topbar";
import { registerUser } from "../../business/user";
import { toast } from "../components/toast";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");

    async function register() {
        // validation
        if (password !== cpassword) {
            toast("Passwords do not match");
        }
        if (
            username.trim() === "" ||
            email.trim() === "" ||
            password.trim() === ""
        ) {
            toast("Username, email and password are required");
        } else {
            await registerUser(username, email, password);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <Topbar title="Register" />
            </IonHeader>
            <IonContent className="ion-padding">
                <IonInput
                    placeholder="username"
                    onIonChange={(e: any) => setUsername(e.target.value)}
                />
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
                <IonInput
                    type="password"
                    placeholder="cofirm password"
                    onIonChange={(e: any) => setCPassword(e.target.value)}
                />
                <IonButton onClick={register}>Register</IonButton>
                <p>
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </IonContent>
        </IonPage>
    );
};

export default Register;
