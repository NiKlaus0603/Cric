import React from 'react';
import LiveMatchCard from '../components/MatchCard/LiveMatchCard';
import mockLiveMatches from '../data/mockLiveMatches';

function Matches() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Live Matches</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockLiveMatches.map((match) => (
          <LiveMatchCard key={match.match_id} match={match} />
        ))}
      </div>
    </div>
  );
}

export default Matches;
