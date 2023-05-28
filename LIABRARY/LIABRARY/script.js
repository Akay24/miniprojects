// Book class
class Book {
  constructor(title, author, bookId) {
    this.title = title;
    this.author = author;
    this.bookId = bookId;
    this.isIssued = false;
    this.issuedTo = null;
  }
}

// Library class
class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, bookId) {
    const book = new Book(title, author, bookId);
    this.books.push(book);
    this.displayBooks();
  }

  displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    if (this.books.length === 0) {
      bookList.textContent = 'No books in the library.';
    } else {
      const heading = document.createElement('h2');
      heading.textContent = 'Books in the library:';
      bookList.appendChild(heading);

      this.books.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'bookItem';

        const bookDetails = document.createElement('span');
        bookDetails.innerHTML = `Book ID: ${book.bookId}, Title: ${book.title}, Author: ${book.author}`;
        bookItem.appendChild(bookDetails);

        bookList.appendChild(bookItem);
      });
    }
  }

  issueBook(bookId, user) {
    const book = this.findBook(bookId);

    if (book) {
      if (book.isIssued) {
        console.log('This book is already issued.');
      } else {
        book.isIssued = true;
        book.issuedTo = user;
        console.log(`Book '${book.title}' issued to ${user}.`);
        this.displayBooks();
      }
    } else {
      console.log('Book not found.');
    }
  }

  submitBook(bookId) {
    const book = this.findBook(bookId);

    if (book) {
      if (book.isIssued) {
        book.isIssued = false;
        book.issuedTo = null;
        console.log(`Book '${book.title}' submitted.`);
        this.displayBooks();
      } else {
        console.log('This book is not issued.');
      }
    } else {
      console.log('Book not found.');
    }
  }

  findBook(bookId) {
    return this.books.find((book) => book.bookId === bookId);
  }
}

// Initialize library
const library = new Library();

// Event listeners
document.getElementById('addBookForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const titleInput = document.getElementById('titleInput');
  const authorInput = document.getElementById('authorInput');
  const bookIdInput = document.getElementById('bookIdInput');
  library.addBook(titleInput.value, authorInput.value, bookIdInput.value);
  titleInput.value = '';
  authorInput.value = '';
  bookIdInput.value = '';
});

document.getElementById('issueBookForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const issueBookIdInput = document.getElementById('issueBookIdInput');
  const userInput = document.getElementById('userInput');
  library.issueBook(issueBookIdInput.value, userInput.value);
  issueBookIdInput.value = '';
  userInput.value = '';
});

document.getElementById('submitBookForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const submitBookIdInput = document.getElementById('submitBookIdInput');
  library.submitBook(submitBookIdInput.value);
  submitBookIdInput.value = '';
});
// Search books
document.getElementById('searchButton').addEventListener('click', function(e) {
  e.preventDefault();
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredBooks = library.books.filter((book) => {
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();
    return title.includes(searchInput) || author.includes(searchInput);
  });
  displayFilteredBooks(filteredBooks);
});

function displayFilteredBooks(books) {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  if (books.length === 0) {
    bookList.textContent = 'No matching books found.';
  } else {
    const heading = document.createElement('h2');
    heading.textContent = 'Matching Books:';
    bookList.appendChild(heading);

    books.forEach((book) => {
      const bookItem = document.createElement('div');
      bookItem.className = 'bookItem';

      const bookDetails = document.createElement('span');
      bookDetails.innerHTML = `Book ID: ${book.bookId}, Title: ${book.title}, Author: ${book.author}`;
      bookItem.appendChild(bookDetails);

      bookList.appendChild(bookItem);
    });
  }
}
