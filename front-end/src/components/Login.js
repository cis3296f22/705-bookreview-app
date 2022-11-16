import React, { useState } from 'react'
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [isSignup, setIsSignup] = useState(false)
    // const [alertContent, setAlertContent] = useState('');

    const [inputs, setInputs] = useState({
        userName:"",
        email:"",
        password:"",
    });

    const [alert, setAlert] = useState(false);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        isSignup === true ? postRequest() : getRequest();
    }

    const postRequest = () => {
        console.log("postreq functoin called! wohooo");
        const createEndpoint = "http://localhost:8080/user/create"
        Axios.post(createEndpoint,{
            userName: inputs.userName,
            password: inputs.password,
            email: inputs.email
            })
            .then(response=>{
            if(response.data === 0){ // failed creating account 
                setAlert(true);
            }
            else{
                console.log("sucessfully created user"); // successfully create a user
                setAlert(false);
                routeChange();
            }
            console.log(inputs);
        })
    }

    const getRequest = () => {
        console.log("getReq called wohooo");

        const url = `http://localhost:8080/user/login/${inputs.email}/${inputs.password}`
        Axios.get(url)  
            .then(response=>{
            if(response.data === 0){ // failed logging in 
                setAlert(true);
                }
            else{
                console.log("sucessfully created user"); // Successfully logged in 
                setAlert(false);
                routeChange();
            }
        })
    }

    const resetState = () => {
        setAlert(false);
        setIsSignup(!isSignup);
        setInputs({userName:'', email:'', password:''});
    }

    let navigate = useNavigate(); 

    const routeChange = () =>{ 
        let path = `/home`; 
        navigate(path);
    }
  
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <Box 
                display="flex" 
                flexDirection={"column"} 
                maxWidth={400} 
                alignItems="center" 
                justifyItems="center" 
                // bgcolor="warning.main"
                margin="auto"
                mt={20}
                padding={4}
                borderRadius={5}
                boxShadow='5px 5px 10px #ccc'
                sx={{":hover": {
                    boxShadow:'10px 10px 20px #ccc'
                }}}>

                <Typography variant="h4" padding={2} textAlign="center">
                {isSignup ? "Sign Up" : "Login"}
                </Typography>

                {isSignup && <TextField 
                    required
                    autoComplete="on"
                    onChange={handleChange}
                    value={inputs.userName}
                    name="userName" 
                    mt="2" 
                    margin='normal' 
                    type={'text'} 
                    placeholder="Username"/>
                }

                <TextField 
                    required
                    onChange={handleChange}
                    value={inputs.email}
                    name="email" 
                    margin='normal' 
                    type={'email'} 
                    placeholder="Email Address"/>

                <TextField 
                    required
                    autoComplete="on" 
                    onChange={handleChange}
                    value={inputs.password}
                    name="password" 
                    margin='normal' 
                    sx={{ mb: 0, border: 1, borderColor: 'white', borderRadius:4 }} 
                    type={'password'} 
                    placeholder="Password"/>

                {alert && isSignup && 
                <Alert 
                    sx={{ mt: 2, border: 1, borderColor: 'white', borderRadius:7 }}
                    severity="error">
                    <strong>This Account Already Exists!</strong>
                </Alert>
                }

                {alert && !isSignup && 
                <Alert 
                    sx={{ mt: 2, border: 1, borderColor: 'white', borderRadius:7 }}
                    severity="error">
                    <strong>Incorrect username or password!</strong>
                </Alert>
                }

                <Button  
                    startIcon={isSignup ? <HowToRegIcon/> : <LoginIcon/>}
                    type="submit"
                    sx={{ mt: 2, border: 1, borderColor: 'white', borderRadius:4 }} 
                    variant="contained" 
                    color="warning">
                    {isSignup ? "Sign Up": "Login"}
                </Button>

                <Button 
                    startIcon={isSignup ? <LoginIcon/> : <HowToRegIcon/>}
                    onClick={resetState} 
                    sx={{ mt: 2, border: 1, borderColor: 'white', borderRadius:4 }}>
                    Change To {isSignup ? "Login" : "Sign Up"}
                </Button>

            </Box>
        </form>
    </div>
  )
}

export default Login;