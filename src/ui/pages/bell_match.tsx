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
import { Util } from "../../business/util";
import { Bells } from "../components/bells";

export class BellMatch extends React.Component {
    labelRef: any;
    constructor(props: any) {
        super(props);
        this.labelRef = React.createRef<HTMLDivElement>();
    }

    /*
       Get 3 random notes for the bells in the righthand column
     */
    threeRandof8 = Util.getRandoms(8, 3);

    render() {
        return (
            <Bells
                numPairs={1}
                rref={this.labelRef}
                notes={this.threeRandof8}
            />
        );
    }
}
