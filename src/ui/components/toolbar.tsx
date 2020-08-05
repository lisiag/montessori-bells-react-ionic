import {
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonLabel
} from "@ionic/react";
import React, { ReactNode } from "react";
import { play, helpCircle, eye } from "ionicons/icons";
import "./toolbar.css";
import { Util } from "../../business/util";

export interface ToolbarProps {
    instructions: string;
}

export class Toolbar extends React.Component<ToolbarProps> {
    toolbar: ReactNode;
    instructions: string;

    constructor(props: ToolbarProps) {
        super(props);
        this.instructions = props.instructions;

        this.toolbar = (
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
                    <IonButton
                        onClick={() => {
                            alert(this.instructions);
                        }}
                    >
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

    render() {
        return this.toolbar;
    }
}
