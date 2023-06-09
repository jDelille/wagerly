'use client';

import styles from './SportSelector.module.scss';

type Props = {
 setSport: (value: string) => void;
 setLeague: (value: string) => void;
 sport: string;
}

const SportSelector: React.FC<Props> = ({ setSport, setLeague, sport }) => {
 return (
  <div className={styles.selector}>
   <p className={sport === 'baseball' ? styles.selectedSport : styles.sport} onClick={() => { setSport('baseball'); setLeague('mlb') }}>
    Baseball
   </p>
   <p className={sport === 'basketball' ? styles.selectedSport : styles.sport}
    onClick={() => { setSport('basketball'); setLeague('nba') }}>
    Basketball
   </p>
   <p className={sport === 'football' ? styles.selectedSport : styles.sport} onClick={() => { setSport('football'); setLeague('nfl') }}>
    Football
   </p>
   <p className={sport === 'hockey' ? styles.selectedSport : styles.sport} onClick={() => { setSport('hockey'); setLeague('nhl') }}>
    Hockey
   </p>
   <p className={sport === 'soccer' ? styles.selectedSportHideOnMobile : styles.sportHideOnMobile} onClick={() => { setSport('soccer'); setLeague('usa.1') }}>
    Soccer
   </p>
  </div>
 );
}

export default SportSelector;