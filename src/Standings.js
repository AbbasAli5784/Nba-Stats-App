import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Standings.css';

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const RAPIDAPI_KEY = '2050522d5bmshdec83e2910daa6dp1424a0jsn3bd670c71775';

  useEffect(() => {
    const fetchStandingsData = async () => {
      try {
        const response = await axios.get('https://api-nba-v1.p.rapidapi.com/standings', {
          headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
          },
          params: {
            season: 2024,
            league: 'standard',
          },
        });

        const data = response.data.response;
        setStandings(data);
      } catch (error) {
        console.error('Error fetching standings data:', error);
      }
    };

    fetchStandingsData();
  }, []);

  const easternStandings = standings.filter(
    (team) => team.conference.name === 'East'
  );
  const westernStandings = standings.filter(
    (team) => team.conference.name === 'West'
  );

  return (
    <div>
      <h2>NBA Standings</h2>

      {/* Eastern Conference */}
      <h3>Eastern Conference</h3>
      <div className="standings-grid">
        {easternStandings.map((team, index) => (
          <div className="standings-card" key={team.team.id}>
            <div>
              <strong>
                #{index + 1} {team.team.name}
              </strong>
              <p>Wins: {team.win.total}</p>
              <p>Losses: {team.loss.total}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Western Conference */}
      <h3>Western Conference</h3>
      <div className="standings-grid">
        {westernStandings.map((team, index) => (
          <div className="standings-card" key={team.team.id}>
            <div>
              <strong>
                #{index + 1} {team.team.name}
              </strong>
              <p>Wins: {team.win.total}</p>
              <p>Losses: {team.loss.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Standings;

