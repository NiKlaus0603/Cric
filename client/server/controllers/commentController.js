const Comment = require('../models/Comment');

const postComment = async (req, res) => {
  const { matchId, name, text } = req.body;
  if (!matchId || !name || !text) return res.status(400).json({ error: 'Missing fields' });

  const comment = await Comment.create({ matchId, name, text });
  res.status(201).json(comment);
};

const getComments = async (req, res) => {
  const matchId = req.params.matchId;
  const comments = await Comment.find({ matchId }).sort({ timestamp: -1 });
  res.json(comments);
};

module.exports = { postComment, getComments };
