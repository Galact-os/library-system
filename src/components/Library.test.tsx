import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Library from "./Library";
import { Book } from "../types";

describe("Library Component", () => {
  const books: Book[] = [
    { id: 1, title: "Book One", copies: 3 },
    { id: 2, title: "Book Two", copies: 1 },
  ];

  test("renders library books", () => {
    render(<Library books={books} onBorrow={jest.fn()} />);
    expect(screen.getByText("Book One - Copies: 3")).toBeInTheDocument();
    expect(screen.getByText("Book Two - Copies: 1")).toBeInTheDocument();
  });

  test("shows empty library message", () => {
    render(<Library books={[]} onBorrow={jest.fn()} />);
    expect(screen.getByText("The library is empty.")).toBeInTheDocument();
  });
});
