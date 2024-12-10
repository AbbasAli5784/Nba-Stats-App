import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Players.css";
import logo from "./nba.png";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [displayedPlayers, setDisplayedPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const playersPerPage = 20;
  const imageBaseUrl =
    "https://raw.githubusercontent.com/GreenGuitar0/nba-players/main/player_images/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching teams...");
        const teamsResponse = await axios.get(
          "https://api-nba-v1.p.rapidapi.com/teams",
          {
            headers: {
              "X-RapidAPI-Key":
                "2050522d5bmshdec83e2910daa6dp1424a0jsn3bd670c71775",
              "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
            },
          }
        );
        const teamsData = teamsResponse.data.response || [];
        setTeams(teamsData);
        console.log("Teams Data:", teamsData);

        const allPlayers = [];
        for (const team of teamsData) {
          console.log(`Fetching players for team: ${team.name}`);
          const playersResponse = await axios.get(
            "https://api-nba-v1.p.rapidapi.com/players",
            {
              params: { team: team.id, season: "2024" },
              headers: {
                "X-RapidAPI-Key":
                  "2050522d5bmshdec83e2910daa6dp1424a0jsn3bd670c71775",
                "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
              },
            }
          );

          const teamPlayers = playersResponse.data.response || [];
          console.log(`Players for team ${team.name}:`, teamPlayers);

          const playersWithTeam = teamPlayers.map((player) => ({
            ...player,
            teamName: team.name,
            teamLogo: team.logo,
          }));

          allPlayers.push(...playersWithTeam);
        }

        const playersWithValidImages = await filterPlayersWithImages(
          allPlayers
        );
        setPlayers(playersWithValidImages);
        setDisplayedPlayers(playersWithValidImages.slice(0, playersPerPage));
        console.log("Filtered Players Data:", playersWithValidImages);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const constructPlayerImageUrl = (firstname, lastname) => {
    if (!firstname || !lastname) return null;

    const formattedFirstName =
      firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();
    const formattedLastName =
      lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase();

    return `${imageBaseUrl}${formattedFirstName}-${formattedLastName}.jpg`;
  };

  const filterPlayersWithImages = async (players) => {
    const filteredPlayers = [];
    for (const player of players) {
      const imageUrl = constructPlayerImageUrl(
        player.firstname,
        player.lastname
      );
      if (!imageUrl) continue;

      try {
        const response = await axios.head(imageUrl);
        if (response.status === 200) {
          filteredPlayers.push(player);
        }
      } catch (error) {
        console.log(
          `Image not found for: ${player.firstname} ${player.lastname}`
        );
      }
    }
    return filteredPlayers;
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const nextPlayers = players.slice(0, nextPage * playersPerPage);
    setDisplayedPlayers(nextPlayers);
    setPage(nextPage);
    console.log(
      `Loaded next page: ${nextPage}, Total Players Displayed: ${nextPlayers.length}`
    );
  };

  if (loading) return <p>Loading players...</p>;
  if (error) return <p>{error}</p>;
  if (!players || players.length === 0) return <p>No players available</p>;

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
      <h1>NBA Players</h1>
      <div className="players-list">
        {displayedPlayers.map((player, index) => (
          <div key={index} className="player-card">
            <img
              src={constructPlayerImageUrl(player.firstname, player.lastname)}
              alt={`${player.firstname || "Unknown"} ${
                player.lastname || "Player"
              }`}
              className="player-image"
            />
            <h2>
              {player.firstname || "Unknown"} {player.lastname || "Player"}
            </h2>
            <p>Team: {player.teamName}</p>
            <img
              src={player.teamLogo || "default-team-logo.png"}
              alt={`${player.teamName} logo`}
              className="team-logo"
            />
            <p>Position: {player.leagues?.standard?.pos || "N/A"}</p>
            <p>Height: {player.height?.meters || "N/A"} m</p>
            <p>Weight: {player.weight?.kilograms || "N/A"} kg</p>
            <p>Birthdate: {player.birth?.date || "N/A"}</p>
          </div>
        ))}
      </div>
      {displayedPlayers.length < players.length && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      )}
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

export default Players;
