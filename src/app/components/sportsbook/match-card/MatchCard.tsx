'use client';

import Image from 'next/image';
import Link from 'next/link';
import matchStore from '@/app/store/matchStore';
import { Match } from '@/app/types/Match';

import styles from './MatchCard.module.scss';

type Props = {
 match: Match;
 sport: string;
};

const MatchCard: React.FC<Props> = ({ match, sport }) => {
 const lowerTeam = {
  name: match.lowerTeam.name,
  longName: match.lowerTeam.longName,
  record: match.lowerTeam.record,
  score: match.lowerTeam.score,
  imageAltText: match.lowerTeam.imageAltText,
  logoUrl: match.lowerTeam.logoUrl,
  id: match.lowerTeam.id,
 };

 const upperTeam = {
  name: match.upperTeam.name,
  longName: match.upperTeam.longName,
  record: match.upperTeam.record,
  score: match.upperTeam.score,
  imageAltText: match.upperTeam.imageAltText,
  logoUrl: match.upperTeam.logoUrl,
  id: match.upperTeam.id,
 };

 const setMatchStoreData = () => {
  matchStore.setHomeTeamId(lowerTeam.id);
  matchStore.setAwayTeamId(upperTeam.id);
 };

 console.log(match)

 const league = matchStore.league;


 const formattedTime = new Date(match.eventTime).toLocaleTimeString([], { hour: "numeric", minute: "numeric" });


 return (
  <div className={styles.match}>
   <Link
    href={`/sportsbook/${match.id}`}
    onClick={() => setMatchStoreData()}
    className={styles.content}>
    <div className={styles.lowerTeam}>
     <Image
      src={lowerTeam.logoUrl}
      alt={lowerTeam.imageAltText}
      width={20}
      height={20}
     />
     <strong>{lowerTeam.longName}</strong>
     <span>{lowerTeam.record}</span>
     <strong className={styles.score}>{lowerTeam.score || 0}</strong>
    </div>
    <div className={styles.upperTeam}>
     <Image
      src={upperTeam.logoUrl}
      alt={upperTeam.imageAltText}
      width={20}
      height={20}
     />
     <strong>{upperTeam.longName}</strong>
     <span>{upperTeam.record}</span>
     <strong className={styles.score}>{upperTeam.score || 0}</strong>
    </div>

    <div className={styles.status}>
     <span>{formattedTime}</span>
    </div>
   </Link>
  </div>
 );
};

export default MatchCard;
