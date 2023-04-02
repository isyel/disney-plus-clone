import firebase from "firebase";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCu-CiLMws6j8lF5r9fY9p7ifZONbWvlF0",
  authDomain: "disneyplus-clone-b6227.firebaseapp.com",
  projectId: "disneyplus-clone-b6227",
  storageBucket: "disneyplus-clone-b6227.appspot.com",
  messagingSenderId: "72625548485",
  appId: "1:72625548485:web:8f2ef1ee949708c387d4ac",
  measurementId: "G-MZWGHY89BG",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage, analytics };
export default db;
