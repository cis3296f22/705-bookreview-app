import { Button, Tooltip } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import * as React from 'react';
import { Link } from 'react-router-dom';

export default function ReviewButton({ title, author, isbn, genre, token }) {

    return (
        <div>
            <Tooltip title="Review This Book" placement='bottom' arrow>
                <Button onClick={() => { console.log("show review") }} component={Link} to="/705-bookreview-app/showreview" key='showreview' 
                    endIcon={<KeyboardArrowRightIcon />}
                >
                    Review
                </Button>
            </Tooltip>
        </div>
    );
}