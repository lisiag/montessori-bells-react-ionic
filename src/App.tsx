import React from "react";
import { Redirect, Route } from "react-router-dom";
import Modal from "react-modal";
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { person, home } from "ionicons/icons";
import login from "./ui/pages/login";
import homepage from "./ui/pages/home";
import about from "./ui/pages/about";
import { BellMatch } from "./ui/pages/bell_match";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

Modal.setAppElement("body");

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route
                        path="/"
                        render={() => <Redirect to="/home" />}
                        exact={true}
                    />
                    <Route path="/login" component={login} exact={true} />
                    <Route path="/home" component={homepage} exact={true} />
                    <Route path="/about" component={about} exact={true} />
                    <Route
                        path="/bell_match"
                        component={BellMatch}
                        exact={true}
                    />
                </IonRouterOutlet>
                <IonTabBar slot="top">
                    <IonTabButton tab="home" href="/home">
                        <IonIcon icon={home} />
                        <IonLabel>Home</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="login" href="/login">
                        <IonIcon icon={person} />
                        <IonLabel>Log In</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default App;
