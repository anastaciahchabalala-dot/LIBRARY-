
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'community_library'
});

db.connect((err) => {
    if (err) {
        console.log('Database error:', err);
    } else {
        console.log('MySQL connected successfully!');
    }
});

module.exports = db;
