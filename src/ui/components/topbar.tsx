import { IonIcon, IonLabel } from "@ionic/react";
import { home, person } from "ionicons/icons";
import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Gravatar from "react-gravatar";
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
    gravatarDropdownOptions = [{ key: "log-out", text: "Log Out", icon: null }];
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
            let email = user.email;
            let trigger = <Gravatar className="gravatar" email={email!} />;
            return (
                <Dropdown
                    trigger={trigger}
                    options={this.gravatarDropdownOptions}
                    pointing="top right"
                    icon={null}
                    onChange={logoutUser}
                />
            );
        } else {
            return (
                <NavLink
                    className="button"
                    activeClassName="selected"
                    to="/login"
                >
                    <IonIcon icon={person} />
                    <IonLabel>Log In</IonLabel>
                </NavLink>
            );
        }
    }

    render() {
        return (
            <div id="topbar">
                <NavLink
                    className="button"
                    activeClassName="selected"
                    to="/home"
                >
                    <IonIcon icon={home} />
                    <IonLabel>Home</IonLabel>
                </NavLink>
                <IonLabel className="title">{this.props.title}</IonLabel>
                {this.loginProfile()}
            </div>
        );
    }
}
