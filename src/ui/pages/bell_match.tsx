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
    constructor(props: any) {
        super(props);
        this.labelRef = React.createRef<HTMLDivElement>();
    }

    render() {
        return <Bells numPairs={1} numRows={3} rref={this.labelRef} />;
    }
}
