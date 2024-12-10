import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Games from "./Games";
import Players from "./Players";
import Teams from "./Teams";
import Standings from "./Standings";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />

          <Route path="/players" element={<Players />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/standings" element={<Standings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
