import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./Games.css";

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
                "2050522d5bmshdec83e2910daa6dp1424a0jsn3bd670c71775", // Replace with your API key
              "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
            },
          }
        );

        const today = moment().format("YYYY-MM-DD"); // Today's date in format: YYYY-MM-DD
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
    </div>
  );
};

export default Games;
