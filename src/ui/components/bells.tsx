import {
    IonCol,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow
} from "@ionic/react";
import React, { ReactNode } from "react";
import "./bells.css";
import { Toolbar } from "./toolbar";
import { Bell } from "./bell";
import { Util } from "../../business/util";

export interface BellsProps {
    numPairs: number;
    numRows: number;
    rref: any;
    instructions: string;
}

export class Bells extends React.Component<BellsProps> {
    bells: ReactNode;
    numPairs: number /* the number of pairs bells for user to match; the number of bells in the lefthand col */;
    numRows: number; /* the number of rows of bells; the number of bells in the righthand column */
    rref: any;
    instructions: string;
    notes: Array<number>;
    notesSorted: Array<number>;
    indices: Array<number>;

    /* If there is only one bell on the left for the user to pair up with a bell on the right, place
       it in the second row; otherwise place a bell on the left in every row. Even though I want a
       random bell in the case of only one bell on the left, I always take the second one from the
       "notes" array, but that's ok because notes in the array are in random order. */
    renderCell(index: number) {
        if (this.numPairs != 1 || index === 1) {
            return <Bell note={this.notes[index]} cls="left_icon" />;
        } else {
            return <IonCol></IonCol>;
        }
    }

    constructor(props: BellsProps) {
        super(props);
        this.numPairs = props.numPairs;
        this.numRows = props.numRows;
        this.rref = props.rref;
        this.instructions = props.instructions;

        /*
       Get random notes for the bells in the righthand column
     */
        this.notes = Util.getRandoms(8, this.numRows);

        /* Sort bells from high to low for the righthand column */
        this.notesSorted = this.notes
            .slice()
            .sort()
            .reverse();

        /* Create a list of indices so that list.map() below can access both "notes" and "notesSorted" arrays */
        this.indices = [];
        for (let i = 0; i < this.notes.length; ++i) {
            this.indices.push(i);
        }

        /* Arrange the bells: on the left in random order; on the right sorted high to low
         */
        this.bells = (
            <IonPage ref={this.rref}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Pair the matching bells</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <Toolbar instructions={this.instructions} />
                    <IonGrid>
                        {this.indices.map(index => (
                            <IonRow>
                                {this.renderCell(index)}
                                <IonCol></IonCol>
                                <Bell
                                    note={this.notesSorted[index]}
                                    cls="right_icon"
                                />
                            </IonRow>
                        ))}
                    </IonGrid>
                </IonContent>
            </IonPage>
        );
    }

    render() {
        return this.bells;
    }
}
