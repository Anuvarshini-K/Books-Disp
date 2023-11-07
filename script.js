// DOM Elements
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const bookList = document.getElementById('book-list');

// Google Books API Endpoint
const apiUrl = 'https://www.googleapis.com/books/v1/volumes';

// Check if the user is already logged in
const user = localStorage.getItem('user');
if (user) {
    showLoggedInState();
} else {
    showLoginForm();
}

// Login Button Click
loginButton.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Perform authentication (you may use a backend service or mock it here)
    if (username === 'book' && password === '1234') {
        localStorage.setItem('user', username);
        showLoggedInState();
        fetchBooks('programming'); // Example search term
    } else {
        alert('Invalid credentials. Try again.');
    }
});

// Logout Button Click
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    showLoginForm();
    clearBookList();
});

// Function to fetch books from Google Books API
function fetchBooks(searchTerm) {
    const url = `${apiUrl}?q=${searchTerm}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.items) {
                displayBooks(data.items);
            } else {
                alert('No books found for the given search term.');
            }
        })
        .catch((error) => {
            console.error('Error fetching books:', error);
            alert('An error occurred while fetching books. Please try again.');
        });
}

// Function to display book data
function displayBooks(books) {
    bookList.innerHTML = books.map((book) => {
        const volumeInfo = book.volumeInfo;
        return `<div class="book-card">
                    <h2>${volumeInfo.title}</h2>
                    <p>Author: ${volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown'}</p>
                    <img src="${volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'no-image.png'}" alt="${volumeInfo.title} cover">
                </div>`;
    }).join('');
}

// Function to clear the book list
function clearBookList() {
    bookList.innerHTML = '';
}

// Function to show the login form
function showLoginForm() {
    loginForm.style.display = 'block';
    loginButton.disabled = false;
    logoutButton.style.display = 'none';
    clearBookList();
}

// Function to show the logged-in state
function showLoggedInState() {
    loginForm.style.display = 'none';
    loginButton.disabled = true;
    logoutButton.style.display = 'block';
}
