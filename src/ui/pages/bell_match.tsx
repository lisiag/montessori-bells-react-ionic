import {
    IonContent,
    IonHeader,
    IonGrid,
    IonRow,
    IonCol,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React from "react";
import "./bell_match.css";
import { Bells } from "../components/bells";

export class BellMatch extends React.Component {
    labelRef: any;
    instructions: string;

    constructor(props: any) {
        super(props);
        this.labelRef = React.createRef<HTMLDivElement>();
        this.instructions =
            "Click each bell to play its note. Drag the orange bell and drop it next to the blue bell that plays the same note.";
    }

    render() {
        return (
            <Bells
                numPairs={1}
                numRows={3}
                rref={this.labelRef}
                instructions={this.instructions}
            />
        );
    }
}
