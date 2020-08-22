import React, { DetailedReactHTMLElement, HTMLAttributes } from "react";
import { match } from "react-router";
import { Bells } from "../components/bells";
import "./bell_match.css";

export interface BellMatchProps {
    /* Record is a simple typescript type. match is a React router object */
    match: match<Record<string, string | undefined>>;
}

/* The page for matching one pair of bells activity */
export class BellMatch extends React.Component<BellMatchProps> {
    level!: number;
    title: string;
    /* I initially tried saying instructions was type HTMLElement but that caused an error
    "DetailedReactHTMLElement ...". Hence I made instructions a DetailedReactHTMLElement and jumped
    into that to find what to say for its type parameters. I guess instructions is not a plain
    HTMLElement because it is a nested composite html element. Anyway, DetailedReactHTMLElement
    achieves the desired result: instructions message with two words in diff colours. */
    instructions!: DetailedReactHTMLElement<
        HTMLAttributes<HTMLElement>,
        HTMLElement
    >;
    numRows!: number;

    constructor(props: BellMatchProps) {
        super(props);
        this.title = "Pair the matching bells";
    }

    init() {
        /* Cast to number so can use in switch case */
        this.level = Number(this.props.match.params.level);
        switch (this.level) {
            case 1:
            case 3:
                this.numRows = 3;
                break;
            default:
                this.numRows = 8;
        }

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
        this.init();
        return (
            <Bells
                type="match"
                numPairs={this.level}
                numRows={this.numRows}
                instructions={this.instructions}
                title={this.title}
            />
        );
    }
}
