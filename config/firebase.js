import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Constants from 'expo-constants';


const firebaseConfig = {
    apiKey: Constants.manifest?.extra?.firebaseApiKey,
    authDomain: Constants.expoConfig.extra?.firebaseAuthDomain,
    projectId: Constants.expoConfig.extra?.firebaseProjectId,
    storageBucket: Constants.expoConfig.extra?.firebaseStorageBucket,
    messagingSenderId: Constants.expoConfig.extra?.firebaseMessagingSenderId,
    appId: Constants.expoConfig.extra?.firebaseAppId,
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


// Enable experimentalForceLongPolling for Firestore
const firestoreConfig = {
    experimentalForceLongPolling: false,
};

const firestore = firebase.firestore();
firestore.settings({ ...firestoreConfig, merge: true });

export { firebase };