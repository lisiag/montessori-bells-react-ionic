import * as firebase from "firebase";
import { toast } from "../ui/components/toast";

// firebase config
const config = {
    apiKey: "AIzaSyAZjL_cU29wH7Fd2tDg__u0KfnBqbEe9mk",
    authDomain: "montessori-bells.firebaseapp.com",
    databaseURL: "https://montessori-bells.firebaseio.com",
    projectId: "montessori-bells",
    storageBucket: "montessori-bells.appspot.com",
    messagingSenderId: "557233625660",
    appId: "1:557233625660:web:59408fc9a196732bcc0139",
    measurementId: "G-51V5E9N00G"
};

// this project's firebase project:
// https://console.firebase.google.com/project/montessori-bells

firebase.initializeApp(config);

export const db = firebase.firestore();

export interface User {
    username: string | null;
    email: string | null;
}

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

export let currentUser: User | null = null;

type Callback = (usr: User | null) => void;

// listeners that are called when the logged in user changes
let userListeners: Set<Callback> | null = null;

// This function is called by pages or components that want to be notified if the logged in user
// changes: currently topbar - the top toolbar - because it displays the gravatar of the current
// user; and play_songs because it needs to display the saved song (if any) of the current user
export function onAuthStateChanged(callback: Callback) {
    if (userListeners == null) {
        userListeners = new Set();
        firebase.auth().onAuthStateChanged(async u => {
            try {
                if (u !== null) {
                    // there is a user logged in
                    const email = u?.email;
                    const docRef = db.collection("bellUsers").doc(email!);
                    const doc = await docRef.get();
                    currentUser = {
                        username: doc.data()!.username,
                        email: doc.data()!.email
                    };
                } else {
                    // user logged out?
                }
                if (userListeners != null) {
                    for (const cb of userListeners) {
                        cb(currentUser);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        });
    }

    // This works for current purposes but notice that we are adding the new callback to
    // useListeners *after* all useListener callbacks are called above. This might not work for for
    // all potential callbacks.
    userListeners.add(callback);

    // not used currently but could be used to remove a callback from userListeners if we wanted it
    // to stop listening
    return () => {
        userListeners?.delete(callback);
    };
}

export async function registerUser(
    username: string,
    email: string,
    password: string
) {
    try {
        // add the new user to authentication table for this project's firebase project
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        // add the new user's details to the 'bellUsers' table in this project's firebase project
        // for convenience
        db.collection("bellUsers")
            .doc(email)
            .set({
                username: username,
                email: email
            })
            .catch(function(error) {
                console.error(
                    "Error writing user to bellUsers database: ",
                    error
                );
            });

        loginUser(email, password, "You have registered successfully :)\n");
        return true;
    } catch (registerError) {
        toast(registerError.message);
        return false;
    }
}

export async function loginUser(email: string, password: string, message = "") {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);

        // get the user's details from the 'bellUsers' table in this project's firebase project
        const docRef = db.collection("bellUsers").doc(email!);
        const doc = await docRef.get();
        // The following is duplicated from onAuthStateChanged, but my attempts to get the welcome
        // message and username to display correctly any other way have not yet succeeded
        if (doc.exists) {
            currentUser = {
                username: doc.data()!.username,
                email: doc.data()!.email
            };
        } else {
            // doc.data() will be undefined in this case
            console.error(
                `loginUser called but this user not in bellUsers database:`,
                email
            );
        }

        toast(
            `${message}Haere mai ${currentUser?.username}. You are logged in :)`
        );
        return true;
    } catch (loginError) {
        toast(loginError.message);
        return false;
    }
}

export async function logoutUser() {
    try {
        currentUser = null;
        await firebase.auth().signOut();
        toast(`Haere ra. You are logged out.`);
    } catch (logoutError) {
        toast(logoutError.message);
        return false;
    }
}

// Save song to database. User has recorded a song in the "Make music" activity and clicked "Save".
// For now, each user can only have one saved song, so a user's song is overwritten every time the
// user saves a song. In a future version of this app, users will be able to save multiple songs
export async function saveSong(title: string, song: NoteTime[]) {
    try {
        await db
            .collection("songs")
            .doc(currentUser!.email!)
            .set({
                title: title,
                song: song
            });
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
        console.error("No such song in songs database");
    }
}
