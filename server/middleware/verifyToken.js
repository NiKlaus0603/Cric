const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, 'sports-secret');
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;
