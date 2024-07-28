import React, { useState } from "react";
import Library from "./components/Library";
import BorrowedBooks from "./components/BorrowedBooks";
import { Book } from "./types";
import styles from "./App.module.scss";

const App: React.FC = () => {
  const initialLibrary: Book[] = [
    { id: 1, title: "Book One", copies: 3 },
    { id: 2, title: "Book Two", copies: 1 },
    { id: 3, title: "Book Three", copies: 2 },
  ];

  const errorMessage = () => {
    return (
      <div className={styles.errorMessage}>
        You can only borrow up to 2 books at a time.
      </div>
    );
  };

  const [library, setLibrary] = useState<Book[]>(initialLibrary);
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);
  const [errComp, setErrComp] = useState(<></>);

  const borrowBook = (book: Book) => {
    if (borrowedBooks.length < 2) {
      setErrComp(<></>);
      setBorrowedBooks([...borrowedBooks, { ...book, copies: 1 }]);
      setLibrary(
        library
          .map((b) => (b.id === book.id ? { ...b, copies: b.copies - 1 } : b))
          .filter((b) => b.copies > 0)
      );
    } else {
      setErrComp(errorMessage());
    }
  };

  const returnBook = (book: Book) => {
    const returningBook = borrowedBooks.filter((b) => b.id == book.id);
    setBorrowedBooks(
      returningBook.length != 1
        ? [returningBook[0]]
        : borrowedBooks.filter((b) => b.id !== book.id)
    );
    setLibrary((prev) => {
      const found = prev.find((b) => b.id === book.id);
      return found
        ? prev.map((b) =>
            b.id === book.id ? { ...b, copies: b.copies + 1 } : b
          )
        : [...prev, { ...book, copies: 1 }];
    });
    if (borrowedBooks.length <= 2) {
      setErrComp(<></>);
    }
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Library System</h1>
      </header>
      <Library books={library} onBorrow={borrowBook} />
      <BorrowedBooks books={borrowedBooks} onReturn={returnBook} />
      {errComp}
    </div>
  );
};

export default App;
