import React, { useEffect, useState } from 'react';

const MatchEditor = () => {
  const [matches, setMatches] = useState([]);
  const [editMatch, setEditMatch] = useState(null);
  const [form, setForm] = useState({});

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    const res = await fetch('http://localhost:9091/api/admin/matches', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMatches(data);
  };

  const handleEdit = (match) => {
    setEditMatch(match._id);
    setForm({ ...match });
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:9091/api/admin/matches/${editMatch}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    setEditMatch(null);
    fetchMatches();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:9091/api/admin/matches/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchMatches();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Matches</h2>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100 dark:bg-slate-700">
            <th>ID</th>
            <th>Teams</th>
            <th>Status</th>
            <th>Format</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m) => (
            <tr key={m._id} className="border-t">
              <td>{m.match_id}</td>
              <td>{m.teams?.home} vs {m.teams?.away}</td>
              <td>{m.status}</td>
              <td>{m.format}</td>
              <td>
                <button onClick={() => handleEdit(m)} className="text-blue-600 mr-2">Edit</button>
                <button onClick={() => handleDelete(m._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editMatch && (
        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-semibold">Editing Match</h3>
          <input
            className="w-full p-2 border rounded"
            placeholder="Match ID"
            value={form.match_id || ''}
            onChange={(e) => setForm({ ...form, match_id: e.target.value })}
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="Home Team"
            value={form.teams?.home || ''}
            onChange={(e) => setForm({ ...form, teams: { ...form.teams, home: e.target.value } })}
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="Away Team"
            value={form.teams?.away || ''}
            onChange={(e) => setForm({ ...form, teams: { ...form.teams, away: e.target.value } })}
          />
          <select
            className="w-full p-2 border rounded"
            value={form.status || ''}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="">Status</option>
            <option value="LIVE">LIVE</option>
            <option value="UPCOMING">UPCOMING</option>
            <option value="RESULT">RESULT</option>
          </select>
          <select
            className="w-full p-2 border rounded"
            value={form.format || ''}
            onChange={(e) => setForm({ ...form, format: e.target.value })}
          >
            <option value="">Format</option>
            <option value="T20">T20</option>
            <option value="ODI">ODI</option>
            <option value="TEST">TEST</option>
          </select>
          <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchEditor;
