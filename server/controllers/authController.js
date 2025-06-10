const jwt = require('jsonwebtoken');
require('dotenv').config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@sportshub.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sports123';
const JWT_SECRET = process.env.JWT_SECRET || 'sports-secret';

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin', email }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ error: 'Invalid email or password' });
};

module.exports = { login };
