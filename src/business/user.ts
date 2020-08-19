import * as firebase from "firebase";
import { toast } from "../ui/components/toast";

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
        await firebase.auth().createUserWithEmailAndPassword(email, password);

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
        toast(`${message}Haere mai. You are logged in :)`);
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
