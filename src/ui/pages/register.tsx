import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonPage
} from "@ionic/react";
import React, { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Topbar } from "../components/topbar";
import { registerUser } from "../../business/user";
import { toast } from "../components/toast";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const history = useHistory();
    const formRef = React.createRef<HTMLFormElement>();

    /* When Register button is tapped */
    async function register(ev: FormEvent) {
        ev.preventDefault();
        let res = false;
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
            res = await registerUser(username, email, password);
        }
        if (res) {
            formRef.current!.reset();
            history.push("/home");
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <Topbar title="Register" />
            </IonHeader>
            <IonContent className="ion-padding">
                <form ref={formRef} onSubmit={register}>
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
                        placeholder="confirm password"
                        onIonChange={(e: any) => setCPassword(e.target.value)}
                    />
                    <IonButton type="submit">Register</IonButton>
                    <p>
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default Register;
