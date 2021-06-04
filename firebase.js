import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCx-ENWKCVYsbB9yiuruXtM1y5mgYLu_iE",
    authDomain: "howl-at-the-moon-df63d.firebaseapp.com",
    projectId: "howl-at-the-moon-df63d",
    storageBucket: "howl-at-the-moon-df63d.appspot.com",
    messagingSenderId: "478180278932",
    appId: "1:478180278932:web:6aa26292c03ce18aae2a81"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const storage = firebase.storage();

export { db, storage }