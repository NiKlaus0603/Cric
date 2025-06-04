import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LiveMatchCard = ({ match }) => {
  const navigate = useNavigate();
  const {
    match_id,
    teams,
    scores,
    overs,
    win_predictor
  } = match;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-slate-800 bg-opacity-80 dark:bg-opacity-70 backdrop-blur-lg p-4 rounded-2xl shadow-xl cursor-pointer transition-all"
      onClick={() => navigate(`/match/${match_id}`)}
    >
      {/* Team Names and Flags */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <img
            src={`/flags/${teams.home.toLowerCase()}.png`}
            alt={teams.home}
            className="w-6 h-6"
          />
          <span className="font-semibold text-gray-900 dark:text-white">
            {teams.home}
          </span>
        </div>
        <span className="text-red-600 font-bold text-sm animate-pulse">
          LIVE
        </span>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-900 dark:text-white">
            {teams.away}
          </span>
          <img
            src={`/flags/${teams.away.toLowerCase()}.png`}
            alt={teams.away}
            className="w-6 h-6"
          />
        </div>
      </div>

      {/* Score Section */}
      <div className="text-center font-bold text-lg text-gray-900 dark:text-white">
        {scores.home} vs {scores.away}
      </div>

      <div className="text-center text-sm text-gray-700 dark:text-gray-300 mt-1">
        Overs: {overs}
      </div>

      {/* Win Predictor Bar */}
      <div className="mt-4">
        <div className="text-xs text-gray-700 dark:text-gray-300 mb-1">
          Win Predictor
        </div>
        <div className="w-full h-4 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${win_predictor[teams.home]}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1 text-gray-700 dark:text-gray-300">
          <span>{teams.home} ({win_predictor[teams.home]}%)</span>
          <span>{teams.away} ({win_predictor[teams.away]}%)</span>
        </div>
      </div>

      {/* Poll Link */}
      <div className="mt-2 text-center">
        <span className="text-sm text-sky-600 dark:text-sky-400 hover:underline">
          Vote: Who Will Win?
        </span>
      </div>
    </motion.div>
  );
};

export default LiveMatchCard;
