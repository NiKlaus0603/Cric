import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RunRateChart from '../components/Insights/RunRateChart';
import WicketZone from '../components/Insights/WicketZone';
import BowlerLengthMap from '../components/Insights/BowlerLengthMap';
import { galleryByMatch } from '../data/mockGallery';
import ImageGallery from '../components/Media/ImageGallery';


const MatchDetail = () => {
  const { id } = useParams();

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTeam, setActiveTeam] = useState('home');

  const [insights, setInsights] = useState(null);
  const [insightLoading, setInsightLoading] = useState(true);

  const [prediction, setPrediction] = useState({ name: '', batsman: '', bowler: '' });
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState({ name: '', text: '' });
  const [commentLoading, setCommentLoading] = useState(false);

  const [pollResults, setPollResults] = useState(null);

  // Fetch match details
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

  // Fetch insights
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

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:9091/api/comments/${id}`);
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error("Failed to load comments", err);
      }
    };
    fetchComments();
  }, [id]);

  // Fetch poll results (for archive)
  useEffect(() => {
    const fetchPollResults = async () => {
      try {
        const res = await fetch(`http://localhost:9091/api/polls/${id}`);
        const data = await res.json();
        setPollResults(data);
      } catch (err) {
        console.error("Failed to load poll results", err);
      }
    };
    fetchPollResults();
  }, [id]);

  const handlePredictionSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:9091/api/predictions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchId: match.match_id,
          name: prediction.name,
          batsman: prediction.batsman,
          bowler: prediction.bowler,
        })
      });
      const data = await res.json();
      if (data.message) setPredictionSubmitted(true);
    } catch (err) {
      console.error('Prediction error:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.name || !commentInput.text) return;
    try {
      setCommentLoading(true);
      await fetch('http://localhost:9091/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchId: match.match_id,
          name: commentInput.name,
          text: commentInput.text,
        })
      });

      const res = await fetch(`http://localhost:9091/api/comments/${id}`);
      const updated = await res.json();
      setComments(updated);
      setCommentInput({ name: '', text: '' });
    } catch (err) {
      console.error('Failed to post comment:', err);
    } finally {
      setCommentLoading(false);
    }
  };

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

      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow mb-6">
        <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
          <span>{match.scores.home}</span>
          <span>Overs: {match.overs}</span>
          <span>{match.scores.away}</span>
        </div>
      </div>

      {/* Toggle Team */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTeam('home')}
          className={`px-4 py-2 rounded ${isHome ? 'bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}
        >
          {homeTeam}
        </button>
        <button
          onClick={() => setActiveTeam('away')}
          className={`px-4 py-2 rounded ${!isHome ? 'bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}
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

      {/* Prediction Form */}
      {match.status === 'UPCOMING' && !predictionSubmitted && (
        <form onSubmit={handlePredictionSubmit} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md mb-6">
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Your Prediction</h3>
          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={prediction.name}
              onChange={(e) => setPrediction({ ...prediction, name: e.target.value })}
              className="px-4 py-2 rounded-md border dark:bg-slate-900 dark:text-white"
              required
            />
            <select
              value={prediction.batsman}
              onChange={(e) => setPrediction({ ...prediction, batsman: e.target.value })}
              required
              className="px-4 py-2 rounded-md border dark:bg-slate-900 dark:text-white"
            >
              <option value="">Select Top Batsman</option>
              <option value="Rohit Sharma">Rohit Sharma</option>
              <option value="Virat Kohli">Virat Kohli</option>
              <option value="Steve Smith">Steve Smith</option>
            </select>
            <select
              value={prediction.bowler}
              onChange={(e) => setPrediction({ ...prediction, bowler: e.target.value })}
              required
              className="px-4 py-2 rounded-md border dark:bg-slate-900 dark:text-white"
            >
              <option value="">Select Top Bowler</option>
              <option value="Mitchell Starc">Mitchell Starc</option>
              <option value="Jasprit Bumrah">Jasprit Bumrah</option>
              <option value="Zampa">Zampa</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Submit Prediction
            </button>
          </div>
        </form>
      )}

      {predictionSubmitted && (
        <div className="text-center text-green-600 mb-6">
          ✅ Your prediction has been saved!
        </div>
      )}

      {/* Insights */}
      {insightLoading ? (
        <div className="text-center text-gray-500 mt-6">Loading match insights...</div>
      ) : insights ? (
        <>
          {Array.isArray(insights.runRate) && <RunRateChart data={insights.runRate} />}
          {Array.isArray(insights.wickets) && <WicketZone wickets={insights.wickets} />}
          {Array.isArray(insights.deliveries) && <BowlerLengthMap deliveries={insights.deliveries} />}
        </>
      ) : (
        <div className="text-center text-red-500 mt-6">No insights available for this match.</div>
      )}

      {/* Comment Section */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md mt-6">
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Match Reactions</h3>
        <form onSubmit={handleCommentSubmit} className="mb-4 space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            value={commentInput.name}
            onChange={(e) => setCommentInput({ ...commentInput, name: e.target.value })}
            className="w-full px-4 py-2 rounded border dark:bg-slate-900 dark:text-white"
            required
          />
          <textarea
            placeholder="What do you think?"
            value={commentInput.text}
            onChange={(e) => setCommentInput({ ...commentInput, text: e.target.value })}
            className="w-full px-4 py-2 rounded border dark:bg-slate-900 dark:text-white"
            rows={3}
            required
          />
          <button
            type="submit"
            disabled={commentLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {commentLoading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-sm text-gray-500">No comments yet. Be the first to react!</p>
          ) : (
            comments.map((c, i) => (
              <div key={i} className="border-t pt-2 text-sm">
                <span className="font-semibold text-gray-900 dark:text-white">{c.name}</span>
                <span className="text-gray-500 text-xs ml-2">{new Date(c.timestamp).toLocaleString()}</span>
                <p className="text-gray-700 dark:text-gray-300 mt-1">{c.text}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Poll Archive */}
      {match.status === "RESULT" && pollResults && (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md mt-6">
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">📊 Fan Poll Archive</h3>
          {pollResults.total === 0 ? (
            <p className="text-gray-500">No votes were submitted for this match.</p>
          ) : (
            <>
              {Object.keys(pollResults.votes).map((team) => {
                const percent = Math.round((pollResults.votes[team] / pollResults.total) * 100);
                return (
                  <div key={team} className="mb-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{team}: {percent}%</p>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
              <p className="text-xs text-gray-500 mt-2">Total Votes: {pollResults.total}</p>
            </>
          )}
        </div>
      )}
      {/* 🖼️ Image Gallery */}
      {galleryByMatch[id] && <ImageGallery images={galleryByMatch[id]} />}
    </div>
  );
};

export default MatchDetail;
