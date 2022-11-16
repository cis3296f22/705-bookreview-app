// import AppBar from "./AppBar"
import styled from 'styled-components';
import BookCard from './BookCard';
import { useState } from 'react';

function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}`)
            const data = await response.json()
            console.log(data.items)
            if (data.items.length > 0) {
                setCards(data.items)
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
            const items = cards.map((item, i) => {
                let thumbnail = '';
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
                            isbn={item.volumeInfo.industryIdentifiers.identifier}
                            description={item.volumeInfo.description}
                            infoLink={item.volumeInfo.infoLink}
                        />
                    </div>
                );
            });
            return (
                <BookContainer>
                    {items}
                </BookContainer>
            );
        }
    }

    return (
        <>
            {/* <AppBar /> */}
            <StyledSearch>
                <Title>Search</Title>
                <Form onSubmit={handleSearch}>
                    <Input
                        type="text"
                        placeholder="Search by Book Title or Author"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button>Search</Button>
                </Form>
                {handleCards()}
            </StyledSearch>
        </>
    )
}

export default SearchBar;

const StyledSearch = styled.div`
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

const BookContainer = styled.button`
    display: flex;
    flex-direction: column;
    border: none;
    gap: 1em;
`;


