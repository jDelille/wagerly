'use client';

import { useEffect, useRef, useState } from 'react';
import { Match } from '@/app/types/Match';
import { getTopGames } from '@/app/api/sportsbookData';
import GameCard from './game-card/GameCard';


import styles from './Gamebar.module.scss';
import { FaChevronRight } from 'react-icons/fa';

const Gamebar: React.FC = () => {

 const [matches, setMatches] = useState<Match[]>([]);
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

 useEffect(() => {
  async function fetchData() {
   try {
    setIsLoading(true);
    const delay = 0;
    setTimeout(async () => {
     const matches = await getTopGames();
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
 }, []);

 console.log(matches)

 return (
  <div className={styles.gamebarWrapper}>
   <div className={styles.gamebar} ref={gameScrollerRef} >
    <div className={styles.content} >
     {matches.map((match) => (
      <GameCard key={match.id} match={match} />
     ))}
    </div>

   </div>
   <div className={styles.scroller} onClick={() => scrollContainer(150)}  >
    <FaChevronRight size={30} color='white' />
   </div>
  </div>

 );
}

export default Gamebar;