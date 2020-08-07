import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { Bells } from "../components/bells";
import "./bell_match.css";

export class BellMatch extends React.Component {
    instructions: string;

    constructor(props: any) {
        super(props);
        this.instructions =
            "Click each bell to play its note. Drag the orange bell and drop it next to the blue bell that plays the same note.";
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Pair the matching bells</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Bells
                    numPairs={1}
                    numRows={3}
                    instructions={this.instructions}
                />
            </IonPage>
        );
    }
}
