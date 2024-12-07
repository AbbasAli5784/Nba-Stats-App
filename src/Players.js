import React, { useState, useEffect } from "react";
import axios from "axios";

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

    // Ensure the first letter is capitalized and the rest are lowercase
    const formattedFirstName =
      firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();
    const formattedLastName =
      lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase();

    // Construct the URL using the GitHub naming convention
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
        // Check if the image exists using a HEAD request
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
    </div>
  );
};

export default Players;
