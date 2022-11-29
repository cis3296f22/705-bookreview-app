//import * as React from 'react';
import { styled } from '@mui/system';
import { Box, Avatar, Typography, Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function Account(token) {
    const GetInfo = async (i) => {
        const response = await fetch(`http://localhost:8080/user/info/${token.token}`);
        const data = await response.json();
        console.log(data);
        if (i==0)
            return JSON.stringify(data.userName);
        else if (i==1)
            return JSON.stringify(data.email);
        else if (i==2)
            return JSON.stringify(data.bookList.length);
    }

    function RenderUserName() {
        const [apiResponse, setApiResponse] = useState("Fetching data..");
        useEffect(() => {
            GetInfo(0).then(
                result => setApiResponse(result));
        },[]);
        return(
            <div>
                {apiResponse}
            </div>
        );
    };

    function RenderEmail() {
        const [apiResponse, setApiResponse] = useState("Fetching data..");
        useEffect(() => {
            GetInfo(1).then(
                result => setApiResponse(result));
        },[]);
        return(
            <div>
                {apiResponse}
            </div>
        );
    };

    function RenderSavedBooks() {
        const [apiResponse, setApiResponse] = useState("Fetching data..");
        useEffect(() => {
            GetInfo(2).then(
                result => setApiResponse(result));
        },[]);
        return(
            <div>
                {apiResponse}
            </div>
        );
    };

    return (
        <MyComponent>
            <Avatar 
                sx={{ mt: 15, width: 200, height: 200}}
                src="./public/defaultpfp.png">
            </Avatar>
            <Box sx={{ display: "flex"}}>
            <Labels>
                <Typography variant="h5" paddingTop={10} paddingBottom={2}>
                    Username 
                </Typography>
                <Divider style={{width:'100%'}} />
                <Typography variant="h5" paddingY={2}>
                    Email
                </Typography>
                <Divider style={{width:'100%'}} />
                <Typography variant="h5" paddingY={2}>
                    Books Saved 
                </Typography>
            </Labels>
            <Labels>
                <Typography variant="h5" paddingLeft={20} paddingTop={10} paddingBottom={2}>
                <RenderUserName/>
                </Typography>
                <Divider style={{width:'100%'}} />
                <Typography variant="h5"  paddingLeft={20} paddingY={2}>
                    <RenderEmail/>
                </Typography>
                <Divider style={{width:'100%'}} />
                <Typography variant="h5"  paddingLeft={20} paddingY={2}>
                    <RenderSavedBooks/>
                </Typography>
            </Labels>
            </Box>
        </MyComponent>
    )
}

const MyComponent = styled('div')({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
});

const Labels = styled('div')({
    display: "flex",
    flexDirection: "column",
});
