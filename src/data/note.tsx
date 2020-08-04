export class Note {
    index: number;
    soundLocation: string;
    color: string;

    constructor(index: number, soundLocation: string, color: string) {
        this.index = index;
        this.soundLocation = soundLocation;
        this.color = color;
    }
}
