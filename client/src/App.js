import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Matches from './pages/Matches';
import Matchdetail from './pages/Matchdetail';
import Players from './pages/Players';
import Teams from './pages/Teams';
import News from './pages/News';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Home from './pages/Home';







function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Load saved theme from localStorage
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* Top Nav Placeholder (optional) */}
        <header className="p-4 shadow-md bg-white dark:bg-slate-800 flex justify-between items-center">
          <h1 className="text-lg font-bold">🏏 SportsHub</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-300 dark:bg-gray-700 p-2 rounded-md"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        {/* Page Routes */}
        <main className="p-4">
          <Routes>
            <Route path="/matches" element={<Matches />} />
            <Route path="/match/:id" element={<Matchdetail />} />
            <Route path="/players" element={<Players />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/news" element={<News />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
