import { Howl } from "howler";

export const Util = {
    /*
       Get n random numbers between 0 (inclusive) and arrLen (exclusive).
       Intended for use getting n random elements from an array of length arrLen.
     */
    getRandoms: (arrLen: number, n: number) => {
        if (n > arrLen)
            throw new RangeError(
                "getRandoms: more elements taken than available"
            );
        let result = new Array(n);
        let workArr = new Array(arrLen);
        for (let i = 0; i < arrLen; ++i) {
            workArr[i] = i;
        }
        for (let i = 0; i < n; ++i) {
            let x = Math.floor(Math.random() * workArr.length);
            result[i] = workArr[x];
            // remove the number from workArr so it can't be selected again
            workArr.splice(x, 1);
        }
        return result;
    },

    notes: [] as Howl[],

    refreshPage: () => {
        window.location.reload(false);
    }
};

Util.notes = [
    new Howl({
        src: ["../../assets/sounds/pianoC4.mp3"]
    }),
    new Howl({
        src: ["../../assets/sounds/pianoD4.mp3"]
    }),
    new Howl({
        src: ["../../assets/sounds/pianoE4.mp3"]
    }),
    new Howl({
        src: ["../../assets/sounds/pianoF4.mp3"]
    }),
    new Howl({
        src: ["../../assets/sounds/pianoG4.mp3"]
    }),
    new Howl({
        src: ["../../assets/sounds/pianoA4.mp3"]
    }),
    new Howl({
        src: ["../../assets/sounds/pianoB4.mp3"]
    }),
    new Howl({
        src: ["../../assets/sounds/pianoC5.mp3"]
    })
];
