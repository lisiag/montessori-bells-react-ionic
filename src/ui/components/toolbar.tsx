import { IonButton, IonButtons, IonIcon, IonLabel } from "@ionic/react";
import { close, bulb, helpCircle, play } from "ionicons/icons";
import React from "react";
import Modal from "react-modal";
import "./toolbar.css";

export interface ToolbarProps {
    instructions: string;
    onPlayAgain(): void;
}

export interface ToolbarState {
    instructionsIsOpen: boolean;
    answersShow: boolean;
}

export class Toolbar extends React.Component<ToolbarProps, ToolbarState> {
    constructor(props: ToolbarProps) {
        super(props);
        this.state = { instructionsIsOpen: false, answersShow: false };
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

    render() {
        window.document.body.classList.toggle(
            "answersShow",
            this.state.answersShow
        );
        return (
            <IonButtons>
                <IonButton
                    onClick={() => {
                        this.props.onPlayAgain();
                        this.setState({ answersShow: false });
                    }}
                >
                    <IonIcon icon={play} />
                    <IonLabel>Play again</IonLabel>
                </IonButton>

                <IonButton onClick={this.openInstructions}>
                    <IonIcon icon={helpCircle} />
                    <IonLabel>Instructions</IonLabel>
                </IonButton>

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

                <IonButton
                    onClick={() => {
                        this.setState({ answersShow: !this.state.answersShow });
                    }}
                >
                    <IonIcon icon={bulb} />
                    <IonLabel>
                        {this.getAnswersLabel(this.state.answersShow)}
                    </IonLabel>
                </IonButton>
            </IonButtons>
        );
    }
}
