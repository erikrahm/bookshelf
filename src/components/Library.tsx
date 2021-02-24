import React from 'react';
import styled from 'styled-components';

import { colors } from '../utils/constants';
import Constraint from './Constraint'
import Book, { BookType } from './Book';

const LibraryWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  min-height: 600px;
`

const LibraryHeader = styled.div`
  position: relative;
`

const HorizontalRule = styled.div`
  flex: 1 0 0;
  height: 5px;
  background: ${colors.white};
`

const Heading = styled.h4`
  color: ${colors.darkPurple};
  background: ${colors.grey};
  font-size: 28px;
  position: absolute;
  top: -17px;
  padding: 0 10px;
  margin: 0;
  left: 56px;
  font-weight: 600;
  font-spacing: -.5px;
`

const LibraryContents = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 50px 0 75px;
`


type LibraryProps = {
    books: BookType[]
    removeBook: (book: BookType) => void;
}

const Library: React.FC<LibraryProps> = ({ books, removeBook }) => (
    <LibraryWrapper>
      <Constraint>
        <LibraryHeader>
          <HorizontalRule />
          <Heading>Library</Heading>
        </LibraryHeader>
        <LibraryContents>
          {!!books.length && books.map((result: BookType) => (
            <Book key={result.id} book={result} callback={removeBook} libraryMode />
          ))}
        </LibraryContents>
      </Constraint>
    </LibraryWrapper>
)

export default Library;