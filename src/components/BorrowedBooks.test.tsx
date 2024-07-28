import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BorrowedBooks from "./BorrowedBooks";
import { Book } from "../types";

describe("BorrowedBooks Component", () => {
  const books: Book[] = [
    { id: 1, title: "Book One", copies: 1 },
    { id: 2, title: "Book Two", copies: 1 },
  ];

  test("renders borrowed books", () => {
    render(<BorrowedBooks books={books} onReturn={jest.fn()} />);
    expect(screen.getByText("Book One - Copies: 1")).toBeInTheDocument();
    expect(screen.getByText("Book Two - Copies: 1")).toBeInTheDocument();
  });

  test("shows no borrowed books message", () => {
    render(<BorrowedBooks books={[]} onReturn={jest.fn()} />);
    expect(
      screen.getByText("You have not borrowed any books.")
    ).toBeInTheDocument();
  });

  test("calls onReturn when return button is clicked", () => {
    const mockOnReturn = jest.fn();
    render(<BorrowedBooks books={books} onReturn={mockOnReturn} />);

    const returnButtons = screen.getAllByText("Return");
    fireEvent.click(returnButtons[0]);

    expect(mockOnReturn).toHaveBeenCalledWith(books[0]);
  });
});
