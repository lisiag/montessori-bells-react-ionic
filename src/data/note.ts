export class Note {
    // index is used to identify note: 0 is middle C (C4); the rest continue up the scale to C5 at index 7
    index: number;
    soundLocation: string;
    color: string;

    constructor(index: number, soundLocation: string, color: string) {
        this.index = index;
        this.soundLocation = soundLocation;
        this.color = color;
    }
}
