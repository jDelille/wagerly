'use client';

import matchStore from '@/app/store/matchStore';
import { Game } from '@/app/types/Game';
import { observer } from 'mobx-react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './MatchCard.module.scss';

type Props = {
 match: Game;
 sport: string;
};

const MatchCard: React.FC<Props> = observer(({ match, sport }) => {
 const lowerTeam = {
  name: match.competitions[0].competitors[0].team.name,
  longName: match.competitions[0].competitors[0].team.name,
  record: match.competitions[0].competitors[0].records?.[0].summary,
  score: match.competitions[0].competitors[0].score,
  imageAltText: 'logo',
  logoUrl: match.competitions[0].competitors[0].team.logo,
  id: match.competitions[0].competitors[0].team.id,
  abbrv: match.competitions[0].competitors[0].team.abbreviation
 };

 const upperTeam = {
  name: match.competitions[0].competitors[1].team.name,
  longName: match.competitions[0].competitors[1].team.name,
  record: match.competitions[0].competitors[1].records?.[0].summary,
  score: match.competitions[0].competitors[1].score,
  imageAltText: 'logo',
  logoUrl: match.competitions[0].competitors[1].team.logo,
  id: match.competitions[0].competitors[1].team.id,
  abbrv: match.competitions[0].competitors[1].team.abbreviation
 };

 const setMatchStoreData = () => {
  matchStore.setHomeTeamId(lowerTeam.id);
  matchStore.setAwayTeamId(upperTeam.id);
 };


 const league = matchStore.league;

 const isNFL = league === 'nfl'


 const formattedTime = new Date(match.date).toLocaleTimeString([], { hour: "numeric", minute: "numeric" });

 const inProgress = match.status.type.state === 'in'
 const isScheduled = match.status.type.state === 'pre'
 const hasEnded = match.status.type.state === 'post'

 const tvStation = match.competitions[0].geoBroadcasts[0]?.media.shortName

 const statusLine = match.status.type.shortDetail

 const awaySpreadOdds = match.competitions[0].odds?.[1]?.awayTeamOdds.spreadOdds || null;
 const homeSpreadOdds = match.competitions[0].odds?.[1]?.homeTeamOdds.spreadOdds || null;


 return (
  <div className={styles.match} onClick={setMatchStoreData}>
   <Link
    href={`/sportsbook/${match.id}`}
    className={styles.content}>
    <div className={styles.leftSide}>
     <div className={styles.lowerTeam}>
      <Image
       src={lowerTeam.logoUrl}
       alt={lowerTeam.imageAltText}
       width={20}
       height={20}
      />
      <strong>{lowerTeam.longName}</strong>
      <span>{lowerTeam.record}</span>
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
     </div>

     {(hasEnded || inProgress) && (
      <span className={styles.statusLine}>{statusLine}</span>
     )}
     {isScheduled && !isNFL && (
      <div className={styles.statusLine}>
       <span>{upperTeam.abbrv} {awaySpreadOdds}</span>
       <span>{lowerTeam.abbrv} {homeSpreadOdds}</span>
      </div>
     )}

     {isScheduled && isNFL && (
      <span className={styles.statusLine}>{statusLine}</span>
     )}
    </div>


    <div className={styles.rightSide}>

     {(inProgress || hasEnded) && (
      <>
       <strong className={styles.score}>{lowerTeam.score || 0}</strong>
       <strong className={styles.score}>{upperTeam.score || 0}</strong>
       <span className={styles.time}>{tvStation || 'ESPN+'}</span>

      </>
     )}

     {isScheduled && (
      <div className={styles.info}>
       <span>{formattedTime}</span>
       <span className={styles.station}>{tvStation || 'MLBN'}</span>
      </div>
     )}

    </div>
   </Link >
  </div >
 );
});

export default MatchCard;


