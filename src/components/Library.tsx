import React from "react";
import { Book } from "../types";
import BookItem from "./BookItem";
import styles from "./Library.module.scss";

interface LibraryProps {
  books: Book[];
  onBorrow: (book: Book) => void;
}

const Library: React.FC<LibraryProps> = ({ books, onBorrow }) => {
  return (
    <div className={styles.library}>
      <h2 className={styles.libraryHeader}>Library</h2>
      {books.length === 0 ? (
        <p>The library is empty.</p>
      ) : (
        books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onAction={onBorrow}
            actionLabel="Borrow"
          />
        ))
      )}
    </div>
  );
};

export default Library;
