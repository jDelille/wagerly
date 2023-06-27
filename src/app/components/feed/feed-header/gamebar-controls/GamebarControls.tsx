'use client';

import matchStore from '@/app/store/matchStore';

import styles from './GamebarControls.module.scss';

const GamebarControls: React.FC = () => {
 const handleChooseSport = (sport: string, league: string) => {
  matchStore.setSport(sport);
  matchStore.setLeague(league);
 };

 return (
  <div className={styles.gamebarControls}>
   <span
    className={styles.option}
    onClick={() => handleChooseSport('baseball', 'mlb')}>
    MLB
   </span>
   <span className={styles.option}
    onClick={() => handleChooseSport('football', 'nfl')}>
    NFL</span>
   {/* <span className={styles.option}
    onClick={() => handleChooseSport('soccer', 'usa.1')}>
    MLS</span>
   <span className={styles.option}
    onClick={() => handleChooseSport('football', 'nfl')}>
    NFL</span>
   <span className={styles.option}

   >NBA</span>
   <span className={styles.option}>NHL</span> */}
  </div>
 );
};

export default GamebarControls;
