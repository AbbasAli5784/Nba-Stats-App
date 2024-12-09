import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Teams.css'; 

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const RAPIDAPI_KEY = '2050522d5bmshdec83e2910daa6dp1424a0jsn3bd670c71775';

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teamsResponse = await axios.get('https://api-nba-v1.p.rapidapi.com/teams', {
          headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
          },
        });

        const nbaTeams = teamsResponse.data.response.filter(
          (team) => team.nbaFranchise && team.leagues.standard
        );

        const standingsResponse = await axios.get('https://api-nba-v1.p.rapidapi.com/standings', {
          headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
          },
          params:{
            season: 2024,
            league: 'standard',
        },
      });

        const standings = standingsResponse.data.response;

        console.log('Standings:', standings);

        const teamsWithRecords = nbaTeams.map((team) => {
          const teamStanding = standings.find(
            (standing) => standing.team.id === team.id
          );
          return {
            ...team,
            wins: teamStanding?.win?.total || 'N/A',
            losses: teamStanding?.loss?.total || 'N/A',
          };
        });

        setTeams(teamsWithRecords);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchTeamData();
  }, []);

  const easternTeams = teams.filter(
    (team) => team.leagues.standard?.conference === 'East'
  );
  const westernTeams = teams.filter(
    (team) => team.leagues.standard?.conference === 'West'
  );

  return (
    <div>
      <h2>NBA Teams</h2>

      {/* Eastern Conference */}
      <h3>Eastern Conference</h3>
      <div className="teams-grid">
        {easternTeams.map((team) => (
          <div className="team-card" key={team.id}>
            <img src={team.logo} alt={`${team.name} logo`} className="team-logo" />
            <div>
              <strong>{team.name}</strong> ({team.code})
              <p>City: {team.city}</p>
              <p>Division: {team.leagues.standard?.division}</p>
              <p>Record: {team.wins}-{team.losses}</p>
            </div>
          </div>
        ))}
      </div>

      <h3>Western Conference</h3>
      <div className="teams-grid">
        {westernTeams.map((team) => (
          <div className="team-card" key={team.id}>
            <img src={team.logo} alt={`${team.name} logo`} className="team-logo" />
            <div>
              <strong>{team.name}</strong> ({team.code})
              <p>City: {team.city}</p>
              <p>Division: {team.leagues.standard?.division}</p>
              <p>Record: {team.wins}-{team.losses}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
