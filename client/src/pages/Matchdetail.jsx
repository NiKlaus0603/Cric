import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RunRateChart from '../components/Insights/RunRateChart';
import WicketZone from '../components/Insights/WicketZone';
import BowlerLengthMap from '../components/Insights/BowlerLengthMap';

const MatchDetail = () => {
  const { id } = useParams();

  // Match info
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTeam, setActiveTeam] = useState('home');

  // Match insights
  const [insights, setInsights] = useState(null);
  const [insightLoading, setInsightLoading] = useState(true);

  // Fetch match info
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

  // Fetch match insights
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch(`http://localhost:9091/api/insights/${id}`);
        const data = await res.json();
        setInsights(data);
      } catch (err) {
        console.error('Failed to load insights:', err);
      } finally {
        setInsightLoading(false);
      }
    };

    fetchInsights();
  }, [id]);

  // Loading/Error UI
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

      {/* Score Summary */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow mb-6">
        <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
          <span>{match.scores.home}</span>
          <span>Overs: {match.overs}</span>
          <span>{match.scores.away}</span>
        </div>
      </div>

      {/* Team Switch */}
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

      {/* Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Batting – {battingTeam}
          </h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300">
            <li>Player A – 56 (34)</li>
            <li>Player B – 43 (38)</li>
            <li>Player C – 25 (15)</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Bowling – {bowlingTeam}
          </h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300">
            <li>Bowler A – 2/24 (4)</li>
            <li>Bowler B – 1/32 (4)</li>
            <li>Bowler C – 0/28 (3)</li>
          </ul>
        </div>
      </div>

      {/* Match Insights */}
      {insightLoading ? (
        <div className="text-center text-gray-500 mt-6">Loading match insights...</div>
      ) : insights ? (
        <>
          <RunRateChart data={insights.runRate} />
          <WicketZone wickets={insights.wickets} />
          <BowlerLengthMap deliveries={insights.deliveries} />
        </>
      ) : (
        <div className="text-center text-red-500 mt-6">No insights available for this match.</div>
      )}
    </div>
  );
};

export default MatchDetail;
