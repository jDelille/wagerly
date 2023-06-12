'use client';

import { useEffect, useState } from 'react';

import SportSelector from '../sport-selector/SportSelector';
import MatchCard from '../match-card/MatchCard';
import { getGames } from '@/app/api/sportsbookData';
import { Match } from '@/app/types/Match';

import styles from './SportsbookGames.module.scss';
import matchStore from '@/app/store/matchStore';

type Date = {
 date: string;
 id: string;
}

const SportsbookGames = () => {
 const [sport, setSport] = useState('baseball');
 const [matches, setMatches] = useState<Match[]>([]);
 const [isLoading, setIsLoading] = useState(false);
 const [dates, setDates] = useState<Date[]>()
 const [date, setDate] = useState("");

 function getFormattedDate(): string {
  const today = new Date();

  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
 }

 const formattedDate = getFormattedDate();

 const league = matchStore.league

 useEffect(() => {
  async function fetchData() {
   try {
    setIsLoading(true);
    const delay = 0;
    setTimeout(async () => {
     const matches = await getGames(league || 'mlb', date || formattedDate);
     setDates(matches.quickNav)
     setMatches(matches.sectionList[0].events);
     setIsLoading(false);
    }, delay);
   } catch (error) {
    console.log(error);
   } finally {
    setIsLoading(false);
   }
  }

  fetchData();
 }, [league, sport, date, formattedDate]);



 return (
  <div>
   <SportSelector
    setSport={setSport}
    sport={sport}
   />
   <div className={styles.dates}>
    {dates?.map((date) => (
     <span key={date.id} onClick={() => setDate(date.id)}>{date.id}</span>
    ))}
   </div>
   <div className={`${styles.feed} ${isLoading ? styles.loading : styles.loaded}`}>
    {matches.map((match, i) => (
     <MatchCard
      key={match.id}
      match={match}
      sport={sport}
     />
    ))}
   </div>

  </div>
 );
};

export default SportsbookGames;
