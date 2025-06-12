import React, { useEffect, useState } from 'react';
import LiveMatchCard from '../components/MatchCard/LiveMatchCard';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [format] = useState('T20');
  const [status] = useState('LIVE');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch(`/api/live-db?format=${format}&status=${status}`);
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error('❌ Failed to fetch matches:', err);
      }
    };

    fetchMatches();
  }, [format, status]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Live {format} Matches</h1>
      {matches.length === 0 ? (
        <p>No live matches available.</p>
      ) : (
        matches.map(match => (
          <LiveMatchCard key={match.match_id} match={match} />
        ))
      )}
    </div>
  );
};

export default Matches;
