Library System - README

Overview

This README provides an explanation of the architectural decisions, thoughts, and assumptions made while developing the Library System using React and TypeScript.

Technology Stack

    •	React: For building the user interface.
    •	TypeScript: For static type checking and improved developer experience.
    •	CSS Modules: For scoped and modular styling.
    •	SCSS: For more advanced and maintainable CSS.

Component Architecture

The application consists of the following main components:

    1.	App: The root component that holds the main state and renders other components.
    2.	Library: Displays the list of books available in the library.
    3.	BorrowedBooks: Shows the list of books borrowed by the user.
    4.	BookItem: Represents a single book item, used in both the Library and BorrowedBooks components.

App Component

    •	Manages the main state of the application, including the library and borrowed books.
    •	Contains functions to handle borrowing and returning books.
    •	Renders the Library and BorrowedBooks components.

Library Component

    •	Receives the list of books and a function to handle borrowing books as props.
    •	Displays a message if the library is empty.
    •	Maps through the list of books and renders a BookItem for each book.

BorrowedBooks Component

    •	Receives the list of borrowed books and a function to handle returning books as props.
    •	Displays a message if no books are borrowed.
    •	Maps through the list of borrowed books and renders a BookItem for each book.

BookItem Component

    •	Receives a book object, an action function (borrow/return), and an action label as props.
    •	Displays the book title and the number of copies available.
    •	Renders a button that triggers the action function when clicked.

State Management

The state is managed using React’s useState hook. The main state variables are:

    •	library: An array of books available in the library.
    •	borrowedBooks: An array of books borrowed by the user.

Borrowing a Book

    •	Checks if the user has reached the borrowing limit (2 books).
    •	Adds the selected book to the borrowedBooks array.
    •	Decreases the number of copies of the selected book in the library.
    •	If the number of copies of a book in the library becomes zero, it is removed from the library array.

Returning a Book

    •	Removes the selected book from the borrowedBooks array.
    •	Increases the number of copies of the selected book in the library.
    •	If the book is not already in the library, it is added back with one copy.

Styling

CSS Modules and SCSS are used to style the components. This approach ensures that styles are scoped to their respective components, preventing style conflicts and making the styles easier to manage.

Key Styling Decisions

    •	CSS Modules: Scoped and modular styles to avoid global namespace pollution.
    •	SCSS: Allows for nested styles and more readable and maintainable CSS.

Assumptions

    •	Single User Context: The application assumes a single user context for borrowing and returning books.
    •	Borrowing Limit: A user can borrow up to 2 books at any point in time.
    •	Single Copy Borrowing: A user can borrow only one copy of a particular book at a time.
    •	Initial Library State: The initial state of the library is hardcoded for simplicity. In a real-world application, this would likely come from a backend API.

Future Improvements

    •	Backend Integration: Connect the application to a backend service to manage the library’s state and user data.
    •	User Authentication: Implement user authentication to support multiple users.
    •	Borrowing History: Add functionality to track the borrowing history of users.
    •	Enhanced UI/UX: Improve the user interface and user experience with more advanced styling and animations.
    •	Error Handling: Implement better error handling for edge cases and network failures.
