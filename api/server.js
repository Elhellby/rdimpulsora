const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar CORS
const app = express();
const PORT = 3001;

const dbFilePath = path.join(__dirname, 'db.json');

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Aplicar CORS

// Helper function to read and write the JSON file
const readDB = () => JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
const writeDB = (data) => fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));

// Get all expenses
app.get('/api/expenses', (req, res) => {
  const data = readDB();
  res.json(data);
});

// Get a single expense by ID
app.get('/api/expenses/:id', (req, res) => {
  const data = readDB();
  const expense = data.find((item) => item.id === parseInt(req.params.id));
  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }
  res.json(expense);
});

// Add a new expense
app.post('/api/expenses', (req, res) => {
  const data = readDB();
  const newExpense = {
    id: data.length ? data[data.length - 1].id + 1 : 1,
    ...req.body,
  };
  data.push(newExpense);
  writeDB(data);
  res.status(201).json(newExpense);
});

// Update an expense by ID
app.put('/api/expenses/:id', (req, res) => {
  const data = readDB();
  const index = data.findIndex((item) => item.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Expense not found' });
  }
  data[index] = { ...data[index], ...req.body };
  writeDB(data);
  res.json(data[index]);
});

// Delete an expense by ID
app.delete('/api/expenses/:id', (req, res) => {
  const data = readDB();
  const filteredData = data.filter((item) => item.id !== parseInt(req.params.id));
  if (data.length === filteredData.length) {
    return res.status(404).json({ error: 'Expense not found' });
  }
  writeDB(filteredData);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});