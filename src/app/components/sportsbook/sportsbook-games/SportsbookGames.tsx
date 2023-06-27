'use client';

import { getScores } from '@/app/api/sportsbookData';
import matchStore from '@/app/store/matchStore';
import { Game } from '@/app/types/Game';
import { useEffect, useState } from 'react';

import MatchCard from '../match-card/MatchCard';
import SportSelector from '../sport-selector/SportSelector';
import styles from './SportsbookGames.module.scss';
import { observer } from 'mobx-react';

type Date = {
  date: string;
  id: string;
}

const SportsbookGames = observer(() => {
  const [matches, setMatches] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const league = matchStore.league
  const sport = matchStore.sport

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
  }, [league, sport]);

  return (
    <div className={styles.sportsBookGames}>
      <SportSelector
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
});

export default SportsbookGames;
