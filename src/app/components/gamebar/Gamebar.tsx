'use client';

import { getTopGames } from '@/app/api/sportsbookData';
import matchStore from '@/app/store/matchStore';
import { Game } from '@/app/types/Game';
import { useEffect, useRef, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

import GameCard from './game-card/GameCard';
import styles from './Gamebar.module.scss';
import { observer } from 'mobx-react';

const Gamebar: React.FC = observer(() => {

 const [matches, setMatches] = useState<Game[]>([]);
 const [isLoading, setIsLoading] = useState(false);

 const gameScrollerRef = useRef<HTMLDivElement>(null);

 const scrollContainer = (scrollOffset: number) => {
  if (gameScrollerRef.current) {
   gameScrollerRef.current.scrollBy({
    left: scrollOffset,
    behavior: 'smooth',
   });
  }
 };

 const sport = matchStore.sport
 const league = matchStore.league

 useEffect(() => {
  async function fetchData() {
   try {
    setIsLoading(true);
    const delay = 0;
    setTimeout(async () => {
     const matches = await getTopGames(sport, league);
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

 console.log(matches)

 return (
  <div className={styles.gamebarWrapper}>
   <div className={styles.gamebar} ref={gameScrollerRef} >
    <div className={styles.content} >
     {matches.map((match) => {
      return (
       <GameCard key={match.id} match={match} />
      )
     })}
    </div>

   </div>
   <div className={styles.scroller} onClick={() => scrollContainer(150)}  >
    <FaChevronRight size={30} color='white' />
   </div>
  </div>

 );
})

export default Gamebar;