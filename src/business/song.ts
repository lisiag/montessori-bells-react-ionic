import { db, currentUser } from "./user";

// Business interface that can be called on by the UI and that in turn calls on the Firebase songs
// database, thus keeping the UI and songs data separated

// units of song
export interface NoteTime {
    note: number;
    time: number;
}

// format in which a song is stored in database
export interface SongData {
    title: string;
    song: NoteTime[];
}

type SongCallback = (song: SongData | null) => void;

// listeners that are called when the 'songs' database changes, i.e. the logged in user's saved song changes
let songsListeners = new Set<SongCallback>();

// add a listener to the set listening for changes to the 'songs' database
export function addSongsListener(callback: SongCallback) {
    songsListeners.add(callback);
}

// If the 'songs' database is modified then anywhere in app that uses the data (i.e. play_songs
// page when it calls getSong) needs to be notified
function notifySongsListeners(currentSong: SongData) {
    for (const cb of songsListeners) {
        cb(currentSong);
    }
}

// Save song to database. User has recorded a song in the "Make music" activity and clicked "Save".
// For now, each user can only have one saved song, so a user's song is overwritten every time the
// user saves a song. In a future version of this app, users will be able to save multiple songs
export async function saveSong(title: string, song: NoteTime[]) {
    try {
        const currentSong = {
            title,
            song
        };
        await db
            .collection("songs")
            .doc(currentUser!.email!)
            .set(currentSong);
        // notify listeners of this change
        notifySongsListeners(currentSong);
    } catch (error) {
        console.error("Error writing song to songs database: ", error);
    }
}

// Get currentUser's song from database if currentUser has a song. In a future version of this app,
// currentUser will have a map or array of songs not just one song
export async function getSong(): Promise<SongData | void> {
    if (currentUser == null) {
        // there are no saved songs when not logged in
        return;
    }
    const docRef = db.collection("songs").doc(currentUser.email!);
    const doc = await docRef.get();
    if (doc.exists) {
        return {
            title: doc.data()!.title,
            song: doc.data()!.song
        };
    } else {
        // doc.data() will be undefined in this case
    }
}
