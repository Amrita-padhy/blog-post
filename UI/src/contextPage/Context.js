import React ,{createContext,useContext,useState,useEffect}from 'react'
import {auth} from '../util/firebase'
import {createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth'

const AuthContext =  createContext({
  currentUser: null,
  register: () => Promise,
  login: () => Promise,
  logout: () => Promise,
  signInWithGoogle: () => Promise,
  handleAuthErrorMsg:() => Promise,
})

export const useAuth = () => useContext(AuthContext);
// console.log(useAuth);

export default function AuthContextProvider({children}) {
  const [currentUser,seturrentUser] = useState(null)

// function

// log in 
function login(email,Password) {
  return signInWithEmailAndPassword(auth,email,Password)
}
// register
function register(email,Password) {
  return createUserWithEmailAndPassword(auth,email,Password)
}
// sign in with google
function signInWithGoogle() {
  const provider =  new GoogleAuthProvider()
  return signInWithPopup(auth,provider)
}
 // handle auth related error
 function handleAuthErrorMsg(msg)  {
  switch (msg ) {
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
};



  const value = {
    currentUser,
    register,
    login,
    // logout,
    signInWithGoogle,
    handleAuthErrorMsg,
  }

  return   <AuthContext.Provider value={value} >
    {children}
  </AuthContext.Provider>
}