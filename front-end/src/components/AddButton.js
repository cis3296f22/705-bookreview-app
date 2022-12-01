import { Button, Menu, MenuItem, Tooltip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import * as React from 'react';


export default function AddButton({ title, author, isbn, genre, token }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleAdd = ((shelfId) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = `{\n    "title": "${title}",\n    "author": "${author}",\n    "genre": "${genre}",\n    "isbn": "${isbn}",\n    "shelfId": "${shelfId}"\n}`;
        console.log(raw)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        console.log(token)
        fetch(`https://bookdandrated.herokuapp.com/user/add/${token.token}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    })


    return (
        <div>
            <Tooltip title="Choose Shelf" placement='bottom' arrow>
                <Button
                    // title='Choose Shelf'
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    Add
                </Button>
            </Tooltip>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={() => {handleAdd(0)}}>Want to Read</MenuItem>
                <MenuItem onClick={() => {handleAdd(1)}}> Finished Reading</MenuItem>
            </Menu>
        </div>
    );
}