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
function signInWithGoogle(auth) {
  const provider =  new GoogleAuthProvider()
  return signInWithPopup(auth,provider)
}




  const value = {
    currentUser,
    register,
    login,
    // logout,
    signInWithGoogle,
  }

  return   <AuthContext.Provider value={value} >
    {children}
  </AuthContext.Provider>
}