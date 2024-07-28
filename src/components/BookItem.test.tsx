import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookItem from "./BookItem";
import { Book } from "../types";

describe("BookItem Component", () => {
  const book: Book = { id: 1, title: "Book One", copies: 3 };

  test("renders book item", () => {
    render(<BookItem book={book} onAction={jest.fn()} actionLabel="Borrow" />);
    expect(screen.getByText("Book One - Copies: 3")).toBeInTheDocument();
  });

  test("triggers action on button click", () => {
    const mockAction = jest.fn();
    render(<BookItem book={book} onAction={mockAction} actionLabel="Borrow" />);
    fireEvent.click(screen.getByText("Borrow"));
    expect(mockAction).toHaveBeenCalledWith(book);
  });
});
