const pool = require('../config/db');

// GET /tours - ดูทัวร์ทั้งหมด
const getAllTours = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tours');
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /tours/:id - ดูทัวร์เดียว
const getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tours WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found',
      });
    }
    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /tours - สร้างทัวร์ใหม่
const createTour = async (req, res) => {
  try {
    const { title, description, type, price, max_seats } = req.body;
    const result = await pool.query(
      `INSERT INTO tours 
        (title, description, type, price, max_seats, available_seats) 
       VALUES ($1, $2, $3, $4, $5, $5) 
       RETURNING *`,
      [title, description, type, price, max_seats],
    );
    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getAllTours, getTourById, createTour };
