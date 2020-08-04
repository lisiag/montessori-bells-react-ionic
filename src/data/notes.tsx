import { Note } from "./note";

export class Notes {
    private _notes: Note[];

    constructor() {
        this._notes = [];
        /* Names of the notes of the scale of C major from middle-C in descending order */
        const noteNames = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];
        const colors = [
            "red",
            "darkorange",
            "gold",
            "lightseagreen",
            "deepskyblue",
            "blue",
            "blueviolet",
            "magenta"
        ];
        const extraColors = ["limegreen", "dodgerblue"];
        for (let i = 0; i < noteNames.length; ++i) {
            let soundLocation =
                "../../assets/sounds/piano" + noteNames[i] + ".mp3";
            let note = new Note(i, soundLocation, colors[i]);
            this._notes.push(note);
        }
    }

    get notes(): Note[] {
        return this._notes;
    }
}
