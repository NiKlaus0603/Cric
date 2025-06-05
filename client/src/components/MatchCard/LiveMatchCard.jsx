import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LiveMatchCard = ({ match }) => {
  const navigate = useNavigate();
  const { match_id, teams, scores, overs, win_predictor } = match;

  const [pollResults, setPollResults] = useState({ votes: {}, total: 0 });
  const [hasVoted, setHasVoted] = useState(() => {
    return localStorage.getItem(`voted_${match_id}`) !== null;
  });

  useEffect(() => {
    fetch(`http://localhost:9091/api/polls/${match_id}`)
      .then(res => res.json())
      .then(data => setPollResults(data));
  }, [match_id]);

  const handleVote = async (team) => {
    if (hasVoted) return;

    const res = await fetch('http://localhost:9091/api/polls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matchId: match_id, team })
    });

    const data = await res.json();
    setPollResults(data.results);
    setHasVoted(true);
    localStorage.setItem(`voted_${match_id}`, team);
  };

  const getPercentage = (team) => {
    const count = pollResults.votes[team] || 0;
    return pollResults.total === 0
      ? 0
      : Math.round((count / pollResults.total) * 100);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-slate-800 bg-opacity-80 dark:bg-opacity-70 backdrop-blur-lg p-4 rounded-2xl shadow-xl transition-all"
      onClick={() => navigate(`/match/${match_id}`)}
    >
      {/* Match Info */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <img src={`/flags/${teams.home.toLowerCase().replace(/\s+/g, '_')}.png`} alt={teams.home} className="w-6 h-6" />
          <span className="font-semibold text-gray-900 dark:text-white">{teams.home}</span>
        </div>
        <span className="text-red-600 font-bold text-sm animate-pulse">LIVE</span>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-900 dark:text-white">{teams.away}</span>
          <img src={`/flags/${teams.away.toLowerCase().replace(/\s+/g, '_')}.png`} alt={teams.away} className="w-6 h-6" />
        </div>
      </div>

      <div className="text-center font-bold text-lg text-gray-900 dark:text-white">
        {scores.home} vs {scores.away}
      </div>
      <div className="text-center text-sm text-gray-700 dark:text-gray-300 mb-3">
        Overs: {overs}
      </div>

      {/* Poll Section */}
      <div>
        <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">Who will win?</div>
        {hasVoted ? (
          <>
            <div className="text-xs mb-1">{teams.home}: {getPercentage(teams.home)}%</div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-full mb-2 overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: `${getPercentage(teams.home)}%` }} />
            </div>

            <div className="text-xs mb-1">{teams.away}: {getPercentage(teams.away)}%</div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${getPercentage(teams.away)}%` }} />
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleVote(teams.home);
              }}
              className="bg-blue-600 text-white px-3 py-1 text-xs rounded"
            >
              {teams.home}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleVote(teams.away);
              }}
              className="bg-green-600 text-white px-3 py-1 text-xs rounded"
            >
              {teams.away}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LiveMatchCard;
