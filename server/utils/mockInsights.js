const insights = {
    match123: {
      runRate: [
        { over: 1, runRate: 5 },
        { over: 2, runRate: 6 },
        { over: 3, runRate: 7.5 },
        { over: 4, runRate: 8.2 },
        { over: 5, runRate: 6.8 },
        { over: 6, runRate: 7.4 },
        { over: 7, runRate: 6.1 },
        { over: 8, runRate: 9.0 },
        { over: 9, runRate: 7.6 },
        { over: 10, runRate: 8.3 },
      ],
      wickets: [
        { x: 48, y: 20, player: 'Rohit Sharma', type: 'Caught' },
        { x: 52, y: 35, player: 'Gill', type: 'Bowled' },
        { x: 60, y: 50, player: 'Kohli', type: 'LBW' },
      ],
      deliveries: [
        { x: 40, y: 30, bowler: 'Starc', length: 'Short' },
        { x: 50, y: 45, bowler: 'Starc', length: 'Good' },
        { x: 60, y: 60, bowler: 'Cummins', length: 'Full' },
      ]
    }
  };
  
  module.exports = insights;
  