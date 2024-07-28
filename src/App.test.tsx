import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App Component", () => {
  test("renders Library System header", () => {
    render(<App />);
    expect(screen.getByText("Library System")).toBeInTheDocument();
  });

  test("renders initial library books", () => {
    render(<App />);
    expect(screen.getByText("Book One - Copies: 3")).toBeInTheDocument();
    expect(screen.getByText("Book Two - Copies: 1")).toBeInTheDocument();
    expect(screen.getByText("Book Three - Copies: 2")).toBeInTheDocument();
  });

  test("can borrow a book", () => {
    render(<App />);
    const borrowButton = screen.getAllByText("Borrow")[0];
    fireEvent.click(borrowButton);
    expect(screen.getByText("Borrowed Books")).toBeInTheDocument();
    expect(screen.getByText("Book One - Copies: 2")).toBeInTheDocument();
    expect(screen.getByText("Book One - Copies: 1")).toBeInTheDocument(); // In borrowed books section
  });

  test("cannot borrow more than 2 books", () => {
    render(<App />);
    const borrowButtons = screen.getAllByText("Borrow");
    fireEvent.click(borrowButtons[0]);
    fireEvent.click(borrowButtons[1]);
    fireEvent.click(borrowButtons[2]);
    expect(
      screen.getByText("You can only borrow up to 2 books at a time.")
    ).toBeInTheDocument();
  });

  test("can return a book", () => {
    render(<App />);
    const borrowButton = screen.getAllByText("Borrow")[0];
    fireEvent.click(borrowButton);
    const returnButton = screen.getByText("Return");
    fireEvent.click(returnButton);
    expect(screen.queryByText("Return")).not.toBeInTheDocument();
    expect(screen.getByText("Book One - Copies: 3")).toBeInTheDocument();
  });
});
