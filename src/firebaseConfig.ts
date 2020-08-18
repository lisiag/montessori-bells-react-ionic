import * as firebase from "firebase";
import { toast } from "./ui/components/toast";

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

export async function loginUser(email: string, password: string, message = "") {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        toast(message + "You are logged in :)");
        return true;
    } catch (loginError) {
        toast(loginError.message);
        return false;
    }
}

export async function registerUser(email: string, password: string) {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        loginUser(email, password, "You have registered successfully :)\n");
        return true;
    } catch (registerError) {
        toast(registerError.message);
        return false;
    }
}
