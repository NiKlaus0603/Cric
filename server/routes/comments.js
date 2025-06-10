const express = require('express');
const router = express.Router();
const { postComment, getComments } = require('../controllers/commentController');

router.post('/', postComment);
router.get('/:matchId', getComments);

module.exports = router;
