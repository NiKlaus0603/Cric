import React from 'react';
import { motion } from 'framer-motion';

const TeamCard = ({ team }) => {
  const { name, logo, captain, nrr, form } = team;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-slate-800 backdrop-blur-md rounded-2xl shadow-xl p-4 transition-all"
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <img
          src={`/teams/${logo}`}
          alt={name}
          className="w-14 h-14 rounded-full object-cover mr-4 border border-gray-300 dark:border-gray-600"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Captain: {captain}</p>
        </div>
      </div>

      {/* NRR */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">Net Run Rate</p>
        <p className={`text-xl font-bold ${nrr >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {nrr >= 0 ? '+' : ''}{nrr.toFixed(2)}
        </p>
      </div>

      {/* Form */}
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Recent Form</p>
        <div className="flex space-x-1">
          {form.map((result, i) => (
            <span
              key={i}
              className={`text-xs font-bold px-2 py-1 rounded-full ${
                result === 'W'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {result}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
