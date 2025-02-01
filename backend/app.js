const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const paypal = require('paypal-rest-sdk');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'online_shopping'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
});

// PayPal Configuration
paypal.configure({
  mode: 'sandbox', // Use 'live' for production
  client_id: 'YOUR_CLIENT_ID',
  client_secret: 'YOUR_CLIENT_SECRET'
});

// Routes
app.use('/products', require('./routes/productRoutes'));
app.use('/users', require('./routes/userRoutes'));

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});