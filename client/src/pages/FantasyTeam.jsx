import React, { useState, useEffect } from 'react';

const FantasyTeam = () => {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9091/api/players') // assuming players endpoint exists
      .then(res => res.json())
      .then(data => setPlayers(data));
  }, []);

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(pid => pid !== id));
    } else if (selected.length < 5) {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">🎮 Build Your Fantasy XI (Pick 5)</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {players.map(p => (
          <div
            key={p._id}
            onClick={() => toggleSelect(p._id)}
            className={`cursor-pointer p-3 border rounded-lg shadow-sm text-center ${
              selected.includes(p._id)
                ? 'bg-green-600 text-white'
                : 'bg-white dark:bg-slate-700 text-black dark:text-white'
            }`}
          >
            <img src={p.image} alt={p.name} className="w-full h-24 object-contain mb-2" />
            <p className="font-semibold">{p.name}</p>
            <p className="text-sm">{p.role}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-gray-700 dark:text-white mb-2">Selected: {selected.length} / 5</p>
        <button
          disabled={selected.length !== 5}
          className={`px-6 py-2 rounded ${
            selected.length === 5 ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          ✅ Save Team
        </button>
      </div>
    </div>
  );
};

export default FantasyTeam;
