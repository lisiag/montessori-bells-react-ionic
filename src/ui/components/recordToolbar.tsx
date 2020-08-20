import { IonIcon, IonLabel } from "@ionic/react";
import { close, helpCircle, ellipse, stop, musicalNotes } from "ionicons/icons";
import React from "react";
import Modal from "react-modal";
import "./recordToolbar.css";

/* although empty, this seems to be required; otherwise RecordToolBarState is not accepted */
export interface RecordToolbarProps {}

export interface RecordToolbarState {
    instructionsIsOpen: boolean;
    recording: boolean;
}

/* A toolbar of buttons relating to the 'making music' activity */
export class RecordToolbar extends React.Component<
    RecordToolbarProps,
    RecordToolbarState
> {
    recordButtonLabel: string;
    constructor(props: RecordToolbarProps) {
        super(props);
        this.state = { instructionsIsOpen: false, recording: false };
        this.recordButtonLabel = "Record";
    }

    openInstructions = () => {
        this.setState({ instructionsIsOpen: true });
    };

    closeInstructions = () => {
        this.setState({ instructionsIsOpen: false });
    };

    recordIcon() {
        if (this.state.recording) {
            this.recordButtonLabel = "Stop";
            return <IonIcon className="recordIcon" icon={stop} />;
        } else {
            this.recordButtonLabel = "Record";
            return <IonIcon className="recordIcon" icon={ellipse} />;
        }
    }

    record() {
        if (this.state.recording) {
        } else {
        }
        this.setState({ recording: !this.state.recording });
    }

    render() {
        return (
            <div id="recordToolbar">
                <button
                    onClick={() => {
                        this.record();
                    }}
                >
                    {this.recordIcon()}
                    <IonLabel>{this.recordButtonLabel}</IonLabel>
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
                    <button id="closeModal" onClick={this.closeInstructions}>
                        <IonIcon icon={close}></IonIcon>
                    </button>
                    <div id="instructions" onClick={this.closeInstructions}>
                        some instructions
                    </div>
                </Modal>

                <button onClick={() => {}}>
                    <IonIcon icon={musicalNotes} />
                    <IonLabel>My songs</IonLabel>
                </button>
            </div>
        );
    }
}
