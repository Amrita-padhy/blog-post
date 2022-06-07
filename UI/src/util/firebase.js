import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
export const auth = getAuth(app);
// console.log(app);




// export const login = async (data) => {
//   try {
    
//     const { user } = await signInWithEmailAndPassword(
//       auth,
//       data.email,
//       data.password
//     );
//     console.log(user);
//     if (user) {
//     } 
//   } catch (error) {
//     alert(error.message)
//   }
//   console.log(data);
// };
