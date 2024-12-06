import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import LiveStats from "./LiveStats";
import PlayerProfile from "./PlayerProfile";
import Leaderboard from "./Leaderboard";
import GameResults from "./GameResults";
import AwardRace from "./AwardRace";
import BoxScore from "./BoxScore";
import ApiData from "./ApiData"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live-stats" element={<LiveStats />} />
          <Route path="/player-profile" element={<PlayerProfile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/game-results" element={<GameResults />} />
          <Route path="/award-race" element={<AwardRace />} />
          <Route path="/box-score" element={<BoxScore />} />
          <Route path="/api-data" element={<ApiData />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
