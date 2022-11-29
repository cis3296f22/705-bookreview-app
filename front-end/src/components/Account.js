import * as React from 'react';
import { styled } from '@mui/system';
import { Box, Avatar, Typography, Divider } from '@mui/material';

export default function Account(token) {
    const getInfo = async () => {
        const response = await fetch(`http://localhost:8080/user/info/${token.token}`);
        const data = await response.json();
        console.log(data);
    }
    const info = getInfo();

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
                     <div>.</div>
                </Typography>
                <Divider style={{width:'100%'}} />
                <Typography variant="h5"  paddingLeft={20} paddingY={2}>
                    <div>.</div>
                </Typography>
                <Divider style={{width:'100%'}} />
                <Typography variant="h5"  paddingLeft={20} paddingY={2}>
                    <div>.</div>
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
