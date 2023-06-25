'use client';

import { useEffect, useState } from 'react';

import SportSelector from '../sport-selector/SportSelector';
import MatchCard from '../match-card/MatchCard';
import { getGames, getScores } from '@/app/api/sportsbookData';
import { Match } from '@/app/types/Match';

import styles from './SportsbookGames.module.scss';
import matchStore from '@/app/store/matchStore';
import { Game } from '@/app/types/Game';

type Date = {
  date: string;
  id: string;
}

const SportsbookGames = () => {
  const [sport, setSport] = useState('baseball');
  const [matches, setMatches] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState<Date[]>()

  const todaysDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const [apiDate, setApiDate] = useState(todaysDate);

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
          const matches = await getScores(sport, league);
          setMatches(matches.events);
          setIsLoading(false);
        }, delay);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [league, sport, apiDate, formattedDate]);


  const formatDate = (dateStr: string) => {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);

    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric"
    });

    return formattedDate;
  };


  return (
    <div className={styles.sportsBookGames}>
      <SportSelector
        setSport={setSport}
        sport={sport}
      />
      <div className={styles.header}>
        <strong>{league} Sportsbook</strong>
      </div>
      <div className={styles.dates}>
        {/* {dates?.map((date) => (
          <span
            key={date.id}
            onClick={() => setApiDate(date.id)}
            className={apiDate === date.id ? styles.activeDate : ""}
          >{formatDate(date.id)}</span>
        ))} */}
      </div>
      <div className={`${styles.feed} ${isLoading ? styles.loading : styles.loaded}`}>
        {matches
          .slice()
          .sort((a, b) => {
            if (a.status.type.state === b.status.type.state) {
              // If both matches have the same state, sort based on start time
              return a.date > b.date ? 1 : -1;
            } else if (a.status.type.state === "pre" || a.status.type.state === "in") {
              // Prioritize matches that haven't started or are in progress
              return -1;
            } else {
              // Move completed matches to the end
              return 1;
            }
          })
          .map((match) => (
            <MatchCard key={match.id} match={match} sport={sport} />
          ))}
      </div>

    </div>
  );
};

export default SportsbookGames;
