const liveMatches = require('../utils/dummyLiveMatches');

const getLiveMatches = (req, res) => {
  res.status(200).json(liveMatches);
};

module.exports = { getLiveMatches };
