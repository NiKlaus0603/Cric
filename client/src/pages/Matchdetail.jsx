import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MatchDetail = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [activeTeam, setActiveTeam] = useState('home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await fetch(`http://localhost:9091/api/live-matches`);
        const data = await res.json();
        const found = data.find(m => m.match_id === id);
        if (!found) throw new Error('Match not found');
        setMatch(found);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading match...</div>;
  if (error) return <div className="p-6 text-red-600 text-center">Error: {error}</div>;

  const homeTeam = match.teams.home;
  const awayTeam = match.teams.away;

  const isHome = activeTeam === 'home';
  const battingTeam = isHome ? homeTeam : awayTeam;
  const bowlingTeam = isHome ? awayTeam : homeTeam;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {homeTeam} vs {awayTeam}
      </h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTeam('home')}
          className={`px-4 py-2 rounded ${
            isHome ? 'bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-700'
          }`}
        >
          {homeTeam}
        </button>
        <button
          onClick={() => setActiveTeam('away')}
          className={`px-4 py-2 rounded ${
            !isHome ? 'bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-700'
          }`}
        >
          {awayTeam}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Batting – {battingTeam}</h3>
          <ul className="text-sm">
            <li>Opener 1 – 56 (34)</li>
            <li>Opener 2 – 43 (38)</li>
            <li>Middle Order – 25 (15)</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Bowling – {bowlingTeam}</h3>
          <ul className="text-sm">
            <li>Bowler A – 2/24 (4)</li>
            <li>Bowler B – 1/32 (4)</li>
            <li>Bowler C – 0/28 (3)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
