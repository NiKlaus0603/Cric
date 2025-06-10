import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { galleryByMatch } from '../data/mockGallery';
import { mockNews } from '../data/mockNews';

const Home = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch('http://localhost:9091/api/live-matches');
        const data = await res.json();

        setLiveMatches(data.filter(m => m.status === 'LIVE').slice(0, 2));
        setUpcomingMatches(data.filter(m => m.status === 'UPCOMING').slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch matches:', err);
      }
    };

    fetchMatches();
  }, []);

  const isLoggedIn = !!localStorage.getItem('adminToken');

  return (
    <div className="p-6 space-y-10 max-w-6xl mx-auto">
      {/* 🔥 Live Matches */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🎮 Live Matches</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {liveMatches.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">No live matches right now.</p>
          ) : (
            liveMatches.map(match => (
              <Link
                to={`/match/${match.match_id}`}
                key={match.match_id}
                className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow hover:scale-[1.01] transition"
              >
                <div className="flex justify-between font-semibold text-gray-900 dark:text-white">
                  <span>{match.teams.home}</span>
                  <span>{match.overs} overs</span>
                  <span>{match.teams.away}</span>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <span>{match.scores.home}</span>
                  <span>{match.scores.away}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* 📅 Upcoming Fixtures */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">📅 Upcoming Fixtures</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {upcomingMatches.map(match => (
            <Link
              to={`/match/${match.match_id}`}
              key={match.match_id}
              className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow hover:scale-[1.01] transition"
            >
              <p className="font-semibold text-gray-800 dark:text-white">
                {match.teams.home} vs {match.teams.away}
              </p>
              <p className="text-sm text-gray-500">{match.format}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 🧠 Cricket IQ (Placeholder) */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🧠 Today’s Cricket IQ</h2>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">What’s the highest team total in T20 history?</p>
          <a href="iq">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Play Quiz</button>
          </a>
        </div>
      </section>
      {/* 🎮 Fantasy League */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🎮 Fantasy League</h2>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Pick your dream team of 5 players and test your cricket instincts!
          </p>
        <a href="/fantasy">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Start Building Your Team
          </button>
        </a>
        </div>
      </section>


      {/* 🖼️ Gallery Preview */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🖼️ Match Gallery</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {galleryByMatch.match123?.slice(0, 3).map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={img.caption}
              className="rounded-xl h-40 object-cover shadow"
            />
          ))}
        </div>
        <Link to="/media" className="text-sm text-blue-600 dark:text-blue-400 mt-2 inline-block">View More</Link>
      </section>

      {/* 📰 News Preview */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">📰 Latest News</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {mockNews.slice(0, 2).map((news, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
              <p className="font-semibold text-gray-800 dark:text-white">{news.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{news.summary}</p>
              <a
                href={news.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 text-sm mt-2 inline-block"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
        <Link to="/news" className="text-sm text-blue-600 dark:text-blue-400 mt-2 inline-block">Browse All News</Link>
      </section>

      {/* 🛠️ Admin Access (conditional) */}
      {isLoggedIn && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🔐 Admin Tools</h2>
          <Link
            to="/admin"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Admin Panel
          </Link>
        </section>
      )}
    </div>
  );
};

export default Home;
