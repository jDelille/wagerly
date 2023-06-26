'use client'

import Image from 'next/image';

import styles from './MatchHeader.module.scss';

type Props = {
 matchHeader: any;
 formattedDate?: string;
}

const Header: React.FC<Props> = ({ matchHeader, formattedDate, }) => {

 return (
  <div className={styles.header}>
   <div className={styles.matchup}>
    <strong>{matchHeader.homeTeam.name} vs {matchHeader.awayTeam.name}</strong>
    <div className={styles.logos}>
     <Image
      src={matchHeader.homeTeam.logo as string}
      alt={'logo'}
      width={40}
      height={40}
     />
     <Image
      src={matchHeader.awayTeam.logo as string}
      alt={'logo'}
      width={40}
      height={40}
     />
    </div>
   </div>
   <div className={styles.date}>
    <span>{formattedDate}</span>
   </div>

   <div className={styles.matchInfo}>
    <div className={styles.venue}>
     <span>{matchHeader?.venue} {matchHeader.city}, {matchHeader.state}</span>
    </div>

   </div>
  </div>
 );
}

export default Header;