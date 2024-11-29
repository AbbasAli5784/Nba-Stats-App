import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import ApiData from "./ApiData";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Header */}
        <header className="header">
          <h1>NBA STAT TRACKER</h1>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/api-data">API Data</Link>
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api-data" element={<ApiData />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <p>NBA Stats Tracker - Powered by balldontlie.io</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
