import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./Games.css";
import { Link } from "react-router-dom";
import logo from "./nba.png";
const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM D, YYYY, h:mm A");
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "https://api-nba-v1.p.rapidapi.com/games",
          {
            params: { season: "2024" },
            headers: {
              "X-RapidAPI-Key":
                "2050522d5bmshdec83e2910daa6dp1424a0jsn3bd670c71775",
              "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
            },
          }
        );

        const today = moment().format("YYYY-MM-DD");
        const todayGames = response.data.response.filter((game) =>
          moment(game.date.start).isSame(today, "day")
        );

        setGames(todayGames || []);
      } catch (err) {
        console.error("Error fetching games:", err.message);
        setError("Failed to fetch games.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <p>Loading games...</p>;
  if (error) return <p>{error}</p>;
  if (!games || games.length === 0) return <p>No games available for today</p>;

  return (
    <div>
      <header className="header">
        <div className="header-logo-container">
          <h1>NBA STAT TRACKER</h1>
          <img src={logo} alt="NBA Logo" className="nba-logo" />
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/players">Players</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/games">Games</Link>
          <Link to="/standings">Standings</Link>
        </nav>
      </header>
      <h1>NBA Games for Today</h1>
      <ul className="games-list">
        {games.map((game) => (
          <li key={game.id} className="game-card">
            <div className="game-details">
              <img
                src={game.teams?.home?.logo || "default-home-logo.png"}
                alt={`${game.teams?.home?.name} logo`}
                className="team-logo"
              />
              <div className="team-info">
                <h2>{game.teams?.home?.name || "Home team not available"}</h2>
                <span>vs.</span>
                <h2>
                  {game.teams?.visitors?.name || "Visitor team not available"}
                </h2>
              </div>
              <img
                src={game.teams?.visitors?.logo || "default-visitors-logo.png"}
                alt={`${game.teams?.visitors?.name} logo`}
                className="team-logo"
              />
            </div>
            <p>{formatDate(game.date?.start) || "Date not available"}</p>
            <p>Status: {game.status?.long || "Status not available"}</p>
            <div className="live-stats">
              <p>
                <strong>Live Score:</strong> {game.scores?.home?.points || 0} -{" "}
                {game.scores?.visitors?.points || 0}
              </p>
              <p>
                <strong>Quarter:</strong> {game.periods?.current || "N/A"}
              </p>
              <p>
                <strong>Time Remaining:</strong> {game.status?.clock || "N/A"}
              </p>
            </div>
            <a
              href={`https://www.nba.com/game/${game.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="game-link"
            >
              View More
            </a>
          </li>
        ))}
      </ul>
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

export default Games;
