import React, { useState } from 'react'
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
// import Axios from 'axios';
// import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';


export default function Login({ setToken }) {
    const [isSignup, setIsSignup] = useState(false)
    // const [alertContent, setAlertContent] = useState('');

    const [inputs, setInputs] = useState({
        userName: "",
        email: "",
        password: "",
    });

    const [alert, setAlert] = useState(false);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // isSignup === true ? postRequest() : getRequest();
        let token = ''
        if (isSignup) {
            token = await handlePost()
        }
        else {
            token = await handleGet()
        }
        // console.log("handlesubmit token", token)
        setToken(token);
    }

    async function handlePost() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "userName": inputs.userName,
            "password": inputs.password,
            "email": inputs.email
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch("http://localhost:8080/user/create", requestOptions)
            .then(response => {
                if (!response.data) {
                    setAlert(true);
                }
                return response.json();
            })
            .catch(error => console.log('error', error));
    }

    const handleGet = async() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        return fetch(`http://localhost:8080/user/login/${inputs.email}/${inputs.password}`, requestOptions)
            .then(response => {
                if (!response.data) {
                    setAlert(true);
                }
                return response.json();
            })
            .catch(error => console.log('error', error));
        
    }


    const resetState = () => {
        setAlert(false);
        setIsSignup(!isSignup);
        setInputs({ userName: '', email: '', password: '' });
    }

    // let navigate = useNavigate();

    // const routeChange = () => {
    //     let path = `/home`;
    //     navigate(path);
    // }

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
                    sx={{
                        ":hover": {
                            boxShadow: '10px 10px 20px #ccc'
                        }
                    }}>

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
                        placeholder="Username" />
                    }

                    <TextField
                        required
                        onChange={handleChange}
                        value={inputs.email}
                        name="email"
                        margin='normal'
                        type={'email'}
                        placeholder="Email Address" />

                    <TextField
                        required
                        autoComplete="on"
                        onChange={handleChange}
                        value={inputs.password}
                        name="password"
                        margin='normal'
                        sx={{ mb: 0, border: 1, borderColor: 'white', borderRadius: 4 }}
                        type={'password'}
                        placeholder="Password" />

                    {alert && isSignup &&
                        <Alert
                            sx={{ mt: 2, border: 1, borderColor: 'white', borderRadius: 7 }}
                            severity="error">
                            <strong>This Account Already Exists!</strong>
                        </Alert>
                    }

                    {alert && !isSignup &&
                        <Alert
                            sx={{ mt: 2, border: 1, borderColor: 'white', borderRadius: 7 }}
                            severity="error">
                            <strong>Incorrect username or password!</strong>
                        </Alert>
                    }

                    <Button
                        startIcon={isSignup ? <HowToRegIcon /> : <LoginIcon />}
                        type="submit"
                        sx={{ mt: 2, border: 1, borderColor: 'white', borderRadius: 4 }}
                        variant="contained"
                        color="warning">
                        {isSignup ? "Sign Up" : "Login"}
                    </Button>

                    <Button
                        startIcon={isSignup ? <LoginIcon /> : <HowToRegIcon />}
                        onClick={resetState}
                        sx={{ mt: 2, border: 1, borderColor: 'white', borderRadius: 4 }}>
                        Change To {isSignup ? "Login" : "Sign Up"}
                    </Button>

                </Box>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}