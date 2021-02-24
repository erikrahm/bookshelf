import React, { useState } from 'react';
import styled from 'styled-components'

import LibraryContext from './utils/LibraryContext'
import { colors } from './utils/constants'
import Header from './components/Header'
import Search from './components/Search'
import Library from './components/Library'
import { BookType } from './components/Book';

const Wrapper = styled.main`
  position: relative;
  display: flex;
  width: 100vw;
  flex-direction: column;
`

const Footer = styled.div`
  min-height: 50px;
  flex: 1 0 0;
  background: ${colors.darkPurple};
  color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    padding: 0;
    margin: 0;

    span {
      color: ${colors.green}
    }
  }
`

const App: React.FC = () => {
  // The state of the Library that is used directly in the Library component
  // and is passed in to context to be used in non-parallel components
  const [library, updateLibrary] = useState<[] | BookType[]>([])

  // Callback to add books ot the Library
  const addBookToLibrary = (book: BookType) => {
    updateLibrary([...library, book]);
  }

  // Callback to remove books from the Library
  const removeBookFromLibrary = (book: BookType) => {
    const updatedLibrary = library.filter((lib) => lib.id !== book.id);
    updateLibrary(updatedLibrary);
  }

  return (
    <LibraryContext.Provider value={library}>
      <Wrapper>
        <Header />
        <Search addBook={addBookToLibrary} />
        <Library books={library} removeBook={removeBookFromLibrary} />
        <Footer><p>Erik <span>Rahm</span></p></Footer>
      </Wrapper>
    </LibraryContext.Provider>
  );
}

export default App;
