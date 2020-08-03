import {
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonLabel
} from "@ionic/react";
import { play, helpCircle, eye } from "ionicons/icons";
import React from "react";
import "./toolbar.css";
import { Util } from "../../business/util";

export class Toolbar extends React.Component {
    render() {
        return (
            <IonToolbar>
                <IonButtons>
                    <IonButton
                        onClick={() => {
                            Util.refreshPage();
                        }}
                    >
                        <IonIcon icon={play} />
                        <IonLabel>Play again</IonLabel>
                    </IonButton>
                    <IonButton onClick={() => {}}>
                        <IonIcon icon={helpCircle} />
                        <IonLabel>Instructions</IonLabel>
                    </IonButton>
                    <IonButton onClick={() => {}}>
                        <IonIcon icon={eye} />
                        <IonLabel>Answers</IonLabel>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        );
    }
}
