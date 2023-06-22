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
 return (
  <Link
   href={`/sportsbook/${match.id}`}
   onClick={() => matchStore.setLeague(match.league.toLowerCase())}
   className={styles.gameCard}>
   <div className={styles.league}>
    <span>{match.league}</span>
   </div>
   <div className={styles.upper}>
    <Image
     src={match.upperTeam.logoUrl}
     alt={match.upperTeam.imageAltText}
     width={16}
     height={16}
    />
    <strong>{match.upperTeam.name}</strong>
    <strong className={styles.score}>{match.upperTeam.score || 0}</strong>
   </div>
   <div className={styles.lower}>
    <Image
     src={match.lowerTeam.logoUrl}
     alt={match.lowerTeam.imageAltText}
     width={16}
     height={16}
    />
    <strong>{match.lowerTeam.name}</strong>
    <strong className={styles.score}>{match.lowerTeam.score || 0}</strong>
   </div>
   <div className={styles.status}>
    <span>{match.statusLine}</span>
   </div>
  </Link>
 );
};

export default GameCard;
