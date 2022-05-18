import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import "./App.css";

const Regpage = () => {
  const initialvalue = {
    username: "",
    email: "",
    password: "",
  };

  const [inputValues, setInputValue] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  
  // function
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(inputValues));
      if (inputValues.email.length && inputValues.password.length && inputValues.username.length) {
        let usersList = [];
        if (localStorage.getItem("usersList")) {
          usersList = JSON.parse(localStorage.getItem("usersList")); // if users list exist then store the users list
        }
        usersList.push(inputValues); // push the current user to the exist users array .
        localStorage.setItem("usersList", JSON.stringify(usersList)); // save the users list with the new uesr in local storage
        setInputValue(initialvalue); // once form saved succefully clear the input values. 
      }
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
        username: null,
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.username) {
      errors.username = "username is required!";
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
    <div className="main">
      <form className="registration_form" onSubmit={handleSubmit}>
        {/* Register page */}
        <div className="inputs">
          <p> {formErrors.username} </p>
          <label htmlFor="username"> User Name </label>
          <input
            type="text"
            placeholder="User Name"
            name="username"
            value={inputValues.username}
            onChange={handleChange}
          />
          <p> {formErrors.email} </p> <label htmlFor="email"> Email </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={inputValues.email}
            onChange={handleChange}
          />
          <p> {formErrors.password} </p>
          <label htmlFor="password"> Password </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={inputValues.password}
            onChange={handleChange}
          />
        </div>
        <div className="btn_container_two">
          <button className="exist">
            <Link to="/login">Exist User </Link>
          </button>
          <button className="Register" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Regpage;
