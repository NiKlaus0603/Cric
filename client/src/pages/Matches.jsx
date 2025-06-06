import React, { useEffect, useState } from 'react';
import LiveMatchCard from '../components/MatchCard/LiveMatchCard';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formatFilter, setFormatFilter] = useState("T20");
  const [teamFilter, setTeamFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch('http://localhost:9091/api/live-matches');
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error("Error fetching matches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Dynamically get all team names
  const allTeams = [...new Set(matches.flatMap(m => [m.teams.home, m.teams.away]))];

  // Apply all filters
  const filteredMatches = matches.filter(match => {
    const isFormatMatch = match.format === formatFilter;
    const isTeamMatch =
      teamFilter === "All" ||
      match.teams.home === teamFilter ||
      match.teams.away === teamFilter;
    const isStatusMatch =
      statusFilter === "All" || match.status === statusFilter;

    return isFormatMatch && isTeamMatch && isStatusMatch;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Live Matches</h2>

      {/* Format Tabs */}
      <div className="flex gap-3 mb-4">
        {["T20", "ODI", "Test"].map((format) => (
          <button
            key={format}
            onClick={() => setFormatFilter(format)}
            className={`px-4 py-2 rounded-full border transition ${
              formatFilter === format
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {format}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Team Filter */}
        <select
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="px-4 py-2 rounded-md border dark:bg-slate-800 dark:text-white dark:border-slate-600"
        >
          <option value="All">All Teams</option>
          {allTeams.map(team => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-md border dark:bg-slate-800 dark:text-white dark:border-slate-600"
        >
          <option value="All">All Statuses</option>
          <option value="LIVE">LIVE</option>
          <option value="UPCOMING">UPCOMING</option>
          <option value="RESULT">RESULT</option>
        </select>
      </div>

      {/* Match Cards */}
      {loading ? (
        <div className="text-center text-gray-500">Loading matches...</div>
      ) : filteredMatches.length === 0 ? (
        <div className="text-center text-gray-500">No matches found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <LiveMatchCard key={match.match_id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches;
