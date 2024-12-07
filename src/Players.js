import React, { useState, useEffect } from "react";
import axios from "axios";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Teams
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
        setTeams(teamsData); // Save teams for later use

        // Fetch Players for Each Team
        const allPlayers = [];
        for (const team of teamsData) {
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
          const playersData = playersResponse.data.response || [];
          // Attach team details to each player
          const playersWithTeam = playersData.map((player) => ({
            ...player,
            teamName: team.name,
            teamLogo: team.logo,
          }));
          allPlayers.push(...playersWithTeam); // Merge players into one array
        }
        setPlayers(allPlayers);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading players...</p>;
  if (error) return <p>{error}</p>;
  if (!players || players.length === 0) return <p>No players available</p>;

  return (
    <div>
      <h1>NBA Players</h1>
      <div className="players-list">
        {players.map((player) => (
          <div key={player.id} className="player-card">
            <img
              src={`https://nba-players.herokuapp.com/players/${player.lastname.toLowerCase()}/${player.firstname.toLowerCase()}`}
              alt={`${player.firstname} ${player.lastname}`}
              className="player-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "default-player-image.png";
              }}
            />
            <h2>
              {player.firstname} {player.lastname}
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
    </div>
  );
};

export default Players;
