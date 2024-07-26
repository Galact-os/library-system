import React from "react";
import { Book } from "../types";
import styles from "./BookItem.module.scss";

interface BookItemProps {
  book: Book;
  onAction: (book: Book) => void;
  actionLabel: string;
}

const BookItem: React.FC<BookItemProps> = ({ book, onAction, actionLabel }) => {
  return (
    <div className={styles.bookItem}>
      <span className={styles.bookTitle}>
        {book.title} - Copies: {book.copies}
      </span>
      <button className={styles.actionButton} onClick={() => onAction(book)}>
        {actionLabel}
      </button>
    </div>
  );
};

export default BookItem;
