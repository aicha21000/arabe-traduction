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
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Welcome to the Translation App Backend');
});

app.get('/secure-route', verifyToken, (req, res) => {
  const userId = req.user.userId;

  res.json({ message: 'Access granted to secure route', userId });
});

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  console.log(file);
  res.status(200).json({ message: 'File uploaded successfully' });
});
const translationRoutes = require('./routes/translationRoutes');

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
app.use('/translation', translationRoutes);
app.use('/client-space', clientSpaceRoutes);
app.use('/contact', contactRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
app.listen(port, () => {
  console.log(`Le serveur fonctionne sur le port ${port}`);
});