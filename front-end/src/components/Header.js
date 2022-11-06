import styled from 'styled-components';
import { Link } from "react-router-dom";

function Header() {
    

    return (
        <StyledHeader>
            <HeaderLeft>
                <HeaderLink>Home</HeaderLink>
                <Link to="/search"><HeaderLink>Search</HeaderLink></Link>
            </HeaderLeft>
        </StyledHeader>
    )
}

export default Header;

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    @media only screen and (max-width: 600px) {
        justify-content: space-evenly;
    }
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 2em;
    @media only screen and (max-width: 600px) {
        gap: 0.7em;
    }
`
const HeaderLink = styled.button`
    height: 50px;
    background: transparent;
    border: none;
    padding: 0em 1em;
    font-size: 16px;
    &:hover {
        cursor: pointer;
    }
    @media only screen and (max-width: 600px) {
        font-size: 10px;
    }
`;

