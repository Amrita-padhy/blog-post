import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
            <p>{formErrors.password}</p>
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
        <Button className="logIn"
        variant="contained">logIn</Button>
          {/* <button className="logIn">Log In</button> */}

        <div className="btn_container_one">
            <Link to="/registration">Do not have an account</Link>
            <Link to="/Forget-Password">Forget Password</Link>
        </div>
      </form>
    </div>
  );
};

export default Loginpage;
