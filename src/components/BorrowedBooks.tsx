import React from "react";
import { Book } from "../types";
import BookItem from "./BookItem";
import styles from "./BorrowedBooks.module.scss";

interface BorrowedBooksProps {
  books: Book[];
  onReturn: (book: Book) => void;
}

const BorrowedBooks: React.FC<BorrowedBooksProps> = ({ books, onReturn }) => {
  return (
    <div className={styles.borrowedBooks}>
      <h2 className={styles.borrowedBooksHeader}>Borrowed Books</h2>
      {books.length === 0 ? (
        <p>You have not borrowed any books.</p>
      ) : (
        books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onAction={onReturn}
            actionLabel="Return"
          />
        ))
      )}
    </div>
  );
};

export default BorrowedBooks;
