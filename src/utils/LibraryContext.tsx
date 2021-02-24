import { createContext } from 'react';
import { BookType } from '../components/Book';

const LibraryContext = createContext<[] | BookType[]>([]);

export default LibraryContext;
