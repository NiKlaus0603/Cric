const liveMatches = [
  {
    match_id: "match123",
    format: "T20",
    league: "World Cup",
    status: "UPCOMING",
    teams: { home: "India", away: "Australia" },
    scores: { home: "178/4", away: "154/6" },
    overs: "17.2",
    win_predictor: { India: 68, Australia: 32 },
  },
  {
    match_id: "match456",
    format: "ODI",
    league: "Champions Trophy",
    status: "LIVE",
    teams: { home: "England", away: "Pakistan" },
    scores: { home: "212/3", away: "199/9" },
    overs: "19.4",
    win_predictor: { England: 72, Pakistan: 28 },
  },
  {
    match_id: "match789",
    format: "Test",
    league: "WTC Final",
    status: "RESULT",
    teams: { home: "South Africa", away: "New Zealand" },
    scores: { home: "435/8d", away: "328/10" },
    overs: "157.3",
    win_predictor: { "South Africa": 55, "New Zealand": 45 },
  }
];
module.exports = liveMatches;
