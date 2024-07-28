import React, { useState } from "react";
import Library from "./components/Library";
import BorrowedBooks from "./components/BorrowedBooks";
import { Book } from "./types";
import styles from "./App.module.scss";

const App: React.FC = () => {
  const maxAllowedBooks = 2;
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
    if (borrowedBooks.length < maxAllowedBooks) {
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
    setBorrowedBooks((prev) => {
      const sameIdBook = prev.filter((a) => a.id === book.id);
      const diffIdBooks = prev.filter((a) => a.id != book.id);

      const returnArr = [
        ...(sameIdBook.length == 1 ? [] : sameIdBook.slice(1)),
        ...diffIdBooks,
      ];
      return returnArr;
    });

    setLibrary((prev) => {
      const found = prev.find((b) => b.id === book.id);
      return (
        found
          ? prev.map((b) =>
              b.id === book.id ? { ...b, copies: b.copies + 1 } : b
            )
          : [...prev, { ...book, copies: 1 }]
      ).sort((a, b) => a.id - b.id);
    });
    if (borrowedBooks.length <= maxAllowedBooks) {
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
