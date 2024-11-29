import React, { useState, useEffect } from "react";
import axios from "axios";

function ApiData() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("https://www.balldontlie.io/api/v1/players");
        setPlayers(response.data.data.slice(0, 10)); // Fetch first 10 players
        setLoading(false);
      } catch (error) {
        console.error("Error fetching API data:", error);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="main-content">
      <h2>API Data</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="players-list">
          {players.map((player) => (
            <div key={player.id} className="player-card">
              <h3>
                {player.first_name} {player.last_name}
              </h3>
              <p>Team: {player.team.full_name}</p>
              <p>Position: {player.position || "N/A"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApiData;
