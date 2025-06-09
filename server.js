
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const dbFolder = path.join(__dirname, 'db');
if (!fs.existsSync(dbFolder)) { fs.mkdirSync(dbFolder); }
const db = new sqlite3.Database(path.join(dbFolder, 'database.db'));

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        total_count INTEGER,
        current_count INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS expeditions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_id INTEGER,
        project_name TEXT,
        count INTEGER,
        FOREIGN KEY (item_id) REFERENCES items(id)
    )`);
});

app.get('/api/items', (req, res) => {
    db.all("SELECT * FROM items", (err, rows) => {
        if (err) { res.status(500).json({error: err.message}); return; }
        res.json(rows);
    });
});

app.get('/api/projects', (req, res) => {
    db.all("SELECT DISTINCT project_name FROM expeditions", (err, rows) => {
        if (err) { res.status(500).json({error: err.message}); return; }
        res.json(rows);
    });
});

app.get('/api/expeditions/:project_name', (req, res) => {
    db.all(`SELECT expeditions.id, expeditions.count, items.name 
            FROM expeditions 
            JOIN items ON expeditions.item_id = items.id
            WHERE project_name = ?`, [req.params.project_name], (err, rows) => {
        if (err) { res.status(500).json({error: err.message}); return; }
        res.json(rows);
    });
});

app.listen(3000, () => console.log('Server běží na http://localhost:3000'));
