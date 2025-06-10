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

  const [matches, setMatches] = useState([]);
  const [message, setMessage] = useState('');
  const [editingMatchId, setEditingMatchId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) navigate('/login');
    fetchMatches();
  }, [message, navigate]);

  const fetchMatches = async () => {
    try {
      const res = await fetch('http://localhost:9091/api/admin/matches', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log('Fetched match response:', data);
      setMatches(Array.isArray(data) ? data : data.matches || []);
    } catch (err) {
      console.error('Error fetching matches', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:9091/api/admin/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(match),
      });

      const data = await res.json();
      if (data.message || data._id) {
        alert('✅ Match saved!');
        setMessage('Match added');
        setMatch({
          match_id: '',
          format: 'T20',
          status: 'UPCOMING',
          teams: { home: '', away: '' },
          scores: { home: '', away: '' },
          overs: '',
        });
      } else {
        alert('❌ Failed to save match.');
      }
    } catch (err) {
      console.error('Error saving match', err);
      alert('❌ Server error while saving match.');
    }
  };

  const deleteMatch = async (id) => {
    try {
      await fetch(`http://localhost:9091/api/admin/matches/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setMatches(matches.filter((m) => m._id !== id));
    } catch (err) {
      alert('❌ Could not delete match');
    }
  };

  const updateMatch = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:9091/api/admin/matches/${editingMatchId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      setEditingMatchId(null);
      setEditForm(null);
      setMessage('Match updated');
    } catch (err) {
      alert('❌ Update failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🛠 Admin Panel</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Match Form */}
      <form onSubmit={handleSubmit} className="grid gap-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow mb-8">
        <input type="text" placeholder="Match ID" value={match.match_id}
          onChange={(e) => setMatch({ ...match, match_id: e.target.value })}
          required className="border rounded p-2 dark:bg-slate-900 dark:text-white"
        />
        <select value={match.format} onChange={(e) => setMatch({ ...match, format: e.target.value })}
          className="border rounded p-2 dark:bg-slate-900 dark:text-white">
          <option value="T20">T20</option>
          <option value="ODI">ODI</option>
          <option value="TEST">TEST</option>
        </select>
        <select value={match.status} onChange={(e) => setMatch({ ...match, status: e.target.value })}
          className="border rounded p-2 dark:bg-slate-900 dark:text-white">
          <option value="UPCOMING">UPCOMING</option>
          <option value="LIVE">LIVE</option>
          <option value="RESULT">RESULT</option>
        </select>
        <input type="text" placeholder="Home Team" value={match.teams.home}
          onChange={(e) => setMatch({ ...match, teams: { ...match.teams, home: e.target.value } })}
          className="border rounded p-2 dark:bg-slate-900 dark:text-white"
        />
        <input type="text" placeholder="Away Team" value={match.teams.away}
          onChange={(e) => setMatch({ ...match, teams: { ...match.teams, away: e.target.value } })}
          className="border rounded p-2 dark:bg-slate-900 dark:text-white"
        />
        <input type="text" placeholder="Home Score" value={match.scores.home}
          onChange={(e) => setMatch({ ...match, scores: { ...match.scores, home: e.target.value } })}
          className="border rounded p-2 dark:bg-slate-900 dark:text-white"
        />
        <input type="text" placeholder="Away Score" value={match.scores.away}
          onChange={(e) => setMatch({ ...match, scores: { ...match.scores, away: e.target.value } })}
          className="border rounded p-2 dark:bg-slate-900 dark:text-white"
        />
        <input type="text" placeholder="Overs" value={match.overs}
          onChange={(e) => setMatch({ ...match, overs: e.target.value })}
          className="border rounded p-2 dark:bg-slate-900 dark:text-white"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          ➕ Add Match
        </button>
      </form>

      {/* Match List */}
      <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">📋 All Matches</h3>
      <ul className="space-y-3">
        {Array.isArray(matches) && matches.map((match) =>
          editingMatchId === match._id ? (
            <form
              key={match._id}
              onSubmit={updateMatch}
              className="bg-yellow-50 dark:bg-slate-600 p-4 rounded space-y-2"
            >
              <input value={editForm.teams.home}
                onChange={(e) => setEditForm({ ...editForm, teams: { ...editForm.teams, home: e.target.value } })}
                className="p-1 rounded border w-full" />
              <input value={editForm.teams.away}
                onChange={(e) => setEditForm({ ...editForm, teams: { ...editForm.teams, away: e.target.value } })}
                className="p-1 rounded border w-full" />
              <select value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                className="p-1 rounded border w-full">
                <option value="UPCOMING">UPCOMING</option>
                <option value="LIVE">LIVE</option>
                <option value="RESULT">RESULT</option>
              </select>
              <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
              <button type="button" onClick={() => setEditingMatchId(null)} className="ml-2 bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
            </form>
          ) : (
            <li key={match._id} className="bg-gray-100 dark:bg-slate-700 p-4 rounded shadow flex justify-between items-center">
              <div>
                <p className="font-semibold">{match.teams?.home} vs {match.teams?.away}</p>
                <p className="text-sm text-gray-500">Format: {match.format} | Status: {match.status}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingMatchId(match._id);
                    setEditForm(match);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMatch(match._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Admin;
