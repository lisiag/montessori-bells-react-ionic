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
    id: string;
}

let currentUser: firebase.User | null;

export function getCurrentUser(): User | null {
    if (currentUser) {
        return {
            username: currentUser.displayName,
            email: currentUser.email,
            id: currentUser.uid
        };
    }
    return null;
}

export function onAuthStateChanged(callback: (usr: User | null) => void) {
    firebase.auth().onAuthStateChanged(u => {
        currentUser = u;
        callback(getCurrentUser());
    });
}

export async function registerUser(
    username: string,
    email: string,
    password: string
) {
    try {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function(result) {
                result.user?.updateProfile({
                    displayName: username
                });
            })
            .catch(function(error) {
                console.log(error);
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
        await firebase.auth().signOut();
        toast(`Haere ra. You are logged out.`);
    } catch (logoutError) {
        toast(logoutError.message);
        return false;
    }
}
