import { IonIcon, IonLabel } from "@ionic/react";
import { home, person } from "ionicons/icons";
import React from "react";
import "./topbar.css";

export interface TopbarProps {
    title: string;
}

/* The main toolbar at the top of every page with unique title for each page */
export class Topbar extends React.Component<TopbarProps> {
    render() {
        return (
            <div id="topbar">
                <a className="button" href="/home">
                    <IonIcon icon={home} />
                    <IonLabel>Home</IonLabel>
                </a>
                <IonLabel className="title">{this.props.title}</IonLabel>
                <a className="button" href="/login">
                    <IonIcon icon={person} />
                    <IonLabel>Log In</IonLabel>
                </a>
            </div>
        );
    }
}
