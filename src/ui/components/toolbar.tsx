import { IonToolbar, IonButton, IonIcon, IonLabel } from "@ionic/react";
import { close, bulb, helpCircle, play } from "ionicons/icons";
import React from "react";
import Modal from "react-modal";
import "./toolbar.css";

export interface ToolbarProps {
    instructions: string;
    onPlayAgain(): void;
    answersShow: {
        reset(): void;
    };
}

export interface ToolbarState {
    instructionsIsOpen: boolean;
}

/* A toolbar of buttons relating to the activities with the bells */
export class Toolbar extends React.Component<ToolbarProps, ToolbarState> {
    answersShow = false;
    constructor(props: ToolbarProps) {
        super(props);
        this.state = { instructionsIsOpen: false };
        /* props.answersShow.reset() is called from Bells when the activity is refreshed to ensure
        that the answers are not showing when the activity is refreshed*/
        props.answersShow.reset = () => {
            this.answersShow = false;
        };
    }

    openInstructions = () => {
        this.setState({ instructionsIsOpen: true });
    };

    closeInstructions = () => {
        this.setState({ instructionsIsOpen: false });
    };

    getAnswersLabel = (showing: boolean) => {
        return showing ? "Hide answers" : "Show answers";
    };

    toogleShowAnswers = () => {
        this.answersShow = !this.answersShow;
        this.forceUpdate();
    };

    render() {
        /* Add the answersShow class to body so that css knows when to display and when to hide the
           coloured borders around the bells that tell users what the correct answers are for the
           activity */
        window.document.body.classList.toggle("answersShow", this.answersShow);
        return (
            <div id="bellToolbar">
                <button
                    onClick={() => {
                        this.props.onPlayAgain();
                    }}
                >
                    <IonIcon icon={play} />
                    <IonLabel>Play again</IonLabel>
                </button>

                <button onClick={this.openInstructions}>
                    <IonIcon icon={helpCircle} />
                    <IonLabel>Instructions</IonLabel>
                </button>

                <Modal
                    isOpen={this.state.instructionsIsOpen}
                    onRequestClose={this.closeInstructions}
                    shouldCloseOnOverlayClick={true}
                >
                    <div onClick={this.closeInstructions}>
                        {this.props.instructions}
                    </div>
                    <IonButton onClick={this.closeInstructions}>
                        <IonIcon icon={close}></IonIcon>
                    </IonButton>
                </Modal>

                <button
                    onClick={() => {
                        this.toogleShowAnswers();
                    }}
                >
                    <IonIcon icon={bulb} />
                    <IonLabel>
                        {this.getAnswersLabel(this.answersShow)}
                    </IonLabel>
                </button>
            </div>
        );
    }
}
