import React, { useState, useEffect } from "react";
import axios from "axios";

const ApiData = () => {
  const [players, setPlayers] = useState([]); // State to store player data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          "https://api-nba-v1.p.rapidapi.com/players",
          {
            headers: {
              "X-RapidAPI-Key": "2050522d5bmshdec83e2910daa6dp1424a0jsn3bd670c71775",
              "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
            },
            params: {
              team: 1, // Fetch players from team ID 1 (e.g., Atlanta Hawks)
              season: 2021, // Optionally specify the season
            },
          }
        );

        // Update state with fetched player data
        if (response.data && response.data.response) {
          setPlayers(response.data.response.slice(0, 10)); // Limit to 10 players
        } else {
          setError("No player data available.");
        }
      } catch (err) {
        console.error("Error fetching API data:", err);
        setError("Failed to fetch player data.");
      } finally {
        setLoading(false); // Set loading to false after request
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="main-content">
      <h2>NBA Players</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="players-list">
          {players.map((player, index) => (
            <div key={index} className="player-card">
              <h3>
                {player.firstname} {player.lastname}
              </h3>
              <p>Team: {player.team ? player.team.fullname : "N/A"}</p>
              <p>Position: {player.leagues.standard.pos || "N/A"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiData;
