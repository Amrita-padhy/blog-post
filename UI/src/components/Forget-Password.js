import React from "react";
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from "react-router-dom";


const ForgetPassword = () => {
    return (
       <div className="main">
           <form className="Forget_Password_form"> 
           <h3>Forgot Password</h3>
           <TextField 
          fullWidth
          margin="dense"
          type={"email"}
           label=" Enter Email Adress"
            variant="outlined"
            name="email"
            />
            {/* buttons */}
<Button className="send"
        variant="contained">send</Button>

<Button className="logIn"
        variant="text">  
        <Link to="/login">Back to logIn </Link>
        </Button>

           </form>
           
       </div>
    )
}

export default ForgetPassword