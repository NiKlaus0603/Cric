const Poll = require('../models/Poll');

const votePoll = async (req, res) => {
  const { matchId, team } = req.body;
  if (!matchId || !team) {
    return res.status(400).json({ error: 'matchId and team are required' });
  }

  let poll = await Poll.findOne({ matchId });

  if (!poll) {
    poll = new Poll({ matchId, votes: new Map(), total: 0 });
  }

  const currentVotes = poll.votes.get(team) || 0;
  poll.votes.set(team, currentVotes + 1);
  poll.total += 1;

  await poll.save();

  res.json({ message: 'Vote counted!', poll });
};

const getPollResults = async (req, res) => {
  const { matchId } = req.params;
  const poll = await Poll.findOne({ matchId });
  res.json(poll || { votes: {}, total: 0 });
};

module.exports = { votePoll, getPollResults };
