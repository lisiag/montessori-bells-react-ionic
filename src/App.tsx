import React from "react";
import { Redirect, Route } from "react-router-dom";
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
import { person, home, informationCircle } from "ionicons/icons";
import login from "./pages/login";
import homepage from "./pages/home";
import about from "./pages/about";
import { BellMatch } from "./pages/bell_match";

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
                <IonTabBar slot="bottom">
                    <IonTabButton tab="login" href="/login">
                        <IonIcon icon={person} />
                        <IonLabel>Log In</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="home" href="/home">
                        <IonIcon icon={home} />
                        <IonLabel>Home</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="about" href="/about">
                        <IonIcon icon={informationCircle} />
                        <IonLabel>About</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default App;
