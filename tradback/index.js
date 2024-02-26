// index.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./db'); // Import the database configuration
const Order = require('./models/Order'); // Import the Order model
const User = require('./models/User'); // Import the User model
const { verifyToken } = require('./middlewares/authMiddleware'); // Import the auth middleware

const app = express();
const port = process.env.PORT || 5000;
const MONGODB_URI = 'YOUR_MONGODB_URI_HERE'; // Replace with your MongoDB URI
const SECRET_KEY = 'YOUR_SECRET_KEY_HERE'; // Replace with a secret key for JWT

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbConnection = mongoose.connection;

dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
dbConnection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Translation App Backend');
});

app.post('/upload', upload.single('file'), (req, res) => {
  // Handle file upload logic here
  const file = req.file;
  console.log(file);
  // Send a success response or handle errors
  res.status(200).json({ message: 'File uploaded successfully' });
});

// Secure route using auth middleware
app.get('/secure-route', verifyToken, (req, res) => {
  // Only accessible with a valid token
  res.json({ message: 'Access granted to secure route' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
