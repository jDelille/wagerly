'use client';

import { Match } from '@/app/types/Match';
import styles from './GameCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import matchStore from '@/app/store/matchStore';

type Props = {
 match: Match;
};

const GameCard: React.FC<Props> = ({ match }) => {

 const isScheduled = match.eventStatus === 2;

 const formattedTime = new Date(match.eventTime).toLocaleTimeString([], { hour: "numeric", minute: "numeric" });

 return (
  <Link
   href={`/sportsbook/${match.id}`}
   onClick={() => matchStore.setLeague(match.league.toLowerCase())}
   className={styles.gameCard}>
   <div className={styles.league}>
    <span>{match.league}</span>
   </div>
   <div className={styles.content}>
    <div className={styles.displayName}>
     <div className={styles.upper}>
      <Image
       src={match.upperTeam.logoUrl}
       alt={match.upperTeam.imageAltText}
       width={16}
       height={16}
      />
      <strong>{match.upperTeam.name}</strong>
     </div>
     <div className={styles.lower}>
      <Image
       src={match.lowerTeam.logoUrl}
       alt={match.lowerTeam.imageAltText}
       width={16}
       height={16}
      />
      <strong>{match.lowerTeam.name}</strong>

     </div>
    </div>
    <div className={styles.info}>
     {isScheduled ? (
      <>
       <span>{formattedTime}</span>
       <span className={styles.station}>{match.tvStation}</span>
      </>
     ) : (
      <>
       <strong className={styles.score}>{match.upperTeam.score || 0}</strong>
       <strong className={styles.score}>{match.lowerTeam.score || 0}</strong>
      </>

     )}

    </div>
   </div >




   <div className={styles.status}>
    {isScheduled ? (
     <>
      <div className={styles.preStatus}>
       <span>{match.oddsLine}</span>
       <span>{match.overUnderLine}</span>
      </div>
     </>
    ) : (
     <span>{match.statusLine}</span>
    )}

   </div>
  </Link >
 );
};

export default GameCard;
