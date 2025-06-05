import React from 'react';
import { motion } from 'framer-motion';

const PlayerCard = ({ player }) => {
  const { name, team, role, image, stats, popularity } = player;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-slate-800 backdrop-blur-md rounded-2xl shadow-xl p-4 transition-all"
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <img
          src={`/players/${image}`}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mr-4 border border-gray-300 dark:border-gray-600"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{role} – {team}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 text-center mb-3">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Runs</p>
          <p className="text-md font-bold text-gray-900 dark:text-white">{stats.runs}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Wickets</p>
          <p className="text-md font-bold text-gray-900 dark:text-white">{stats.wickets}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Matches</p>
          <p className="text-md font-bold text-gray-900 dark:text-white">{stats.matches}</p>
        </div>
      </div>

      {/* Form Chart */}
      <div className="mb-3">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Form (Last 5)</p>
        <div className="flex space-x-1">
          {stats.form.map((score, idx) => (
            <div
              key={idx}
              className="w-full h-2 rounded bg-green-500"
              style={{ height: `${score}px` }}
            />
          ))}
        </div>
      </div>

      {/* Popularity Bar */}
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Popularity</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-500"
            style={{ width: `${popularity}%` }}
          />
        </div>
        <p className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">{popularity}%</p>
      </div>
    </motion.div>
  );
};

export default PlayerCard;
