import {
  initializeApp
} from "firebase/app";
import {
  getAuth
} from "firebase/auth";
import {
  getFirestore
} from "firebase/firestore"

import {
  getStorage
} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBrHC_yghDNy7TptRJ_ADD6bL8A2FbvAb8",
  authDomain: "react-demo-e1d88.firebaseapp.com",
  projectId: "react-demo-e1d88",
  storageBucket: "react-demo-e1d88.appspot.com",
  messagingSenderId: "794527527422",
  appId: "1:794527527422:web:9ed8e896ff6f385d9e90af",
  measurementId: "G-BC6ZMW3TQL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireBaseAuth = getAuth(app);
const db = getFirestore(app)

const baseApi = 'https://us-central1-react-demo-e1d88.cloudfunctions.net' 
// console.log(db);
export {
  db, baseApi
}
export const storage = getStorage(app)
console.log(storage);