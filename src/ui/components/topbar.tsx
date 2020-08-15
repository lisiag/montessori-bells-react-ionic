import { IonToolbar, IonButton, IonIcon, IonLabel } from "@ionic/react";
import { home, person } from "ionicons/icons";
import React from "react";
import "./toolbar.css";

export interface TopbarProps {
    title: string;
}

/* The main toolbar at the top of every page with unique title for each page */
export class Topbar extends React.Component<TopbarProps> {
    constructor(props: TopbarProps) {
        super(props);
    }

    render() {
        return (
            <IonToolbar>
                <IonButton href="/home">
                    <IonIcon icon={home} />
                    <IonLabel>Home</IonLabel>
                </IonButton>
                <IonLabel>{this.props.title}</IonLabel>
                <IonButton href="/login">
                    <IonIcon icon={person} />
                    <IonLabel>Log In</IonLabel>
                </IonButton>
            </IonToolbar>
        );
    }
}
