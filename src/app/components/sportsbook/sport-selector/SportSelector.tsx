'use client';

import matchStore from '@/app/store/matchStore';

import styles from './SportSelector.module.scss';

type Props = {
 setSport: (value: string) => void;
 sport: string;
}

const SportSelector: React.FC<Props> = ({ setSport, sport }) => {

 return (
  <div className={styles.selector}>
   <p className={sport === 'baseball' ? styles.selectedSport : styles.sport} onClick={() => { setSport('baseball'); matchStore.setLeague('mlb') }}>
    Baseball
   </p>
   {/* <p className={sport === 'soccer' ? styles.selectedSport : styles.sport} onClick={() => { setSport('soccer'); matchStore.setLeague('mls') }}>
    Soccer
   </p> */}
   {/* <p className={sport === 'basketball' ? styles.selectedSport : styles.sport}
    onClick={() => { setSport('basketball'); matchStore.setLeague('nba') }}>
    Basketball
   </p> */}
   {/* <p className={sport === 'football' ? styles.selectedSport : styles.sport} onClick={() => { setSport('football'); matchStore.setLeague('nfl') }}>
    Football
   </p>
   <p className={sport === 'hockey' ? styles.selectedSport : styles.sport} onClick={() => { setSport('hockey'); matchStore.setLeague('nhl') }}>
    Hockey
   </p>
    */}
  </div>
 );
}

export default SportSelector;