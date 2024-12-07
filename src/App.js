import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";

import ApiData from "./ApiData";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api-data" element={<ApiData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
