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

export interface BellsProps {
    numPairs: number /* the number of bells for user to pair up */;
    rref: any;
    notes: Array<number> /* list of notes in random order */;
}

export class Bells extends React.Component<BellsProps> {
    bells: ReactNode;
    numPairs: number;
    rref: any;
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
        this.rref = props.rref;
        this.notes = props.notes;

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
                    <Toolbar />
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
