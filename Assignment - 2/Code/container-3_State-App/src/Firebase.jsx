// Import the functions you need from the SDKs you need

/*Code Reference:
[1] https://console.firebase.google.com/u/0/project/csci-5410-serverless-a2/settings/general/web:OTRjYzk4NTctNTQ5Mi00ZjBjLWE3ZjMtNmUwODFlNWZlNzhl
*/

import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA6dv1TfTAJa5eDWzY_1D7lRg5azqRpjLw",
  authDomain: "csci-5410-serverless-a2.firebaseapp.com",
  projectId: "csci-5410-serverless-a2",
  storageBucket: "csci-5410-serverless-a2.appspot.com",
  messagingSenderId: "219979810665",
  appId: "1:219979810665:web:2b69bcae964da3bc4e1ff8",
  measurementId: "G-C1L3Q7SDCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//const database = getDatabase(app);
//const db = firebase.firestore();
 const db = getFirestore(app)
//export default db;

export default db;