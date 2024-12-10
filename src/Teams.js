import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Teams.css";
import { Link } from "react-router-dom";
import logo from "./nba.png";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const RAPIDAPI_KEY = "2050522d5bmshdec83e2910daa6dp1424a0jsn3bd670c71775";

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teamsResponse = await axios.get(
          "https://api-nba-v1.p.rapidapi.com/teams",
          {
            headers: {
              "X-RapidAPI-Key": RAPIDAPI_KEY,
              "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
            },
          }
        );

        const nbaTeams = teamsResponse.data.response.filter(
          (team) => team.nbaFranchise && team.leagues.standard
        );

        const standingsResponse = await axios.get(
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

        const standings = standingsResponse.data.response;

        console.log("Standings:", standings);

        const teamsWithRecords = nbaTeams.map((team) => {
          const teamStanding = standings.find(
            (standing) => standing.team.id === team.id
          );
          return {
            ...team,
            wins: teamStanding?.win?.total || "N/A",
            losses: teamStanding?.loss?.total || "N/A",
          };
        });

        setTeams(teamsWithRecords);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamData();
  }, []);

  const easternTeams = teams.filter(
    (team) => team.leagues.standard?.conference === "East"
  );
  const westernTeams = teams.filter(
    (team) => team.leagues.standard?.conference === "West"
  );

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
      <h2>NBA Teams</h2>

      <h3>Eastern Conference</h3>
      <div className="teams-grid">
        {easternTeams.map((team) => (
          <div className="team-card" key={team.id}>
            <img
              src={team.logo}
              alt={`${team.name} logo`}
              className="team-logo"
            />
            <div>
              <strong>{team.name}</strong> ({team.code})<p>City: {team.city}</p>
              <p>Division: {team.leagues.standard?.division}</p>
              <p>
                Record: {team.wins}-{team.losses}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3>Western Conference</h3>
      <div className="teams-grid">
        {westernTeams.map((team) => (
          <div className="team-card" key={team.id}>
            <img
              src={team.logo}
              alt={`${team.name} logo`}
              className="team-logo"
            />
            <div>
              <strong>{team.name}</strong> ({team.code})<p>City: {team.city}</p>
              <p>Division: {team.leagues.standard?.division}</p>
              <p>
                Record: {team.wins}-{team.losses}
              </p>
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

export default Teams;
