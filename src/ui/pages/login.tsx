import {
    IonContent,
    IonHeader,
    IonInput,
    IonPage,
    IonButton
} from "@ionic/react";
import React, { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../../business/user";
import { Topbar } from "../components/topbar";
import "./login.css";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const formRef = React.createRef<HTMLFormElement>();

    async function login(ev: FormEvent) {
        ev.preventDefault();
        const res = await loginUser(email, password);
        formRef.current!.reset();
        if (res) {
            history.push("/home");
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <Topbar title="Log in" />
            </IonHeader>
            <IonContent className="ion-padding">
                <form ref={formRef} onSubmit={login}>
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
                    <IonButton type="submit">Log in</IonButton>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </IonContent>
        </IonPage>
    );
};

export default Login;
