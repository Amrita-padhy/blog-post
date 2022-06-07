import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../contextPage/Context";

const Regpage = () => {
  const { register,signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  // function

  const handleSubmit = (e)=>{
    e.preventDefault();
    
    try{
      setIsSubmit(true);
      register(email, password)
      .then ((user)=>{
        if (user) {
          console.log(user);
          navigate("/")
        }
      } )
     } catch (error) {
      console.log(error.message)
     }
  }       
    // 
    // signUpWithGoogle
  function signUpWithGoogle() {
    signInWithGoogle() 
    try {
      
    } catch (error) {
      console.log(error.message);
    }
    
  }
  


   

  return (
    <>
      <div className="main">
        <form
          className="registration_form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {/* Register page */}
          <h2>Registration page</h2>
          <div className="inputs">
            <TextField
              fullWidth
              margin="dense"
              type={"text"}
              label="User Name"
              variant="outlined"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

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
          <Button className="Register" type="submit" variant="contained">
            Register
          </Button>
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

          <div className="btn_container_two">
            <button className="exist">
              <Link to="/login">Exist User </Link>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Regpage;
