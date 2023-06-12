'use client';

import { useEffect, useState } from 'react';

import SportSelector from '../sport-selector/SportSelector';
import MatchCard from '../match-card/MatchCard';
import { getGames } from '@/app/api/sportsbookData';

import styles from './SportsbookGames.module.scss';
import { Match } from '@/app/types/Match';

const SportsbookGames = () => {
 const [sport, setSport] = useState('baseball');
 const [league, setLeague] = useState('mlb');
 const [matches, setMatches] = useState<Match[]>([]);
 const [isLoading, setIsLoading] = useState(false);


 useEffect(() => {
  async function fetchData() {
   try {
    setIsLoading(true);
    const delay = 0;
    setTimeout(async () => {
     const matches = await getGames(league, sport);
     setMatches(matches);
     setIsLoading(false);
    }, delay);
   } catch (error) {
    console.log(error);
   } finally {
    setIsLoading(false);
   }
  }

  fetchData();
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
     <MatchCard
      key={match.id}
      match={match}
      sport={sport}
      league={league}
     />
    ))}
   </div>

  </div>
 );
};

export default SportsbookGames;
