import React, { FormEvent, useState, KeyboardEvent, useEffect, useCallback } from 'react';
import styled from 'styled-components'

import Constraint from './Constraint'
import Book, { BookType } from './Book'
import { colors } from '../utils/constants'

const LIMIT = 5;
const DEFAULT_SKIP = 0;

const Wrapper = styled.section`
    position: relative;
    justify-content: center;
    display: flex;
    min-height: 530px;
`

const SearchBar = styled.div`
    display: flex;
    justify-content: center;
`

const SearchInput = styled.input`
    border: 1px solid ${colors.darkGrey};
    font-size: 20px;
    padding: 10px;
    border-radius: 5px;
    width: 500px;

    &:focus {
        border-color: ${colors.green};
        outline: none;
    }
`

const SearchButton = styled.button`
    box-shadow: none;
    padding: 5px;
    background: ${colors.white};
    border: none;
    height: 44px;
    width: 42px;
    border-left: 1px solid ${colors.darkGrey};
    position: relative;
    left: -43px;
    top: 1px;
    cursor: pointer;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

    &:hover {
        border-color: ${colors.green};
        background: ${colors.green};
        outline: none;
    }
`

const SearchIcon = styled.img`
    width: 20px;
`

const SearchResults = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
    align-items: center;
    justify-content: center;
`

const PaginateButton = styled.button`
    border: none;
    padding: 5px;
    font-style: italic;
    font-size: 16px;
    background: none;
    cursor: pointer;
    margin-top: 10px;
    color: ${colors.green}
`

// Format data into a usable structure
const ParseData = (data: any) => (
    data.map((result: any) => ({
        id: result.key,
        author: result.author_name,
        title: result.title,
        cover: result.cover_i ? `http://covers.openlibrary.org/b/ID/${result.cover_i}-M.jpg` : `${process.env.PUBLIC_URL}/cover-not-found.png`,
    }))
)

type SearchProps = {
    addBook: (book: BookType) => void;
}

const Search: React.FC<SearchProps> = ({ addBook }) => {
    // Search term (not used to manage the state of the Search input)
    const [searchTerm, updateSearchTerm] = useState<string>("");
    // Search results to be iterated over as Books
    const [rawResults, updateRawResults] = useState<[] | any[]>([]);
    // Search results to be iterated over as Books
    const [searchResults, updateSearchResults] = useState<[] | BookType[]>([]);
    // A loading state to indicate a Search is in progress
    const [isLoading, updateIsLoading] = useState<boolean>(false);
    // An error state to indicate a Search error
    const [isError, updateIsError] = useState<boolean>(false);
    // The start of the results range (skip + LIMIT = range)
    const [skip, updateSkip] = useState<number>(DEFAULT_SKIP);

    const handleSearchInput = (event: FormEvent<HTMLInputElement>) => {
        // Replacing spaces with '+' to align with the API spec
        updateSearchTerm(`${event.currentTarget.value}`.replaceAll(' ', '+'));
    }

    const handleEnterSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        // Watch for 'enters' to trigger a Search event
        if (event.key === 'Enter' && searchTerm.length) {
            searchOpenLibrary()
        }
    }

    const handleClickSearch = () => {
        // If there is a search term, trigger a Search event
        if (searchTerm.length) {
            searchOpenLibrary()
        }
    }

    const paginate = () => {
        // Update the skip to increment the results range
        updateSkip(skip + LIMIT);
    }

    const searchOpenLibrary = () => {
        // Enable the loading state while the fetch is processing
        updateIsLoading(true);
        // Setting the skip to the default value for future pagination on results
        updateSkip(DEFAULT_SKIP);
        // If an Error persists then disable the Error state while fetching
        if (isError) updateIsError(false);
        fetch(`http://openlibrary.org/search.json?q=${searchTerm}`, { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                updateRawResults(data.docs);
                // Enforce the default results range
                const results = data.docs.slice(DEFAULT_SKIP, DEFAULT_SKIP + LIMIT);

                // Format data into a usable structure
                updateSearchResults(ParseData(results))
                // Disable the loading state now that we have data
                updateIsLoading(false);
            })
            .catch(error => {  
                console.log('Request failed', error)  
                // Enable the error state
                updateIsError(true);
                // Disable the loading state now that we have an Error
                updateIsLoading(false);
            });
    }

    useEffect(() => {
        // Getting the next segment of the results range after a skip update
        if (skip > DEFAULT_SKIP) updateSearchResults(ParseData(rawResults.slice(skip, skip + LIMIT)));
    }, [skip, rawResults])

    return (
        <Wrapper>
            <Constraint>
                <SearchBar>
                    <SearchInput placeholder="Search" type="text" onChange={handleSearchInput} onKeyDown={handleEnterSearch} />
                    <SearchButton type="button" onClick={handleClickSearch}><SearchIcon src={`${process.env.PUBLIC_URL}/search.png`} alt="Search" /></SearchButton>
                </SearchBar>
                <SearchResults>
                    {isLoading && (
                        <p>Loading...</p>
                    )}
                    {isError && (
                        <p>Search Error!</p>
                    )}
                    {!isLoading && searchResults.map((result: BookType) => (
                        <Book key={result.id} book={result} callback={addBook} />
                    ))}
                </SearchResults>
                {!!searchResults.length && !isLoading && (<PaginateButton onClick={paginate}>Load More...</PaginateButton>)}
            </Constraint>
        </Wrapper>
    )
}

export default Search;