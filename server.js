
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Community Library API is running!');
});

// GET BOOKS
app.get('/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// ADD BOOK
app.post('/books', (req, res) => {
    const { title, author, quantity } = req.body;

    db.query(
        'INSERT INTO books (title, author, quantity) VALUES (?, ?, ?)',
        [title, author, quantity],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Book added successfully!' });
        }
    );
});

// DELETE BOOK
app.delete('/books/:id', (req, res) => {
    db.query(
        'DELETE FROM books WHERE book_id = ?',
        [req.params.id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Book deleted successfully!' });
        }
    );
});

// GET MEMBERS
app.get('/members', (req, res) => {
    db.query('SELECT * FROM members', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// ADD MEMBER
app.post('/members', (req, res) => {
    const { name, email } = req.body;

    db.query(
        'INSERT INTO members (name, email) VALUES (?, ?)',
        [name, email],
        (err) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Member added successfully!' });
        }
    );
});

// GET TRANSACTIONS
app.get('/transactions', (req, res) => {
    db.query('SELECT * FROM transactions', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// ADD TRANSACTION
app.post('/transactions', (req, res) => {
    const { member_id, book_id, type } = req.body;

    db.query(
        'INSERT INTO transactions (member_id, book_id, type) VALUES (?, ?, ?)',
        [member_id, book_id, type],
        (err) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Transaction recorded successfully!' });
        }
    );
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
