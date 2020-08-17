import React, { DetailedReactHTMLElement, HTMLAttributes } from "react";
import { Bells } from "../components/bells";
import "./bell_match.css";

/* The page for matching one pair of bells activity */
export class BellMatch extends React.Component {
    level: number;
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
        /* Cast to number so can use in switch case */
        this.level = Number(props.match.params.level);

        let sing_plural;
        if (this.level === 1) {
            sing_plural = "Click each bell to play its note. Drag the ";
        } else {
            sing_plural = "Click each bell to play its note. Drag each ";
        }
        this.instructions = React.createElement(
            "div",
            {},
            sing_plural,
            React.createElement("span", { id: "draggableColor" }, "green"),
            " bell and drop it next to the ",
            React.createElement("span", { id: "fixedBellColor" }, "blue"),
            " bell that plays the same note."
        );
    }

    render() {
        if (this.level === 1) {
            return (
                <Bells
                    numPairs={1}
                    numRows={3}
                    instructions={this.instructions}
                />
            );
        } else if (this.level === 3) {
            return (
                <Bells
                    numPairs={3}
                    numRows={3}
                    instructions={this.instructions}
                />
            );
        } else {
            /* octave */
            return (
                <Bells
                    numPairs={8}
                    numRows={8}
                    instructions={this.instructions}
                />
            );
        }
    }
}
