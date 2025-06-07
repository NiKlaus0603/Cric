const jwt = require('jsonwebtoken');

const ADMIN_EMAIL = 'admin@sportshub.com';
const ADMIN_PASSWORD = 'sports123';

const login = (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, 'sports-secret', { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ error: 'Invalid email or password' });
};

module.exports = { login };
