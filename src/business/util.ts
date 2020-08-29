import { Notes } from "../data/notes";
import { Note } from "../data/note";

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

    /* The data info related to the note for each bell */
    notes: [] as Note[],

    refreshPage: () => {
        window.location.reload(false);
    }
};

Util.notes = new Notes().notes;
