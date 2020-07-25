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
import { ellipse, square, triangle } from "ionicons/icons";
import bell_match_1 from "./pages/bell_match_1";
import bell_match_3 from "./pages/bell_match_3";
import bells from "./pages/bells";

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
          <Route path="/bell_match_1" component={bell_match_1} exact={true} />
          <Route path="/bell_match_3" component={bell_match_3} exact={true} />
          <Route path="/bells" component={bells} />
          <Route
            path="/"
            render={() => <Redirect to="/bell_match_1" />}
            exact={true}
          />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="bell_match_1" href="/bell_match_1">
            <IonIcon icon={triangle} />
            <IonLabel>Match bell</IonLabel>
          </IonTabButton>
          <IonTabButton tab="bell_match_3" href="/bell_match_3">
            <IonIcon icon={ellipse} />
            <IonLabel>Match bells (3)</IonLabel>
          </IonTabButton>
          <IonTabButton tab="bells" href="/bells">
            <IonIcon icon={square} />
            <IonLabel>Bells</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
