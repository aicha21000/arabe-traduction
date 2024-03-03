// index.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/Database');
const { verifyToken } = require('./middlewares/authMiddleware');
const cors = require('cors');
const dotenv = require('dotenv');
const clientSpaceRoutes = require('./routes/clientSpaceRoutes');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
});


connectDB();

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Welcome to the Translation App Backend');
});

// Secure route using auth middleware
app.get('/secure-route', verifyToken, (req, res) => {
  // Accessible uniquement avec un token valide
  const userId = req.user.userId;

  // Vous pouvez maintenant utiliser l'userId comme nécessaire dans votre logique
  res.json({ message: 'Access granted to secure route', userId });
});

app.post('/upload', upload.single('file'), (req, res) => {
  // Handle file upload logic here
  const file = req.file;
  console.log(file);
  // Send a success response or handle errors
  res.status(200).json({ message: 'File uploaded successfully' });
});
const translationRoutes = require('./routes/translationRoutes');

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
app.use('/translation', translationRoutes);
app.use('/client-space', clientSpaceRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
// Start the server
app.listen(port, () => {
  console.log(`Le serveur fonctionne sur le port ${port}`);
});