const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const pool = require('./config/db');
const tourRoutes = require('./routes/tourRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());

// Routes
app.use('/tours', tourRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Tour Management API is running! 🚀' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
