'use client'

import { Bet } from '@prisma/client';
import { useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'

import styles from './PostCardParlay.module.scss';

type Props = {
 post: any;
 odds: number;
 wager: number
 payout: number;
 isExpanded: boolean;
}

const PostCardParlay: React.FC<Props> = ({ post, odds, wager, payout, isExpanded }) => {

 const [showPicks, setShowPicks] = useState(false)

 return (
  <div className={styles.parlayContainer} >

   <div className={styles.header}>
    <strong className={styles.title}>
     {post.length < 2 ? 'Single' : 'Parlay'} ({post.length} Pick)
    </strong>
    <div className={styles.odds}>{odds}</div>
    <div className={styles.viewPicks} onClick={(e) => { setShowPicks(!showPicks); e.stopPropagation() }}>
     <p>{!showPicks ? (
      <>
       View Picks <AiOutlineDown size={12} />
      </>
     ) : (
      <>
       View Picks <AiOutlineUp />
      </>
     )}</p>
    </div>
   </div>
   <div className={styles.showPicks}>
    {showPicks && (
     post.map((bet: Bet) => (
      <div className={styles.bet} key={bet.id}>
       <div className={styles.dot}></div>
       <div className={styles.line}></div>
       <div className={styles.team}>
        <p>{bet.abbreviation} {bet.team}</p>
        <p className={styles.odds}>{bet.odds}</p>
       </div>
       <div className={styles.type}>
        {bet.type} {bet.value}
       </div>
       <div className={styles.name}>
        {bet.name}
       </div>
      </div>
     ))

    )}
   </div>

   <div className={styles.disclaimer}>
    <p>Odds shown are at time of post and are subject to change.</p>
   </div>

  </div>
 );
}

export default PostCardParlay;