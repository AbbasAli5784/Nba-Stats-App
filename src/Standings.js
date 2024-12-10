import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Standings.css";
import { Link } from "react-router-dom";
import logo from "./nba.png";

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const RAPIDAPI_KEY = "2050522d5bmshdec83e2910daa6dp1424a0jsn3bd670c71775";

  useEffect(() => {
    const fetchStandingsData = async () => {
      try {
        const response = await axios.get(
          "https://api-nba-v1.p.rapidapi.com/standings",
          {
            headers: {
              "X-RapidAPI-Key": RAPIDAPI_KEY,
              "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
            },
            params: {
              season: 2024,
              league: "standard",
            },
          }
        );

        const data = response.data.response;

        const standingsWithWinPercentage = data.map((team) => ({
          ...team,
          winPercentage: team.win.total / (team.win.total + team.loss.total),
        }));

        setStandings(standingsWithWinPercentage);
        console.log("API Data", standingsWithWinPercentage);
      } catch (error) {
        console.error("Error fetching standings data:", error);
      }
    };

    fetchStandingsData();
  }, []);

  const isValidImage = (url) => {
    return (
      url &&
      (url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".jpeg"))
    );
  };

  const easternStandings = standings
    .filter((team) => team.conference.name === "east")
    .sort((a, b) => b.winPercentage - a.winPercentage);

  const westernStandings = standings
    .filter((team) => team.conference.name === "west")
    .sort((a, b) => b.winPercentage - a.winPercentage);

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
      <h2>NBA Standings</h2>

      <h3>Eastern Conference</h3>
      <div className="standings-grid">
        {easternStandings.map((team, index) => (
          <div className="standings-card" key={team.team.id}>
            {isValidImage(team.team.logo) && (
              <img
                src={team.team.logo}
                alt={`${team.team.name} logo`}
                className="team-logo"
              />
            )}
            <div>
              <strong>
                #{index + 1} {team.team.name}
              </strong>
              <p>Wins: {team.win.total}</p>
              <p>Losses: {team.loss.total}</p>
              <p>Win Percentage: {(team.winPercentage * 100).toFixed(2)}%</p>
            </div>
          </div>
        ))}
      </div>

      <h3>Western Conference</h3>
      <div className="standings-grid">
        {westernStandings.map((team, index) => (
          <div className="standings-card" key={team.team.id}>
            {isValidImage(team.team.logo) && (
              <img
                src={team.team.logo}
                alt={`${team.team.name} logo`}
                className="team-logo"
              />
            )}
            <div>
              <strong>
                #{index + 1} {team.team.name}
              </strong>
              <p>Wins: {team.win.total}</p>
              <p>Losses: {team.loss.total}</p>
              <p>Win Percentage: {(team.winPercentage * 100).toFixed(2)}%</p>
            </div>
          </div>
        ))}
      </div>
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

export default Standings;
