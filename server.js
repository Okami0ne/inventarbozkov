
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({ secret: 'admin_secret', resave: false, saveUninitialized: true }));

const db = new sqlite3.Database('./db/database.db');

app.get('/api/items', (req, res) => {
    db.all("SELECT * FROM inventory", (err, rows) => res.json(rows));
});

app.listen(3000, () => {
    console.log('Server běží na http://localhost:3000');
});
