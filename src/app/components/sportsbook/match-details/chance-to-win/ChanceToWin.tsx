'use client';

import styles from './ChanceToWin.module.scss';

type Props = {

 homeName: string;
 awayName: string;
 homeChance: string;
 awayChance: string;
}

const ChanceToWin: React.FC<Props> = ({ homeName, awayName, homeChance, awayChance }) => {

 const homeWinPercentage = Number(homeChance)
 const awayWinPercentage = Number(awayChance)

 const projectedHomeWinner = homeWinPercentage > awayWinPercentage;

 return (
  <div className={styles.chanceToWin}>
   <strong className={styles.title}>Chance to win</strong>
   <div className={styles.chance}>
    <div className={styles.team} >
     <strong className={projectedHomeWinner ? styles.winner : ''}>{awayChance}%</strong>
     <span className={projectedHomeWinner ? styles.winner : ''}>{awayName}</span>
    </div>
    <div className={styles.team} >
     <strong className={!projectedHomeWinner ? styles.winner : ''}>{homeChance}%</strong>
     <span className={!projectedHomeWinner ? styles.winner : ''}>{homeName}</span>
    </div>
   </div>
  </div>
 );
}

export default ChanceToWin;