const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const { postNews, addGalleryImage } = require('../controllers/mediaController');

// TEMP debug test
console.log('📦 Loaded mediaController:', { postNews: typeof postNews, addGalleryImage: typeof addGalleryImage });

router.post('/news', verifyToken, postNews);
router.post('/gallery', verifyToken, addGalleryImage);

module.exports = router;
