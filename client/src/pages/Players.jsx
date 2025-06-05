import React, { useEffect, useState } from 'react';
import PlayerCard from '../components/PlayerCard/PlayerCard';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch('http://localhost:9091/api/players');
        const data = await res.json();
        setPlayers(data);
      } catch (err) {
        console.error("Error fetching players:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || player.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Top Players</h2>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by player name"
          className="px-4 py-2 rounded-md border dark:bg-slate-800 dark:text-white dark:border-slate-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 rounded-md border dark:bg-slate-800 dark:text-white dark:border-slate-600"
        >
          <option value="All">All Roles</option>
          <option value="Batter">Batter</option>
          <option value="Bowler">Bowler</option>
          <option value="All-Rounder">All-Rounder</option>
        </select>
      </div>

      {/* Player Cards */}
      {loading ? (
        <div className="text-center text-gray-500">Loading players...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Players;
