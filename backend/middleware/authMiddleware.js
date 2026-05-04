const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    // ดึง Token จาก Header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied',
      });
    }

    // ตัด "Bearer " ออก เหลือแค่ Token
    const token = authHeader.split(' ')[1];

    // ตรวจสอบ Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // เก็บข้อมูล user ไว้ใน req
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token is not valid',
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied, admin only',
    });
  }
  next();
};

module.exports = { protect, adminOnly };
