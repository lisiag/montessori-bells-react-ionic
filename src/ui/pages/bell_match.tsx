import React, { DetailedReactHTMLElement, HTMLAttributes } from "react";
import { Bells } from "../components/bells";
import "./bell_match.css";

/* The page for matching one pair of bells activity */
export class BellMatch extends React.Component {
    /* I initially tried saying instructions was type HTMLElement but that caused an error
    "DetailedReactHTMLElement ...". Hence I made instructions a DetailedReactHTMLElement and jumped
    into that to find what to say for its type parameters. I guess instructions is not a plain
    HTMLElement because it is a nested composite html element. Anyway, DetailedReactHTMLElement
    achieves the desired result: instructions message with two words in diff colours. */
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
