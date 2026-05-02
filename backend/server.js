const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running! 🚀' });
});
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello Anthony!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
