import React, { DetailedReactHTMLElement, HTMLAttributes } from "react";
import { Bells } from "../components/bells";
import "./make_music.css";

/* The page for composing your own music */
export class MakeMusic extends React.Component {
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
                "p",
                {},
                "Compose and play your own songs by tapping the bells."
            ),
            React.createElement("p", {}, "To record a song:"),
            React.createElement(
                "ol",
                {},
                React.createElement(
                    "li",
                    {},
                    "Tap the ",
                    React.createElement("span", { id: "record" }, "record"),
                    " button to start recording."
                ),
                React.createElement(
                    "li",
                    {},
                    "Play your song by tapping the bells."
                ),
                React.createElement(
                    "li",
                    {},
                    "Tap the ",
                    React.createElement("span", { id: "stop" }, "stop"),
                    " button to stop recording."
                ),
                React.createElement(
                    "li",
                    {},
                    "Give your song a title, and tap the ",
                    React.createElement("span", { id: "save" }, "save"),
                    " button."
                )
            ),
            React.createElement(
                "p",
                {},
                "To hear your saved song, go to ",
                React.createElement("a", { href: "/play_songs" }, "Play song"),
                "."
            )
        );
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
