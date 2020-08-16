import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import React from "react";
import Modal from "react-modal";
import { Redirect, Route } from "react-router-dom";
/* Theme variables */
import "./theme/variables.css";
import about from "./ui/pages/about";
import { BellMatch } from "./ui/pages/bell_match";
import homepage from "./ui/pages/home";
import login from "./ui/pages/login";

Modal.setAppElement("body");

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route
                    path="/"
                    render={() => <Redirect to="/home" />}
                    exact={true}
                />
                <Route path="/login" component={login} exact={true} />
                <Route path="/home" component={homepage} exact={true} />
                <Route path="/about" component={about} exact={true} />
                <Route path="/bell_match" component={BellMatch} exact={true} />
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
