import { useState } from 'react';
// import * as React from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal'
// import Axios from 'axios';
// import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack';

function BookCard(props) {
    const {
        thumbnail,
        title,
        categories,
        pageCount,
        description,
        authors,
        publisher
    } = props;

    // const [alert, setAlert] = useState(false);
    const formattedAuthors = (authors) => {
        if (authors.length > 1) {
            return `${authors[0]}, ${authors[1]}`
        }
        else return authors
    }

    // const handleAdd = () => {
    //     console.log("add clicked")
    //     const endpoint = "http://localhost:8080/book/add"
    //     Axios.post(endpoint, {
    //         title: JSON.stringify(title),
    //         isbn: JSON.stringify(isbn),
    //         author: JSON.stringify(authors),
    //         genre: JSON.stringify(categories),
    //         shelfId: JSON.stringify(0)
    //     }).then(response => {
    //         if (response.data === 0) { // failed adding a book
    //             console.log("add failed")
    //             setAlert(true)
    //         }
    //         else {
    //             console.log("sucessfully added book"); // successfully added
    //             setAlert(false)
    //         }
    //         //console.log();
    //     }).catch(error=> {})
    // }

    const [isOpen, setIsOpen] = useState(false)
    const toggleModal = () => setIsOpen(!isOpen)

    return (
        <>
            <StyledBookCard>\
                <Thumbnail src={thumbnail}></Thumbnail>
                <Info>
                    <Title>{title}</Title>
                    <Authors>by {formattedAuthors(authors)}</Authors>
                    <Category>{categories}</Category>
                </Info>
            </StyledBookCard>
            <StyledModal
                isOpen={isOpen}
                onBackgroundClick={toggleModal}
                onEscapeKeydown={toggleModal}>
                <ModalLeft>
                    <ModalThumbnail src={thumbnail}></ModalThumbnail>
                </ModalLeft>
                <ModalInfo>
                    <ModalTitle>{title}</ModalTitle>
                    <ModalAuthors>by {formattedAuthors(authors)}</ModalAuthors>
                    <ModalCategory>{categories}</ModalCategory>
                    <ModalPages>{pageCount} pages</ModalPages>
                    <ModalPublisher>{publisher ? `Published by ${publisher}` : null}</ModalPublisher>
                    <ModalDesc>{description}</ModalDesc>
                    <Close onClick={toggleModal}>Close</Close>
                </ModalInfo>
            </StyledModal>

        </>
    )
}

// const Button = styled.div`
//     m = {1};
// `;

const Thumbnail = styled.img`
    height: 100px;
    width: 66px;
`;

const Info = styled.div`
    padding-left: 1em;
    display: flex;
    flex-direction: column;
`;

const StyledBookCard = styled.div`
    display: flex;
    border-bottom: 1px solid #E8E8E8;
    width: 50vw;
    @media only screen and (max-width: 600px) {
        width: 70vw;
    }
`;

const Title = styled.div`
    display: flex;
    text-align: left;
    font-weight: 900;
    font-size: 14px;
    @media only screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

const Authors = styled.div`
    display: flex;
    text-align: left;
    font-size: 14px;
    @media only screen and (max-width: 600px) {
        font-size: 10px;
    }
`;

const Category = styled.div`
    display: flex;
    text-align: left;
    font-size: 14px;
    @media only screen and (max-width: 600px) {
        font-size: 10px;
    }
`;



const ModalThumbnail = styled.img`
    height: 200px;
    @media only screen and (max-width: 600px) {
        height: 100px;
    }
`;

const ModalLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
`;

const ModalTitle = styled(Title)`
    font-size: 18px;
    @media only screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

const ModalAuthors = styled(Authors)`
    font-size: 16px;
    @media only screen and (max-width: 600px) {
        font-size: 10px;
    }
`;

const ModalCategory = styled(Category)`
`;

const ModalInfo = styled(Info)`
`;

const ModalPages = styled(Category)`
`;

const ModalPublisher = styled(Category)`
`;

const ModalDesc = styled.div`
    font-size: 12px;
    padding: 1em 0em;
    @media only screen and (max-width: 600px) {
        font-size: 8px;
    }
`;

const StyledModal = Modal.styled`
  width: 50vw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: white;
  padding: 2em;
  border-radius: 5px;
  @media only screen and (max-width: 600px) {
    padding: 1em;
    width: 70vw;
}
`;

const Close = styled.button`
    font-size: 12px;
    align-self: flex-end;
    background: transparent;
    border: none;
    &:hover {
        cursor: pointer;
        color: rgb(55,34,19);
    }
    @media only screen and (max-width: 600px) {
        font-size: 8px;
    }
`;


export default BookCard;