import React from 'react';

const LiveMatchCard = ({ match }) => {
  const { name, score, teams_meta, format, status, note } = match;

  return (
    <div className="border p-4 rounded shadow mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={teams_meta.local?.image_path} alt="local" className="w-6 h-6" />
          <span>{teams_meta.local?.name}</span>
          <span className="text-gray-500">vs</span>
          <span>{teams_meta.visitor?.name}</span>
          <img src={teams_meta.visitor?.image_path} alt="visitor" className="w-6 h-6" />
        </div>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
          {status}
        </span>
      </div>

      <div className="mt-2 text-sm">
        <strong>Score:</strong>{' '}
        {score ? `${score.r}/${score.w} in ${score.o} overs` : 'Not available'}
      </div>
      <div className="text-xs text-gray-600 mt-1">{note}</div>
      <div className="text-xs text-blue-600 mt-1">Format: {format}</div>
    </div>
  );
};

export default LiveMatchCard;
