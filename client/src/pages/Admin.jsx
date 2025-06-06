import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  const [match, setMatch] = useState({
    match_id: '',
    format: 'T20',
    status: 'UPCOMING',
    teams: { home: '', away: '' },
    scores: { home: '', away: '' },
    overs: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:9091/api/admin/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(match)
      });

      const data = await res.json();
      if (data.message) {
        alert("✅ Match saved!");
        console.log(data.match);
        setMatch({
          match_id: '',
          format: 'T20',
          status: 'UPCOMING',
          teams: { home: '', away: '' },
          scores: { home: '', away: '' },
          overs: '',
        });
      } else {
        alert("❌ Failed to save match.");
      }
    } catch (err) {
      console.error("Error saving match", err);
      alert("❌ Server error while saving match.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">🛠 Admin Panel</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <input
          type="text"
          placeholder="Match ID"
          value={match.match_id}
          onChange={(e) => setMatch({ ...match, match_id: e.target.value })}
          required
          className="border rounded p-2 dark:bg-slate-900 dark:text-white"
        />

        <select
          value={match.format}
          onChange={(e) => setMatch({ ...match, format: e.target.value })}
          className="border rounded p-2 dark:bg-slate-900 dark:text-white"
        >
          <option value="T20">T20</option>
          <option value="ODI">ODI</option>
          <option value="TEST">TEST</option>
        </select>

        <select
          value={match.status}
          onChange={(e) => setMatch({ ...match, status: e.target.value })}
          className="border rounded p-2 dark:bg-slate-900 dark:text-white"
        >
          <option value="UPCOMING">UPCOMING</option>
          <option value="LIVE">LIVE</option>
          <option value="RESULT">RESULT</option>
        </select>

        <input
          type="text"
          placeholder="Home Team"
          value={match.teams.home}
          onChange={(e) =>
            setMatch({ ...match, teams: { ...match.teams, home: e.target.value } })}
          className="border rounded p-2 dark:bg-slate-900 dark:text-white"
        />

        <input
          type="text"
          placeholder="Away Team"
          value={match.teams.away}
          onChange={(e) =>
            setMatch({ ...match, teams: { ...match.teams, away: e.target.value } })}
          className="border rounded p-2 dark:bg-slate-900 dark:text-white"
        />

        <input
          type="text"
          placeholder="Home Score"
          value={match.scores.home}
          onChange={(e) =>
            setMatch({ ...match, scores: { ...match.scores, home: e.target.value } })}
          className="border rounded p-2 dark:bg-slate-900 dark:text-white"
        />

        <input
          type="text"
          placeholder="Away Score"
          value={match.scores.away}
          onChange={(e) =>
            setMatch({ ...match, scores: { ...match.scores, away: e.target.value } })}
          className="border rounded p-2 dark:bg-slate-900 dark:text-white"
        />

        <input
          type="text"
          placeholder="Overs"
          value={match.overs}
          onChange={(e) => setMatch({ ...match, overs: e.target.value })}
          className="border rounded p-2 dark:bg-slate-900 dark:text-white"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Match
        </button>
      </form>
    </div>
  );
};

export default Admin;
