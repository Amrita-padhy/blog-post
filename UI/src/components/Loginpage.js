import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Loginpage = () => {
  const initialvalue = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [inputValues, setInputValue] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // functions
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(inputValues));
    setIsSubmit(true);

    //
    const usersDetails = JSON.parse(localStorage.getItem("usersList"));
    // console.log(usersDetails);

    const user = usersDetails.filter((user) => {
      if (
        user.email === inputValues.email &&
        user.password === inputValues.password
      ) {
        return user;
      }
    });
    console.log(user);
    if (user.length) {
        navigate('/home')
    }else{
        alert("User Invalid")
        
    }
  };
  // useEfect
  useEffect(() => {
    // console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(inputValues);
    }
  }, [formErrors]);

  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setInputValue({ ...inputValues, [name]: value });
    setFormErrors({ email: null });
    setFormErrors({ password: null });

    // console.log(inputValues);
  };
  const validate = (values) => {
    const errors = {};
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
      {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(inputValues, undefined, 2)}</pre>
      )} */}
      <form className="login_form" onSubmit={handleSubmit}>
        <div className="inputs">
          <p>{formErrors.email}</p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={inputValues.email}
            onChange={handleChange}
          />

          <p>{formErrors.password}</p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={inputValues.password}
            onChange={handleChange}
          />
        </div>

        <div className="btn_container_one">
          <button className="newUser">
            <Link to="/registration">New User?</Link>
          </button>
          <button className="logIn">Log In</button>
        </div>
      </form>
    </div>
  );
};

export default Loginpage;
