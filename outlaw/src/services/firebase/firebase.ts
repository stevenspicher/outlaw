// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {connectFirestoreEmulator, getFirestore} from "firebase/firestore";
import {getAuth, connectAuthEmulator} from "firebase/auth";
import {getAnalytics, setUserProperties} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDzGMK8-ZKKdT1ibTXH9O1n0Yz_7qUZfRU",
    authDomain: "wiki-f6e38.firebaseapp.com",
    projectId: "wiki-f6e38",
    storageBucket: "wiki-f6e38.appspot.com",
    messagingSenderId: "172963766166",
    appId: "1:172963766166:web:72dbae8fd08654f0a207b7",
    measurementId: "G-27T33RR0GQ"
};


const USE_FIREBASE_EMULATORS = true;

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

if (USE_FIREBASE_EMULATORS) {
    connectAuthEmulator(auth, "http://localhost:9099");
}

export const db = (() => {
    const db = getFirestore();
    if (USE_FIREBASE_EMULATORS)
        connectFirestoreEmulator(db, 'localhost', 8080);
    return db;
})();

const analytics = getAnalytics();
setUserProperties(analytics, {
    platform: 'web'
}); getAnalytics(app);