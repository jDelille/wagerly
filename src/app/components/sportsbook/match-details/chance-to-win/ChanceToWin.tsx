'use client';

import { Chance } from '@/app/types/Match';
import styles from './ChanceToWin.module.scss';

type Props = {
 chance: Chance

}

const ChanceToWin: React.FC<Props> = ({ chance, }) => {

 const projectedLeftWinner = chance.lines[0].stat1Value > chance.lines[0].stat2Value;

 console.log(projectedLeftWinner)

 return (
  <div className={styles.chanceToWin}>
   <strong className={styles.title}>{chance.title}</strong>
   <p className={styles.description}>{chance.description}</p>
   <div className={styles.chance}>
    <div className={styles.team} >
     <strong className={projectedLeftWinner ? styles.winner : ''}>{chance.lines[0].stat1Value}</strong>
     <span className={projectedLeftWinner ? styles.winner : ''}>{chance.lines[0].stat1Subtext}</span>
    </div>
    <div className={styles.team} >
     <strong className={!projectedLeftWinner ? styles.winner : ''}>{chance.lines[0].stat2Value}</strong>
     <span className={!projectedLeftWinner ? styles.winner : ''}>{chance.lines[0].stat2Subtext}</span>
    </div>
   </div>
  </div>
 );
}

export default ChanceToWin;