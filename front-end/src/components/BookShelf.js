import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
import BookCard from './BookCard';
import styled from 'styled-components';
import { useState } from 'react';


export default function BookShelf() {
    const apiarray = []
    const [cards, setCards] = useState([]);

    const handleShelves = async () => {

        try {
            const response = await fetch(`http://localhost:8080/book/all`)
            const data = await response.json()

            console.log(data)

            const isbnarray = []
            data.forEach((element) => {
                isbnarray.push(element.isbn)
            });

            console.log("isbnarray: "+isbnarray)


            await Promise.all(
                isbnarray.map(async (isbn) => {
                    const apiresponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
                    const apidata = await apiresponse.json()
                    // console.log(apidata)
                    //apiarray.push(apidata)
                    // console.log(apiarray)
                    if (apidata.items.length > 0) {
                        setCards(data.items)
                    }
                    console.log("cards: "+cards);
                })
                
            ).then(function (result) {
                console.log(result)
            })
            
            

        } catch (err) {
            // setLoading(true)
            console.log(err)
        }

    }
    const handleCards = () => {
        console.log(cards)
        const items = cards.map((item) => {
            let thumbnail = '';
            // console.log("hello")
            console.log(items)

            if (item.volumeInfo.imageLinks) {
                thumbnail = item.volumeInfo.imageLinks.thumbnail;
            }

            let authors = [];
            if (item.volumeInfo.authors) {
                authors = item.volumeInfo.authors;
            }

            return (
                <div key={item.id}>
                    <BookCard
                        id={item.id}
                        thumbnail={thumbnail}
                        title={item.volumeInfo.title}
                        categories={item.volumeInfo.categories}
                        pageCount={item.volumeInfo.pageCount}
                        authors={authors}
                        publisher={item.volumeInfo.publisher}
                        description={item.volumeInfo.description}
                        infoLink={item.volumeInfo.infoLink}
                    />
                </div>
            );
        });
        return (
            <BookContainer>{items}</BookContainer>
        );
        // }
    }

    return (
        <div>
            {handleShelves()}
            {handleCards(apiarray)}
            {/* <Box sx={{ width: '100%', position: "center" }}>
                <Grid container direction="column" sx={{ top: 100, right: 200 }} rowSpacing={1} columnSpacing={{ xs: 4, sm: 2, md: 4 }}>
                    <Grid item xs={6}>
                        <Item>1</Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>2</Item>
                    </Grid>
                </Grid>
            </Box> */}
        </div>
    );
}

const BookContainer = styled.button`
    display: flex;
    flex-direction: column;
    border: none;
    gap: 1em;
`;
