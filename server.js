const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3306;

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin', 
    password: 'admin', 
    database: 'hospital_db'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});
// Question 1
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Question 2
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
  connection.query(query, (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

// Question 3
app.get('/patients', (req, res) => {
  const firstName = req.query.first_name; 
  if (!firstName) {
      return res.status(400).json({ error: 'first_name query parameter is required' });
  }

  const query = 'SELECT patient_id, first_name, last_name, date_of_birth, gender, language FROM patients WHERE first_name = ?';
  connection.query(query, [firstName], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

// Question 4
app.get('/providers', (req, res) => {
  const specialty = req.query.specialty; 
  if (!specialty) {
      return res.status(400).json({ error: 'specialty query parameter is required' });
  }

  const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
  connection.query(query, [specialty], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
