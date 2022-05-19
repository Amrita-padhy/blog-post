import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

import axios from "axios";
// import "./App.css";

const Regpage = () => {
  const navigate = useNavigate();
  const initialvalue = {
    userName: "",
    email: "",
    password: "",
  };

  const [inputValues, setInputValue] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");

  // function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(inputValues));
    const { data } = await axios.post(
      "https://us-central1-react-demo-e1d88.cloudfunctions.net/register",
      inputValues
    );
    console.log(data);
    if (data.status) {
      navigate("/login");
    } else {
      setError(data.message);
    }
    // if (inputValues.email.length && inputValues.password.length && inputValues.userName.length) {
    //   let usersList = [];
    //   if (localStorage.getItem("usersList")) {
    //     usersList = JSON.parse(localStorage.getItem("usersList")); // if users list exist then store the users list
    //   }
    //   usersList.push(inputValues); // push the current user to the exist users array .
    //   localStorage.setItem("usersList", JSON.stringify(usersList)); // save the users list with the new uesr in local storage
    //   setInputValue(initialvalue); // once form saved succefully clear the input values.
    // }
  };

  // useEfect
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValues,
      [name]: value,
    });
    if (e.target.type === "text") {
      setFormErrors({
        ...formErrors,
        userName: null,
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.userName) {
      errors.userName = "userName is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailFormat.test(values.email)) {
      errors.email = "You have entered an invalid email address!";
    }
    if (!values.password) {
      errors.password = "password is required!";
    } else if (values.password.length < 4) {
      errors.password = "password must be more than 4 characters!";
    } else if (values.password.length > 10) {
      errors.password = "password can not be more than 10 characters!";
    }
    return errors;
  };

  return (
    <>
      
      <div className="main">
        <form className="registration_form" onSubmit={handleSubmit}>
          {/* Register page */}
          <div className="inputs">
          {error && (
        <Alert className="showError" variant="outlined" severity="error">
          {error}
        </Alert>
      )}
            <p> {formErrors.userName} </p>
            <TextField
              fullWidth
              margin="dense"
              type={"text"}
              label="User Name"
              variant="outlined"
              name="userName"
              value={inputValues.userName}
              onChange={handleChange}
            />

            <p> {formErrors.email} </p>
            <TextField
              fullWidth
              margin="dense"
              type={"email"}
              label="Email"
              variant="outlined"
              name="email"
              value={inputValues.email}
              onChange={handleChange}
            />

            <p> {formErrors.password} </p>
            <TextField
              fullWidth
              margin="dense"
              type={"password"}
              label="password"
              variant="outlined"
              name="password"
              value={inputValues.password}
              onChange={handleChange}
            />
          </div>
          <Button className="Register" type="submit" variant="contained">
            Register
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
