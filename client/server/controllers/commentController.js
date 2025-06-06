const comments = require('../utils/mockComments');

const postComment = (req, res) => {
  const { matchId, name, text } = req.body;
  if (!matchId || !name || !text) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  if (!comments[matchId]) comments[matchId] = [];

  comments[matchId].push({
    name,
    text,
    timestamp: new Date().toISOString(),
  });

  res.status(200).json({ message: 'Comment added!' });
};

const getComments = (req, res) => {
  const matchId = req.params.matchId;
  res.json(comments[matchId] || []);
};

module.exports = { postComment, getComments };
