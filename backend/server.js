const express = require('express');
const dotenv = require('dotenv');
const pool = require('./config/db');
const tourRoutes = require('./routes/tourRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/tours', tourRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Tour Management API is running! 🚀' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
