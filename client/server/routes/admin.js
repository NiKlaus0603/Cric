const express = require('express');
const router = express.Router();
const { addMatch, getAllMatches } = require('../controllers/adminController');
const verifyToken = require('../middleware/auth'); // 🧠 Place the middleware here

router.post('/matches', verifyToken, addMatch);  // 🔐 Protected
router.get('/matches', verifyToken, getAllMatches); // Optional: Protect read too

module.exports = router;
