import BookCard from './BookCard';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ReviewButton from './ReviewButton';


export default function Review(token) {
    console.log(token)
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleShelf = async () => {
        setLoading(true)
        try {
            const books = [];
            const response = await fetch(`https://bookdandrated.herokuapp.com/user/get/${token.token}`)
            const data = await response.json()
            const isbnarray = []
            data.forEach((element) => {
                isbnarray.push(element.isbn)
            });

            console.log("isbnarray: "+isbnarray)
            await Promise.all(
                isbnarray.map(async (isbn) => {
                    const apiresponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
                    const apidata = await apiresponse.json()
                    console.log("apidata: ", apidata)
                    if(apidata.totalItems !== 0){
                        books.push(apidata.items[0])
                    }
                })
            ).then(function () {
                // setCards(apiarray);
                // console.log("cards: ",cards)            
            })

            console.log(books)
            if (books.length > 0) {
                setCards(books)
                setLoading(false)
            }
        } catch (err) {
            setLoading(true)
            console.log(err)
        }

    }

    const handleCards = () => {
        if (loading) {
            return <div>Fetching books...</div>;
        } else {
            console.log(cards);
            const items = cards.map((item, i) => {
                let thumbnail = '';
                if (item.volumeInfo.imageLinks) {
                    thumbnail = item.volumeInfo.imageLinks.thumbnail;
                }

                let authors = [];
                if (item.volumeInfo.authors) {
                    authors = item.volumeInfo.authors;
                }

                let isbn = "";
                if (item.volumeInfo.industryIdentifiers) {
                    const identifierArray = item.volumeInfo.industryIdentifiers;
                    const filteredIdentifiers = identifierArray.filter((identifier) => identifier.type === "ISBN_13");
                    if (filteredIdentifiers) {
                        const identifierObject = filteredIdentifiers[0]
                        if (identifierObject) {
                            isbn = identifierObject.identifier
                        }
                    }
                }

                return (
                    <SearchContainer key={item.id} >
                        <BookCard
                            id={item.id}
                            thumbnail={thumbnail}
                            title={item.volumeInfo.title}
                            categories={item.volumeInfo.categories}
                            pageCount={item.volumeInfo.pageCount}
                            authors={authors}
                            publisher={item.volumeInfo.publisher}
                            isbn={isbn}
                            description={item.volumeInfo.description}
                            infoLink={item.volumeInfo.infoLink}
                        />
                        <ReviewButton 
                            title={item.volumeInfo.title}
                            author={authors}
                            genre={item.volumeInfo.categories}
                            isbn={isbn}
                            token={token}
                        />
                    </SearchContainer>
                );
            });
            return (
                <BookContainer>
                    {items}
                </BookContainer>
            );
        }
    }
    const searchCards = handleCards();
    useEffect(() => {
        handleShelf();
    }, []);

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
            <Typography variant="h5" paddingTop={3} paddingBottom={1}>
                Choose a Saved Book To Review
            </Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    background: "rgb(208,208,208)",
                    alignItems: "center",
                    justifyContent: "left",
                    boxShadow: 2
                }}>
                </Box>
            {searchCards}
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

const Title = styled.div`
    font-weight: bold;
    color: rgb(55,34,19);
    padding: 1em 0em;
    font-size: 20px;
    @media only screen and (max-width: 600px) {
        font-size: 14px;
    }
`;

const BookContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    color: rgb(106,20,72);
`;

const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    border: 3px solid #D6D0C4;
`;
