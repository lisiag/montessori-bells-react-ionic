import { IonIcon, IonLabel, IonInput, IonButton } from "@ionic/react";
import { close, ellipse, helpCircle, musicalNotes, stop } from "ionicons/icons";
import React from "react";
import Modal from "react-modal";
import { toast } from "./toast";
import { saveSong, NoteTime } from "../../business/user";
import "./recordToolbar.css";

/* although empty, this seems to be required; otherwise RecordToolBarState is not accepted */
export interface RecordToolbarProps {}

export interface RecordToolbarState {
    instructionsIsOpen: boolean /* is the instructions modal open? */;
    saveIsOpen: boolean /* is the save song modal open? */;
    recording: boolean;
}

/* Where the user's song will be stored when the user clicks Record */
let song: NoteTime[] = [];
let title = "";
/* Get all the bells so their notes can be stored in the recorded song */
const bells = document.getElementsByClassName("fixedBell");

/* A toolbar of buttons relating to the 'making music' activity */
export class RecordToolbar extends React.Component<
    RecordToolbarProps,
    RecordToolbarState
> {
    recordButtonLabel: string;
    constructor(props: RecordToolbarProps) {
        super(props);
        this.state = {
            instructionsIsOpen: false,
            saveIsOpen: false,
            recording: false
        };
        this.recordButtonLabel = "Record";
    }

    openInstructions = () => {
        /* Triggers modal with instructions to be opened */
        this.setState({ instructionsIsOpen: true });
    };

    closeInstructions = () => {
        /* Triggers modal with instructions to be closed */
        this.setState({ instructionsIsOpen: false });
    };

    openSave = () => {
        /* Triggers modal inviting user to save their recorded song to be opened */
        this.setState({ saveIsOpen: true });
    };

    closeSave = () => {
        /* Triggers 'save' modal to be closed */
        this.setState({ saveIsOpen: false });
        /* reset song as empty ready for next recording */
        song = [];
        title = "";
        finishRecording(); /* garbage collection: remove eventListeners from bells */
    };

    toggleRecordIcon() {
        if (this.state.recording) {
            this.recordButtonLabel = "Stop";
            return <IonIcon className="recordIcon" icon={stop} />;
        } else {
            this.recordButtonLabel = "Record";
            return <IonIcon className="recordIcon" icon={ellipse} />;
        }
    }

    /* Recording has been stopped or started */
    onClickRecord() {
        if (this.state.recording) {
            this.openSave(); // triggers modal to pop up, inviting user to save song
        } else {
            recordSong(); // start recording the bells that are tapped
        }
        this.setState({ recording: !this.state.recording });
    }

    /* The user clicked 'Save' button */
    saveSongAndClose = () => {
        /* call save song in the business layer so business layer can save song to the database */
        if (title === "") {
            title = "My song";
        }
        saveSong(title!, song);
        this.closeSave();
        toast("Your song has been saved.");
    };

    render() {
        return (
            <div id="recordToolbar">
                <button
                    onClick={() => {
                        this.onClickRecord();
                    }}
                >
                    {this.toggleRecordIcon()}
                    <IonLabel>{this.recordButtonLabel}</IonLabel>
                </button>

                <Modal
                    isOpen={this.state.saveIsOpen}
                    onRequestClose={this.closeSave}
                    shouldCloseOnOverlayClick={true}
                >
                    <button id="closeModal" onClick={this.closeSave}>
                        <IonIcon icon={close}></IonIcon>
                    </button>
                    <div id="save">
                        <form>
                            <IonInput
                                placeholder="song name"
                                onIonChange={e => (title = e.detail.value!)}
                            />
                            <IonButton onClick={this.closeSave}>
                                Discard
                            </IonButton>
                            <IonButton onClick={this.saveSongAndClose}>
                                Save
                            </IonButton>
                        </form>
                    </div>
                </Modal>

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

/* Bell has been tapped. Add its note and timepoint to song. */
const startBell = (ev: Event) => {
    const bell = ev.currentTarget as HTMLElement;
    song.push({ note: Number(bell.dataset.note), time: Date.now() });
};

/* Record the bells that are tapped, and the timepoint of each tap */
function recordSong() {
    for (let i = 0; i < bells.length; ++i) {
        bells[i].addEventListener("pointerdown", startBell, true);
    }
}

/* Song has been saved or discarded. Remove eventListeners from bells */
function finishRecording() {
    for (let i = 0; i < bells.length; ++i) {
        bells[i].removeEventListener("pointerdown", startBell, true);
    }
}
