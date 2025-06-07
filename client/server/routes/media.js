const express = require('express');
const router = express.Router();
const { postNews, postGallery } = require('../controllers/mediaController');
const verifyToken = require('../middleware/verifyToken');

router.post('/news', verifyToken, postNews);
router.post('/gallery', verifyToken, postGallery);

module.exports = router;
