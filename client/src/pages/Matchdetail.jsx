import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MatchDetail = () => { // Added `const` to declare the function
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await fetch(`/api/live-db/${id}`);
        const data = await res.json();
        setMatch(data);
      } catch (err) {
        console.error('❌ Failed to load match:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!match) return <div className="p-6 text-red-600">Match not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-xl shadow space-y-4">
      <h1 className="text-2xl font-bold">{match.name}</h1>

      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
        <span>{match.format}</span>
        <span>Status: {match.status}</span>
        <span className="text-xs italic">Source: {match.source}</span>
      </div>

      {match.teams_meta && (
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <img src={match.teams_meta.local?.image_path} alt="local" className="w-8 h-8" />
            <span>{match.teams_meta.local?.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{match.teams_meta.visitor?.name}</span>
            <img src={match.teams_meta.visitor?.image_path} alt="visitor" className="w-8 h-8" />
          </div>
        </div>
      )}

      <div>
        <strong>Score:</strong>{' '}
        {match.score ? `${match.score.r}/${match.score.w} in ${match.score.o} overs` : 'N/A'}
      </div>

      {match.note && (
        <div className="text-sm text-gray-500 italic">
          {match.note}
        </div>
      )}
    </div>
  );
};

export default MatchDetail;