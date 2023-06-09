'use client';

import { useEffect, useState } from 'react';

import styles from './SportsbookGames.module.scss';
import SportSelector from '../sport-selector/SportSelector';
import MatchCard from '../match-card/MatchCard';

const SportsbookGames = () => {
 const [sport, setSport] = useState('baseball');
 const [league, setLeague] = useState('mlb');
 const [matches, setMatches] = useState([]);
 const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
  async function getMatchData() {
   try {
    setIsLoading(true);
    const delay = 0;
    setTimeout(async () => {
     const res = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard`
     );

     if (!res.ok) {
      throw new Error('Failed to fetch matches');
     }

     const data = await res.json();
     setMatches(data.events);
     setIsLoading(false);
    }, delay);
   } catch (error) {
    console.log(error);
   } finally {
    setIsLoading(false);
   }
  }
  getMatchData();
 }, [league, sport]);

 return (
  <div>

   <SportSelector
    setSport={setSport}
    sport={sport}
    setLeague={setLeague}
   />

   <div className={`${styles.feed} ${isLoading ? styles.loading : styles.loaded}`}>
    {matches.map((match, i) => (
     <MatchCard key={i} game={match} sport={sport} league={league} />
    ))}
   </div>

  </div>
 );
};

export default SportsbookGames;
