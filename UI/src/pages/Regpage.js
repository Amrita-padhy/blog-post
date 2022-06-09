import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../contextPage/Context";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Regpage = () => {
  const { register,signInWithGoogle,handleAuthErrorMsg } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarErrorMsg, setSnackbarErrorMsg] = useState("");
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;


  // function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      const { user } = await register(email, password);
      console.log(user);
      if (user) {
        navigate("/");
      }
    } catch (error) {
      setSnackbarOpen(true);
      console.log(error.message);
      setSnackbarErrorMsg(handleAuthErrorMsg(error.message));
    }
  };   
   
    // signUpWithGoogle
  const googleSignin = async () => {
    try {
      const { user } = await signInWithGoogle();
      console.log(user);
      if (user) {
        navigate("/");
      }
    } catch (error) {
      snackbarOpen(true);
      console.log(error.message);
      setSnackbarErrorMsg(handleAuthErrorMsg(error.message));
    }
  };
  
// snakbar
const handleClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }
  setSnackbarOpen(false);
};

const action = (
  <React.Fragment>
    {/* <Button color="secondary" size="small" onClick={handleClose}>
      UNDO
    </Button> */}
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
      
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  </React.Fragment>
);
  return (
    <>
      <div className="main">
        <div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          message={snackbarErrorMsg}
          action={action}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
        />
        </div>
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
          <Button disabled={!userName || !email || !password} className="Register" type="submit" variant="contained">
            Register
          </Button>
          <Button
            fullWidth
            margin="dense"
            type="click"
            className="googleLogin"
            startIcon={<GoogleIcon />}
            variant="contained"
            onClick={googleSignin}
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
