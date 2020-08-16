import React, { DetailedReactHTMLElement, HTMLAttributes } from "react";
import { Bells } from "../components/bells";
import "./bell_match.css";

export class BellMatch extends React.Component {
    instructions: DetailedReactHTMLElement<
        HTMLAttributes<HTMLElement>,
        HTMLElement
    >;

    constructor(props: any) {
        super(props);
        this.instructions = React.createElement(
            "div",
            {},
            React.createElement(
                "span",
                {},
                "Click each bell to play its note. Drag the "
            ),
            React.createElement("span", { id: "draggableColor" }, "green"),
            React.createElement("span", {}, " bell and drop it next to the "),
            React.createElement("span", { id: "fixedBellColor" }, "blue"),
            React.createElement("span", {}, " bell that plays the same note.")
        );
    }

    render() {
        return (
            <Bells numPairs={1} numRows={3} instructions={this.instructions} />
        );
    }
}
