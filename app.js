import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box'
import Deviders from "../components/Deviders";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import jwt from 'jwt-decode'

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const postData = () => {
    axios.post(`http://localhost:4000/app/login`, {
      email,
      password
    }).then(res => {
      console.log(res)
      // console.log(res.data.token)
      const token = res.data.token;
      const user = jwt(token);
      
      // creating a javascript array to store the value
      const userDetail = { name: user.name, img: user.img };
      
      // storing the value in previous defined array
      localStorage.setItem('userDetail', JSON.stringify(userDetail))
      
      // passing the detail from array
      const retrieveUser = JSON.parse(localStorage.getItem('userDetail'));
      
      // value is ready to use
      console.log(retrieveUser.img);
      
      console.log(user)
       navigate("/home")
    }).catch((err) => {
      console.log(err.response)
      console.log(err.response.data.msg)
      setError(err.response.data.msg)
    })
  }

  
    const registerPage = () => {
      navigate("/register")
    }
    
  const myStyle = {
    margin: "4rem auto",
    width: "25rem",
    textAlign: "center",
  };
  const btn = {
    width: "350px",
    height: "40px",
    margin: "10px 0px 0px 0px",
  };
  return (
    <>
      {error ? <Alert severity="error" style={{position:'absolute',top:'5px'}}>{error}</Alert> : ''}
    <div style={myStyle}>
      <h1>Login to your account</h1>
      <p>
        Use your username or email address to get into your existing account.
      </p>
      <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "40ch" } }}
          noValidate
          autoComplete="off"
        >
      <TextField
            id="outlined-basic"
            label="Email*"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          /> 
          <TextField
          id="outlined-basic"
          label="Password*"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
      <Button variant="outlined" style={btn} onClick={postData}>
            Login
          </Button>
          </Box>
      <Deviders />
      <Link to="/forget">Forgot your Password</Link>
          <Button variant="contained" style={btn} onClick={registerPage} >
            create an account
          </Button>
    </div>
    </>
  );
}
