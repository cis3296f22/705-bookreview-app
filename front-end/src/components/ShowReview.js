import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import BackButton from './BackButton';

export default function ShowReview(token) {
    return (
        <StyledShelf>
            <Box sx={{
                background: "rgb(238,238,238)",
                borderRadius: '2%',
                marginTop: 12,
                paddingX: 12,
                paddingBottom: 12,
                boxShadow: 2
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    paddingTop: 2,
                    paddingBottom: 2,
                }}>
                    <BackButton/>
                    <Typography variant="h5">
                        Your Review
                    </Typography>
                </Box>
            </Box>
        </StyledShelf>
    )

}

const StyledShelf = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media only screen and (max-width: 600px) {
        padding: 1em;
    }
`;
