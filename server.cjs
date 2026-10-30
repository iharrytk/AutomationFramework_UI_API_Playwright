const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = []; // In-memory user list

// API: GET users
app.get('/users', (req, res) => {
  res.json(users);
});

// API: POST new user
app.post('/users', (req, res) => {
  const { name, job } = req.body;
  const id = users.length + 1;
  const newUser = { id, name, job };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Start server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
