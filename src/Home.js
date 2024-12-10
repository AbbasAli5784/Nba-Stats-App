import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from "./nba.png";
import banner1 from "./banner1.jpg";
import banner2 from "./banner2.jpg";

const Home = () => {
  return (
    <div className="home">
      <header className="header">
        <div className="header-logo-container">
          <h1>NBA STAT TRACKER</h1>
          <img src={logo} alt="NBA Logo" className="nba-logo" />
        </div>
        <nav className="nav">
          <Link to="/players">Players</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/games">Games</Link>
          <Link to="/standings">Standings</Link>
        </nav>
      </header>

      <main>
        <div className="image-section">
          <div className="image-container">
            <img src={banner1} alt="NBA Action" className="image-placeholder" />
          </div>
          <div className="image-container">
            <img src={banner2} alt="NBA Stars" className="image-placeholder" />
          </div>
        </div>

        <div className="info-section">
          <div className="info-card">
            <Link to="/players">
              <h3>Players</h3>
              <p>Explore player stats, bios, and profiles.</p>
            </Link>
          </div>

          <div className="info-card">
            <Link to="/teams">
              <h3>Teams</h3>
              <p>View stats of top teams in the league.</p>
            </Link>
          </div>
          <div className="info-card">
            <Link to="/games">
              <h3>Games</h3>
              <p>Find results and summaries of completed games.</p>
            </Link>
          </div>
          <div className="info-card">
            <Link to="/standings">
              <h3>Standings</h3>
              <p>Check out the standings for the whole league.</p>
            </Link>
          </div>
        </div>
      </main>

      <footer>
        <div className="footer-column">
          <h4>Social Links</h4>
          <div className="social-links">
            <a
              href="https://www.instagram.com/nba/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/user/NBA"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
            <a
              href="https://x.com/NBA?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h4>Today's Live Games</h4>
          <p>Magic vs Bucks</p>
          <p>Warriors vs Rockets</p>
          <p>Hawks vs Knicks</p>
        </div>
        <div className="footer-column">
          <h4>MVP Race</h4>
          <p>Nikola Jokic</p>
          <p>Shai Gilgeous-Alexander</p>
          <p>Jason Tatum</p>
        </div>
        <div className="footer-column">
          <h4>League Leaders</h4>
          <p>Russell Westbrook</p>
          <p>Chris Paul</p>
          <p>Jason Tatum</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
