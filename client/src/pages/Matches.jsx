import React, { useEffect, useState } from 'react';
import LiveMatchCard from '../components/MatchCard/LiveMatchCard';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:9091/api/live-matches');
        if (!response.ok) throw new Error('Failed to fetch live matches');
        const data = await response.json();
        setMatches(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-gray-500 dark:text-gray-300">Loading live matches...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Live Matches</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {matches.map((match) => (
          <LiveMatchCard key={match.match_id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default Matches;
