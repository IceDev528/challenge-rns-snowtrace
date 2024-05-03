const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
// Create a new SQLite database or connect to an existing one
const db = new sqlite3.Database('./gas_prices.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the database.');
  }
});

// Endpoint to fetch data from SQLite table
app.get('/gas-prices', (req, res) => {
  db.all('SELECT * FROM gas_prices', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
