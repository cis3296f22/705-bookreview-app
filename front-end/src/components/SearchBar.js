// import AppBar from "./AppBar"
import styled from 'styled-components';
import BookCard from './BookCard';
import { useState } from 'react';
import AddButton from './AddButton';

function SearchBar(token) {
    console.log(token)
    const [searchValue, setSearchValue] = useState('');
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategory] = useState("");


    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=$` +searchValue +categories +`&maxResults=30`)
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
    function onCategoryChange(e) {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory)
    };

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
                        <AddButton 
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
                
                <div className="selected-wrapper">
                    <select onChange = {onCategoryChange}>
                        <option value="">All</option>
                        <option value="+subject:Antiques & Collectibles">Antiques & Collectibles</option>
                        <option value="+subject:Architecture">Architecture</option>
                        <option value="+subject:Art">Art</option>
                        <option value="+subject:Bibles">Bibles</option>
                        <option value="+subject:Biography & Autobiography">Biography & Autobiography</option>
                        <option value="+subject:Body, Mind & Spirit">Body, Mind & Spirit</option>
                        <option value="+subject:Business & Economics">Business & Economics</option>
                        <option value="+subject:Comics & Graphic Novels">Comics & Graphic Novels</option>
                        <option value="+Computers">Computers</option>
                        <option value="+subject:Cooking">Cooking</option>
                        <option value="+subject:Crafts & Hobbies">Crafts & Hobbies</option>
                        <option value="+subject:Design">Design</option>
                        <option value="+subject:Drama">Drama</option>
                        <option value="+subject:Education">Education</option>
                        <option value="+subject:Family & Relationships">Family & Relationships</option>
                        <option value="+subject:Fiction">Fiction</option>
                        <option value="+subject:Foreign Language Study">Foreign Language Study</option>
                        <option value="+subject:Games & Activities">Games & Activities</option>
                        <option value="+subject:Gardening">Gardening</option>
                        <option value="+subject:Health & Fitness">Health & Fitness</option>
                        <option value="+subject:History">History</option>
                        <option value="+subject:House & Home">House & Home</option>
                        <option value="+subject:Humor">Humor</option>
                        <option value="+subject:Junvenile Fiction">Juvenile Fiction</option>
                        <option value="+subject:Juvenile Nonfiction">Juvenile Nonfiction</option>
                        <option value="+subject:Language Arts & Disciplines">Language Arts & Disciplines</option>
                        <option value="+subject:Law">Law</option>
                        <option value="+subject:Literary Collections">Literary Collections</option>
                        <option value="+subject:Literary Criticism">Literary Criticism</option>
                        <option value="+subject:Mathematics">Mathematics</option>
                        <option value="+subject:Medical">Medical</option>
                        <option value="+subject:Music">Music</option>
                        <option value="+subject:Nature">Nature</option>
                        <option value="+subject:Performing Arts">Performing Arts</option>
                        <option value="+subject:Pets">Pets</option>
                        <option value="+subject:Philosophy">Philosophy</option>
                        <option value="+subject:Photography">Photography</option>
                        <option value="+subject:Poetry">Poetry</option>
                        <option value="+subject:Political Science">Political Science</option>
                        <option value="+subject:Psychology">Psychology</option>
                        <option value="+subject:Reference">Reference</option>
                        <option value="+subject:Religion">Religion</option>
                        <option value="+subject:Science">Science</option>
                        <option value="+subject:Self-help">Self-help</option>
                        <option value="+subject:Social Science">Social Science</option>
                        <option value="+subject:Sports & Recreation">Sports & Recreation</option>
                        <option value="+subject:tudy Aids">Study Aids</option>
                        <option value="+subject:Technology & Engineering">Technology & Engineering</option>
                        <option value="+subject:Transportation">Transportation</option>
                        <option value="+subject:Travel">Travel</option>
                        <option value="+subject:True Crime">True Crime</option>
                        <option value="+subject:Young Adult Fiction">Young Adult Fiction</option>
                        <option value="+subject:Young Adult Nonfiction">Young Adult Nonfiction</option>
                        
                
                        
                    </select>
                </div>
                {searchCards}
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


