import { Button, Tooltip } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import * as React from 'react';
import { Link } from 'react-router-dom';

export default function BackButton({ title, author, isbn, genre, token }) {

    return (
        <div>
            <Tooltip title="Review This Book" placement='bottom' arrow>
                <Button onClick={() => { console.log("review") }} component={Link} to="/705-bookreview-app/review" key='review' 
                    startIcon={<KeyboardArrowLeftIcon />}
                >
                    Back
                </Button>
            </Tooltip>
        </div>
    );
}