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

let currentUser: User | null;

export function getCurrentUser(): User | null {
    return currentUser;
}

// When a user logs in or out
export function onAuthStateChanged(callback: (usr: User | null) => void) {
    firebase.auth().onAuthStateChanged(async u => {
        try {
            if (u !== null) {
                // there is a user logged in
                const email = u?.email;
                const docRef = db.collection("bellUsers").doc(email!);
                const doc = await docRef.get();

                if (doc.exists) {
                    currentUser = {
                        username: doc.data()!.username,
                        email: doc.data()!.email
                    };
                } else {
                    // doc.data() will be undefined in this case
                    console.error("No such user in bellUsers database");
                }
            }
            callback(currentUser);
        } catch (err) {
            console.error(err);
        }
    });
}

export async function registerUser(
    username: string,
    email: string,
    password: string
) {
    try {
        // add the new user to authentication table for this project's firebase project
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        // add the new user's details to the 'bellUsers' table in this project's firebase project so
        // we can access the user's details from throughout this app
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

        // get the user's details from the 'bellUsers' table in this project's firebase project for
        // use throughout this app
        const docRef = db.collection("bellUsers").doc(email!);
        const doc = await docRef.get();
        // The following is duplicated from onAuthStateChanged but attempts to get the welcome
        // message and username to display correctly if the code was extracted into a separate
        // function have not yet succeeded
        if (doc.exists) {
            currentUser = {
                username: doc.data()!.username,
                email: doc.data()!.email
            };
        } else {
            // doc.data() will be undefined in this case
            console.error("No such user in bellUsers database");
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

// units of song to be saved and played
export interface NoteTime {
    note: number;
    time: number;
}

// for now each user can only have one song
export async function saveSong(title: string, song: NoteTime[]) {
    db.collection("songs")
        .doc(currentUser!.email!)
        .set({
            title: title,
            song: song
        })
        .catch(function(error) {
            console.error("Error writing song to songs database: ", error);
        });
}
