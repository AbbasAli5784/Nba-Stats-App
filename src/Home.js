import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Add styles to match the wireframe

const Home = () => {
  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        <h1>NBA STAT TRACKER</h1>
        <h2>NBA</h2>
        <nav className="nav">
          <Link to="/players">Players</Link>
          <Link to="/">Teams</Link>
          <Link to="/games">Games</Link>
          <Link to="/">Standings</Link>
          <Link to="/api-data">Api Sample</Link>
          <button className="favorite-btn">Favorite</button>
          <button className="alert-btn">Alerts</button>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <div className="image-section">
          <div className="placeholder">Image Placeholder 1</div>
          <div className="placeholder">Image Placeholder 2</div>
        </div>

        <div className="info-section">
          <div className="info-card">
            <Link to="/player-profile">
              <h3>Players</h3>
              <p>Explore player stats, bios, and profiles.</p>
            </Link>
          </div>

          <div className="info-card">
            <Link to="/leaderboard">
              <h3>Teams</h3>
              <p>View stats of top teams in the league.</p>
            </Link>
          </div>
          <div className="info-card">
            <Link to="/game-results">
              <h3>Games</h3>
              <p>Find results and summaries of completed games.</p>
            </Link>
          </div>
          <div className="info-card">
            <Link to="/award-race">
              <h3>Standings</h3>
              <p>Check out the standings for major NBA awards.</p>
            </Link>
          </div>
          <div className="info-card">
            <Link to="/box-score">
              <h3>Box Score</h3>
              <p>Get detailed game statistics for all players.</p>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-column">
          <h4>Social Links</h4>
          <p>Instagram</p>
          <p>YouTube</p>
          <p>LinkedIn</p>
        </div>
        <div className="footer-column">
          <h4>Today's Live</h4>
          <p>Game 1</p>
          <p>Game 2</p>
          <p>Game 3</p>
        </div>
        <div className="footer-column">
          <h4>MVP Race</h4>
          <p>LeBron James</p>
          <p>Jamal Murray</p>
          <p>LaMelo Ball</p>
        </div>
        <div className="footer-column">
          <h4>League Leaders</h4>
          <p>Russell Westbrook</p>
          <p>Chris Paul</p>
          <p>Bronny James</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
