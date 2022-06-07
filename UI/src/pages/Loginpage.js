import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { login } from "../util/firebase";
import GoogleIcon from "@mui/icons-material/Google";
import {useAuth} from '../contextPage/Context'

const Loginpage = () => {


 const {login,signInWithGoogle} = useAuth()

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  // functions
  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    try{
      setIsSubmit(true);
     const user =  login(email, password)
     if (user) {
       navigate('/')
     }
     } catch (error) {
      console.log(error.message)
     }
  }      

  // signUpWithGoogle
  function signUpWithGoogle() {
    signInWithGoogle() 
    try {
      // if (user) {
      //   navigate('/')
      // }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="main">
      <form className="login_form" noValidate
    autoComplete = "off" onSubmit={handleSubmit}>
        <h2>Login page</h2>
        <div className="inputs">
          {/* <p>{formErrors.email}</p> */}
          <TextField
            fullWidth
            margin="dense"
            type={"email"}
            label="Email"
            variant="outlined"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <p>{formErrors.password}</p> */}
          <TextField
            fullWidth
            margin="dense"
            type={"password"}
            label="password"
            variant="outlined"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="sumbit" className="logIn" variant="contained">
          logIn
        </Button>
        {/* <button className="logIn">Log In</button> */}

        <div className="btn_container_one">
          <Link to="/registration">Do not have an account</Link>
          <Link to="/Forget-Password">Forget Password</Link>
        </div>
        <Button
          fullWidth
          margin="dense"
          type="sumbit"
          className="googleLogin"
          startIcon={<GoogleIcon />}
          variant="contained"
          onClick={signUpWithGoogle}
        >
          Sign In with Google
        </Button>
      </form>
    </div>
  );
};

export default Loginpage;
