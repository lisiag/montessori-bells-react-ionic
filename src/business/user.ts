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

export let currentUser: User | null = null;

type UserCallback = (usr: User | null) => void;

// listeners that are called when the logged in user changes
let userListeners: Set<UserCallback> | null = null;

// This function is called by pages or components that want to be notified if the logged in user
// changes: currently topbar - the top toolbar - because it displays the gravatar of the current
// user; and play_songs because it needs to display the saved song (if any) of the current user
export function onAuthStateChanged(callback: UserCallback) {
    if (userListeners == null) {
        userListeners = new Set();
        firebase.auth().onAuthStateChanged(async u => {
            try {
                if (u != null) {
                    // there is a user logged in
                    const email = u?.email;
                    const docRef = db.collection("bellUsers").doc(email!);
                    const data = (await docRef.get()).data();
                    if (data != null) {
                        currentUser = {
                            username: data.username,
                            email: data.email
                        };
                    }
                } // else user logged out

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

        // Firebase automatically signs in the user upon registration so we need to set currentUser
        // in order for the app to display their Gravatar immediately
        currentUser = {
            username: username,
            email: email
        };

        toast(
            `Thank you, ${username}. You have registered successfully, and you are now logged in :)\n`
        );
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
        const data = (await docRef.get()).data();
        // The following is duplicated from onAuthStateChanged, but my attempts to get the welcome
        // message and username to display correctly any other way have not yet succeeded
        if (data != null) {
            currentUser = {
                username: data.username,
                email: data.email
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
