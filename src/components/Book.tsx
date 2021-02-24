import React, { useContext } from 'react';
import styled from 'styled-components';

import LibraryContext from '../utils/LibraryContext'
import { colors } from '../utils/constants';
import Button from './Button'

const BookWrapper = styled.div`
    background: ${colors.white};
    border-radius: 5px;
    box-shadow: 0px 0px 6px -2px ${colors.darkGrey};
    width: 200px;
    display: flex;
    padding: 10px;
    flex-direction: column;
    margin-right: 10px;
    margin-top: 10px;
    height: 365px;

    &:nth-of-type(5n) {
        margin-right: 0;
    }
`

const ImageWrapper = styled.div`
    width: calc(100% - 4px);
    height: 250px;
    border: 2px solid ${colors.grey};
    background: ${colors.white};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: 100%;
        max-height: 250px;
    }
`

const Title = styled.div`
    font-style: italic;
    margin-top: 10px;
    font-size: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const Author = styled.div`
    font-weight: 600;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const AddButton = styled(Button)`
    margin-top: 20px;
`

const DuplicateButton = styled(AddButton)`
    background: ${colors.purple};
    cursor: default;

    &:hover {
        background: ${colors.purple};
    }
`

const RemoveButton = styled(AddButton)`
    background: #CC6767;
`

export interface BookType {
    id: string;
    author: string;
    title: string;
    cover: string;
}

type BookProps = {
    book: BookType
    libraryMode?: boolean;
    callback: (book: BookType) => void
}

const Book: React.FC<BookProps> = ({ book, callback, libraryMode = false}) => {
    // Fetching all current books in the Library from Context
    const library = useContext<[] | BookType[]>(LibraryContext);
    // Not using Array.prototype.includes() here because it will only do a shallow comparison
    const bookInLibrary = !!library.find(lib => lib.id === book.id);
    // Passing the current Book to the callback function
    const clickHandler = () => callback(book);

    return(
        <BookWrapper>
            <ImageWrapper>
                <img src={book.cover} alt={`${book.title}-${book.author}`}/>
            </ImageWrapper>
            <Title>{book.title}</Title>
            <Author>{book.author || 'N/A'}</Author>
            {libraryMode && (<RemoveButton onClick={clickHandler}>Remove Book</RemoveButton>)}  
            {!libraryMode && (
                <>
                    {bookInLibrary ? (
                        <DuplicateButton>Book In Library</DuplicateButton>
                    ) : (
                        <AddButton onClick={clickHandler}>Add Book</AddButton>
                    )}
                </>
            )}
        </BookWrapper>
    )
}

export default Book;