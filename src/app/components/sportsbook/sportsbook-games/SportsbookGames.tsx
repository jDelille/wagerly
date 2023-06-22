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
          const matches = await getGames(league, apiDate || formattedDate);
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

  console.log(dates)

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
        {dates?.map((date) => (
          <span
            key={date.id}
            onClick={() => setApiDate(date.id)}
            className={apiDate === date.id ? styles.activeDate : ""}
          >{formatDate(date.id)}</span>
        ))}
      </div>
      <div className={`${styles.feed} ${isLoading ? styles.loading : styles.loaded}`}>
        {matches
          .sort((a, b) => {
            // Check if matches have finished
            const aFinished = a.statusLine === "FINAL";
            const bFinished = b.statusLine === "FINAL";

            if (aFinished && !bFinished) {
              return 1; // Move a to the end
            }
            if (!aFinished && bFinished) {
              return -1; // Move b to the end
            }

            // Check if matches are in progress
            const aInProgress = a.eventStatus === 1; // Assuming 1 represents "in progress" status
            const bInProgress = b.eventStatus === 1;

            if (aInProgress && !bInProgress) {
              return -1; // Move a to the top
            }
            if (!aInProgress && bInProgress) {
              return 1; // Move b to the top
            }

            // Sort scheduled matches by time
            return new Date(a.eventTime).getTime() - new Date(b.eventTime).getTime();
          })
          .map((match, i) => (
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
