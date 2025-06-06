
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({ secret: 'admin_secret', resave: false, saveUninitialized: true }));

const dbFolder = path.join(__dirname, 'db');
if (!fs.existsSync(dbFolder)) { fs.mkdirSync(dbFolder); }
const db = new sqlite3.Database(path.join(dbFolder, 'database.db'));

app.get('/api/items', (req, res) => {
    db.all("SELECT rowid as id, name, total_count, current_count, expedited FROM inventory", (err, rows) => {
        if (err) { res.status(500).json({error: err.message}); return; }
        res.json(rows);
    });
});

app.listen(3000, () => console.log('Server běží na http://localhost:3000'));
