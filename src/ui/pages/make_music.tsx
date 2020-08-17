import React, { DetailedReactHTMLElement, HTMLAttributes } from "react";
import { Bells } from "../components/bells";

/* The page for matching one pair of bells activity */
export class MakeMusic extends React.Component {
    instructions: DetailedReactHTMLElement<
        HTMLAttributes<HTMLElement>,
        HTMLElement
    >;

    constructor(props: any) {
        super(props);

        this.instructions = React.createElement("div", {}, "some instructions");
    }

    render() {
        return (
            <Bells
                type="make_music"
                numPairs={8}
                numRows={8}
                instructions={this.instructions}
                title="Make music"
            />
        );
    }
}
