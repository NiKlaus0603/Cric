const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

// ✅ Make sure all controller functions are imported here:
const {
  addMatch,
  getAllMatches,
  updateMatch,
  deleteMatch,
} = require('../controllers/adminController'); // <-- Check this file exists and includes `updateMatch`

// ✅ Define all routes
router.get('/matches', verifyToken, getAllMatches);
router.post('/matches', verifyToken, addMatch);
router.put('/matches/:id', verifyToken, updateMatch);
router.delete('/matches/:id', verifyToken, deleteMatch);

module.exports = router;
