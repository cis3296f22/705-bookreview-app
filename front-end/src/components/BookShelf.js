import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import BookCard from './BookCard';
import styled from 'styled-components';
import { useState } from 'react';

export default function BookShelf(token) {
    console.log(token)
    // const [searchValue, setSearchValue] = useState('');
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleShelf = async (shelfId, e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const books = [];
            const response = await fetch(`http://localhost:8080/user/get/${token.token}`)
            const data = await response.json()
            // console.log(data)
            const isbnarray = []
            data.forEach((element) => {
                if (element.shelfId === shelfId) {
                    isbnarray.push(element.isbn)
                }
            });

            console.log("isbnarray: "+isbnarray)
            await Promise.all(
                isbnarray.map(async (isbn) => {
                    const apiresponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
                    const apidata = await apiresponse.json()
                    //console.log("apidata: ", apidata)
                    books.push(apidata.items[0])
                    //console.log("apiarray:", apiarray)
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
            return <div>Fetching results...</div>;
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
                    // Checking to see if the book has isbn_13 set

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
                        {/* <AddButton 
                            title={item.volumeInfo.title}
                            author={authors}
                            genre={item.volumeInfo.categories}
                            isbn={isbn}
                            token={token}
                        /> */}

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



    return (
        <>
            {/* <AppBar /> */}
            <StyledShelf>
                <Title>Search</Title>
                {/* <Form onSubmit={handleSearch}> */}
                    {/* <Input
                        type="text"
                        placeholder="Search by Book Title or Author"
                        // value={searchValue}
                        // onChange={(e) => setSearchValue(e.target.value)}
                    /> */}
                    <LoadingButton 
                        // variant="contained" 
                        onClick={(e) => {handleShelf(0,e)}}
                        loading={loading}
                    >
                        Want To Read
                    </LoadingButton>

                    <LoadingButton 
                        // variant="contained" 
                        onClick={(e) => {handleShelf(1,e)}}
                        loading={loading}
                    >
                        Finished Reading
                    </LoadingButton>
                {/* </Form> */}
                {searchCards}
            </StyledShelf>
        </>
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

const Form = styled.form`
    background-color: rgb(238,238,238);
    display: flex;
    justify-content: center;
    padding: 1em;
    gap: 0.5em;
    width: 48vw;
    margin-bottom: 1em;
    border-radius: 5px;
    @media only screen and (max-width: 600px) {
        width: 15em;
    }
`;

const Input = styled.input`
    font-family: sans-serif;
    width: 45em;
    height: 1em;
    padding: 0.5em;
    border-radius: 3px;
    font-size: 14px;
    border: 1px solid #DCD6CC;
    @media only screen and (max-width: 600px) {
        width: 18em;
        font-size: 10px;
    }
`;

const Button = styled.button`
    border: 1px solid #D6D0C4;  
    padding: 0.4em;
    font-size: 14px;
    color: rgb(55,34,19);
    border-radius: 3px;
    font-family: sans-serif;
    align-self: center;
    &:hover {
        cursor: pointer;
    }
    @media only screen and (max-width: 600px) {
        font-size: 10px;
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
