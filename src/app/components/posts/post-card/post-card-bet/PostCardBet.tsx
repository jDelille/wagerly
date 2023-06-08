'use client';

import styles from './PostCardBet.module.scss';

type Props = {
 post: any;
}

const PostCardBet: React.FC<Props> = ({ post: bet }) => {

 return (
  <div className={styles.betContainer}>

   <div className={styles.bet}>
    <strong>{bet[0].abbreviation} {bet[0].team}</strong>
    <div className={styles.type}>
     {bet[0].type} {bet[0].value}
    </div>
    <span>{bet[0].name}</span>
    <p className={styles.odds}>{bet[0].odds}</p>
   </div>

   <div className={styles.disclaimer}>
    <p>Odds shown are at time of post and are subject to change.</p>
   </div>
  </div>
 );
}

export default PostCardBet;