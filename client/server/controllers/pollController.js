// In-memory poll data
let polls = {};

const vote = (req, res) => {
  const { matchId, team } = req.body;

  if (!polls[matchId]) {
    polls[matchId] = { votes: {}, total: 0 };
  }

  const matchPoll = polls[matchId];
  matchPoll.votes[team] = (matchPoll.votes[team] || 0) + 1;
  matchPoll.total += 1;

  res.status(200).json({ message: 'Vote recorded', results: matchPoll });
};

const getResults = (req, res) => {
  const matchId = req.params.matchId;
  const poll = polls[matchId];

  if (!poll) {
    return res.json({ votes: {}, total: 0 });
  }

  res.json(poll);
};

module.exports = { vote, getResults };
