import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Matches from './pages/Matches';


<div className="text-3xl font-bold underline text-blue-500">
  Tailwind is working!
</div>


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
