
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './styles.css';

const API = 'http://localhost:5000';

// SIDEBAR
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>Community Library</h2>
        <p>Library Management System</p>
      </div>

      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/books">Book Management</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/users">User Management</Link>
      </nav>

      <div className="sidebar-footer">
        <p>Community Library © 2026</p>
      </div>
    </aside>
  );
}

// DASHBOARD
function Dashboard() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${API}/books`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.log(err));

    fetch(`${API}/members`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  const totalCopies = books.reduce(
    (total, book) => total + Number(book.quantity), 0
  );

  const lowStock = books.filter(
    book => Number(book.quantity) < 2
  ).length;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome to your Community Library</p>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>Total Books</h3>
          <h2>{books.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Available Copies</h3>
          <h2>{totalCopies}</h2>
        </div>

        <div className="stat-card">
          <h3>Registered Users</h3>
          <h2>{users.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Low Stock Books</h3>
          <h2>{lowStock}</h2>
        </div>
      </div>

      <div className="table-container">
        <h2>Book Availability</h2>

        <table>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Author</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {books.map(book => (
              <tr key={book.book_id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.quantity}</td>
                <td>
                  {Number(book.quantity) < 2 ? (
                    <span className="low-stock">Low Stock</span>
                  ) : (
                    <span className="available">Available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// BOOK MANAGEMENT
function Books() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  function loadBooks() {
    fetch(`${API}/books`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(() => setMessage('Could not load books.'));
  }

  useEffect(() => {
    loadBooks();
  }, []);

  async function addBook(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          author,
          quantity: Number(quantity)
        })
      });

      if (!response.ok) throw new Error();

      setMessage('Book added successfully!');
      setTitle('');
      setAuthor('');
      setQuantity('');
      loadBooks();
    } catch {
      setMessage('Could not add book. Check your database.');
    }
  }

  async function deleteBook(id) {
    try {
      const response = await fetch(`${API}/books/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error();

      setMessage('Book deleted successfully!');
      loadBooks();
    } catch {
      setMessage('Could not delete book.');
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Book Management</h1>
        <p>Add, view and manage library books.</p>
      </div>

      <div className="table-container">
        <h2>Add a New Book</h2>

        <form className="book-form" onSubmit={addBook}>
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            min="0"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            required
          />

          <button type="submit">Add Book</button>
        </form>

        <p>{message}</p>
      </div>

      <div className="table-container">
        <h2>Library Books</h2>

        <table>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Author</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map(book => (
              <tr key={book.book_id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.quantity}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteBook(book.book_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// TRANSACTIONS
function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookId, setBookId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [type, setType] = useState('Borrow');
  const [message, setMessage] = useState('');

  function loadData() {
    fetch(`${API}/transactions`)
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(() => setMessage('Could not load transactions.'));

    fetch(`${API}/books`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.log(err));

    fetch(`${API}/members`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addTransaction(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          book_id: Number(bookId),
          member_id: Number(memberId),
          type
        })
      });

      if (!response.ok) throw new Error();

      setMessage('Transaction recorded successfully!');
      setBookId('');
      setMemberId('');
      setType('Borrow');
      loadData();
    } catch {
      setMessage('Could not record transaction.');
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Transactions</h1>
        <p>Record borrowed and returned books.</p>
      </div>

      <div className="table-container">
        <h2>Record a Transaction</h2>

        <form className="book-form" onSubmit={addTransaction}>
          <select
            value={bookId}
            onChange={e => setBookId(e.target.value)}
            required
          >
            <option value="">Select Book</option>
            {books.map(book => (
              <option key={book.book_id} value={book.book_id}>
                {book.title}
              </option>
            ))}
          </select>

          <select
            value={memberId}
            onChange={e => setMemberId(e.target.value)}
            required
          >
            <option value="">Select Member</option>
            {users.map(user => (
              <option key={user.member_id} value={user.member_id}>
                {user.name}
              </option>
            ))}
          </select>

          <select
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option value="Borrow">Borrow</option>
            <option value="Return">Return</option>
          </select>

          <button type="submit">Save Transaction</button>
        </form>

        <p>{message}</p>
      </div>

      <div className="table-container">
        <h2>Transaction History</h2>

        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Book ID</th>
              <th>Member ID</th>
              <th>Transaction Type</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.transaction_id}>
                <td>{transaction.transaction_id}</td>
                <td>{transaction.book_id}</td>
                <td>{transaction.member_id}</td>
                <td>{transaction.type}</td>
                <td>{new Date(transaction.transaction_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// USER MANAGEMENT
function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function loadUsers() {
    fetch(`${API}/members`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setMessage('Could not load members.'));
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function addUser(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      if (!response.ok) throw new Error();

      setMessage('Member registered successfully!');
      setName('');
      setEmail('');
      loadUsers();
    } catch {
      setMessage('Could not register member.');
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>User Management</h1>
        <p>Register and manage library members.</p>
      </div>

      <div className="table-container">
        <h2>Register a Member</h2>

        <form className="book-form" onSubmit={addUser}>
          <input
            type="text"
            placeholder="Member Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <button type="submit">Register Member</button>
        </form>

        <p>{message}</p>
      </div>

      <div className="table-container">
        <h2>Registered Members</h2>

        <table>
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Email Address</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user.member_id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// MAIN APPLICATION
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
