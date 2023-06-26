'use client'

import styles from './LastFiveGames.module.scss';

type Props = {
 lastFiveGames: any;
}

const LastFiveGames: React.FC<Props> = ({ lastFiveGames }) => {

 const home = lastFiveGames?.[0].team
 const homeEvents = lastFiveGames?.[0].events
 const awayEvents = lastFiveGames?.[1].events

 const homeTeam = {
  abbreviation: home?.abbreviation,
  displayName: home?.displayName,
  logo: home?.logo
 }

 return (
  <div className={styles.lastFiveGames}>
   <strong className={styles.title}>{homeTeam.displayName} Last Five Games</strong>
   <div className={styles.games}>
    {homeEvents?.map((event: any) => (
     <div key={event.id} className={styles.event}>
      <div className={styles.displayName}>
       <strong>{event.atVs}</strong>
       <p>{event.opponent.displayName}</p>
      </div>
      <div className={styles.result}>
       <strong className={styles.winLoss}>{event.gameResult}</strong>
       <strong>{event.score}</strong>
      </div>

     </div>
    ))}
   </div>
   <strong className={styles.title}>away team Last Five Games</strong>
   <div className={styles.games}>
    {awayEvents?.map((event: any) => (
     <div key={event.id} className={styles.event}>
      <div className={styles.displayName}>
       <strong>{event.atVs}</strong>
       <p>{event.opponent.displayName}</p>
      </div>
      <div className={styles.result}>
       <strong className={styles.winLoss}>{event.gameResult}</strong>
       <strong>{event.score}</strong>
      </div>

     </div>
    ))}
   </div>
  </div>
 );
}

export default LastFiveGames;