const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const ADMIN = {
  email: 'admin@sportshub.com',
  password: bcrypt.hashSync('admin123', 10),
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN.email) {
    return res.status(401).json({ error: 'Invalid email' });
  }

  const isValid = bcrypt.compareSync(password, ADMIN.password);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = jwt.sign({ email }, 'sports-secret', { expiresIn: '1h' });
  res.json({ token });
};
module.exports = { login };
