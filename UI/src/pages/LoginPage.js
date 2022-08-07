import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { login } from "../util/firebase";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../contextPage/Context";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const LoginPage = () => {
  const { login, signInWithGoogle, handleAuthErrorMsg } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarErrorMsg, setSnackbarErrorMsg] = useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  // functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      const { user } = await login(email, password);
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
      setSnackbarOpen(true);
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
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
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
        className="login_form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
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
          type="button"
          className="googleLogin"
          startIcon={<GoogleIcon />}
          variant="contained"
          onClick={googleSignin}
        >
          Sign In with Google
        </Button>
      </form>
    </div>
  );
};
export default LoginPage;
