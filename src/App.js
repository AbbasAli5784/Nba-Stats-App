import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Games from "./Games";
import Players from "./Players";

import ApiData from "./ApiData";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/api-data" element={<ApiData />} />
          <Route path="/players" element={<Players />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
