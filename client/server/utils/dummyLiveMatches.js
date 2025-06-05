const liveMatches = [
    {
      match_id: "match123",
      teams: { home: "India", away: "Australia" },
      scores: { home: "178/4", away: "154/6" },
      overs: "17.2",
      status: "LIVE",
      win_predictor: { India: 68, Australia: 32 },
    },
    {
      match_id: "match456",
      teams: { home: "England", away: "New Zealand" },
      scores: { home: "212/3", away: "195/9" },
      overs: "19.4",
      status: "LIVE",
      win_predictor: { "England": 72, "New Zealand": 28 },
    },
  ];
  
  module.exports = liveMatches;
  