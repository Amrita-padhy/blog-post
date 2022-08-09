import React, { createContext, useContext, useState, useEffect } from "react";
import { fireBaseAuth } from "../util/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
// import { db } from "../util/firebase";

const AuthContext = createContext({
  currentUser: null,
  register: () => Promise,
  login: () => Promise,
  logout: () => Promise,
  signInWithGoogle: () => Promise,
  handleAuthErrorMsg: () => Promise,
  // postCollectionRef,
});
// import {
//   collection,
//   onSnapshot,
//   doc,
//   addDoc,
//   deleteDoc,
// } from "firebase/firestore";
export const useAuth = () => useContext(AuthContext);
// console.log(useAuth);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // function
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireBaseAuth, (user) => {
      console.log(user);
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // log in
  function login(email, Password) {
    return signInWithEmailAndPassword(fireBaseAuth, email, Password);
  }
  // register
  function register(email, Password) {
    return createUserWithEmailAndPassword(fireBaseAuth, email, Password);
  }
  // sign in with google
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(fireBaseAuth, provider);
  }
  // sign out
  function logout() {
    return signOut(fireBaseAuth);
  }

  // handle auth related error
  function handleAuthErrorMsg(msg) {
    switch (msg) {
      case "Firebase: Error (auth/invalid-email).":
        return "Check your email or password";
      case "Firebase: Password should be at least 6 characters (auth/weak-password).":
        return "Check your Email or password";
      case "Firebase: Error (auth/user-not-found).":
        return "Check your Email or password";
      case "Firebase: Error (auth/wrong-password).":
        return "Check your Email or password";
      case "Firebase: Error (auth/email-already-in-use).":
        return "Email already in use";

      default:
        break;
    }
  }

  const value = {
    currentUser,
    register,
    login,
    logout,
    signInWithGoogle,
    handleAuthErrorMsg,
    // postCollectionRef,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
