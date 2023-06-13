'use client';

import Image from 'next/image';
import styles from './PostCardBet.module.scss';

type Props = {
 post: any;
}


const PostCardBet: React.FC<Props> = ({ post: bet }) => {

 return (
  <div className={styles.betContainer}>
   <div className={styles.bet}>
    <div className={styles.displayName}>
     <Image src={bet.logo} alt='logo' width={20} height={20} />
     <strong>{bet.name}</strong>
    </div>
    <div className={styles.type}>
     <span>{bet.type}</span>
     <strong>{bet.bet}</strong>
    </div>
    <div className={styles.matchup}>
     <span>{bet.matchup}</span>
    </div>
    <div className={styles.wager}>
     <span>Wagered: <strong>${bet.wager}</strong></span>
     <span>Payout: <strong>${bet.payout}</strong></span>
    </div>

    <p className={styles.odds}>
     {bet.odds}
    </p>
    <span className={styles.description}>{bet.description}</span>
   </div>

   <div className={styles.disclaimer}>
    <p>Odds shown are at time of post and are subject to change.</p>
   </div>
  </div>
 );
}

export default PostCardBet;