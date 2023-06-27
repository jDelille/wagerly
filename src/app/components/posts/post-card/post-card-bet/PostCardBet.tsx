'use client';

import Image from 'next/image';

import styles from './PostCardBet.module.scss';

type Props = {
 post: any;
}


const PostCardBet: React.FC<Props> = ({ post: Bet }) => {

 const { logo, name, type, bet, matchup, wager, payout, odds } = Bet

 const moneyline = type === 'To win'

 return (
  <div className={styles.betContainer}>
   <div className={styles.top}>
    <div className={styles.bet}>
     <div className={styles.logo}>
      <Image src={logo} alt='logo' width={28} height={28} style={{ objectFit: 'contain' }} />
     </div>
     <div className={styles.betInfo}>
      <strong>{name} &bull; {type}</strong>
      <span>{matchup}</span>
     </div>
    </div>
    <div className={styles.odds}>
     <strong>{moneyline ? 'ML' : bet}</strong>
     <span>{odds}</span>
    </div>
   </div>

   <div className={styles.bottom}>
    <div className={styles.wager}>
     <span>Wagered ${wager}</span>
    </div>
    <div className={styles.payout}>
     <span>Net Payout ${payout}</span>
    </div>
   </div>


   {/* <div className={styles.disclaimer}>
    <p>Odds shown are at time of post and are subject to change.</p>
   </div> */}
  </div>
 );
}

export default PostCardBet;