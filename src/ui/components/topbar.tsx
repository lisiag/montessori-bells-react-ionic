import { IonIcon, IonLabel } from "@ionic/react";
import { home, person } from "ionicons/icons";
import React from "react";
import {
    onAuthStateChanged,
    getCurrentUser,
    User,
    logoutUser
} from "../../business/user";
import "./topbar.css";

export interface TopbarProps {
    title: string;
}

/* The main toolbar at the top of every page with unique title for each page */
export class Topbar extends React.Component<
    TopbarProps,
    { user: User | null }
> {
    constructor(props: TopbarProps) {
        super(props);
        this.state = { user: getCurrentUser() };
        onAuthStateChanged(user => {
            this.setState({ user });
        });
    }

    loginProfile() {
        const { user } = this.state;
        if (user != null) {
            let username = user.email;
            return (
                <IonLabel className="profile" onClick={logoutUser}>
                    {username}
                </IonLabel>
            );
        } else {
            return (
                <a className="button" href="/login">
                    <IonIcon icon={person} />
                    <IonLabel>Log In</IonLabel>
                </a>
            );
        }
    }

    render() {
        return (
            <div id="topbar">
                <a className="button" href="/home">
                    <IonIcon icon={home} />
                    <IonLabel>Home</IonLabel>
                </a>
                <IonLabel className="title">{this.props.title}</IonLabel>
                {this.loginProfile()}
            </div>
        );
    }
}
