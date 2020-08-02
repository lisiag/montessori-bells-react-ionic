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
import { notifications, home, informationCircle } from "ionicons/icons";
import { BellMatch } from "./pages/bell_match";
import homepage from "./pages/home";
import about from "./pages/about";

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
                        path="/bell_match"
                        component={BellMatch}
                        exact={true}
                    />
                    <Route path="/home" component={homepage} exact={true} />
                    <Route path="/about" component={about} />
                    <Route
                        path="/"
                        render={() => <Redirect to="/bell_match" />}
                        exact={true}
                    />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="bell_match" href="/bell_match">
                        <IonIcon icon={notifications} />
                        <IonLabel>Match bell</IonLabel>
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
