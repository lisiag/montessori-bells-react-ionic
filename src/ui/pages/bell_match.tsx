import React, { RefObject } from "react";
import "./bell_match.css";
import { Bells } from "../components/bells";

export class BellMatch extends React.Component {
    bellmatchRef: RefObject<HTMLDivElement>;
    instructions: string;

    constructor(props: any) {
        super(props);
        this.bellmatchRef = React.createRef<HTMLDivElement>();
        this.instructions =
            "Click each bell to play its note. Drag the orange bell and drop it next to the blue bell that plays the same note.";
    }

    render() {
        return (
            <Bells
                numPairs={1}
                numRows={3}
                bellmatchRef={this.bellmatchRef}
                instructions={this.instructions}
            />
        );
    }
}
