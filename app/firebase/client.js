import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCzhw30rCVVq-1qbFfNzQrkBrAUcn89nrI",
  authDomain: "reddit-clone-ffdac.firebaseapp.com",
  projectId: "reddit-clone-ffdac",
  storageBucket: "reddit-clone-ffdac.appspot.com",
  messagingSenderId: "392774263158",
  appId: "1:392774263158:web:88a6b8245a972453f95a57",
  measurementId: "G-C3G51ZQYBM",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export { app, firestore, auth, storage, provider };
