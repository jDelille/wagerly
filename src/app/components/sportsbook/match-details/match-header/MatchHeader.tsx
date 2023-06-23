'use client'

import Image from 'next/image';
import styles from './MatchHeader.module.scss';
import { MatchHeader } from '@/app/types/Match';

type Props = {
 matchHeader: any;
 formattedDate: string;
 header: MatchHeader
}

const Header: React.FC<Props> = ({ matchHeader, formattedDate, header }) => {

 return (
  <div className={styles.header}>
   <div className={styles.matchup}>
    <strong>{matchHeader.leftTeam.longName} vs {matchHeader.rightTeam.longName}</strong>
    <div className={styles.logos}>
     <Image
      src={matchHeader.leftTeam.logo as string}
      alt={matchHeader.leftTeam.imageAltText as string}
      width={40}
      height={40}
     />
     <Image
      src={matchHeader.rightTeam.logo as string}
      alt={matchHeader.rightTeam.imageAltText as string}
      width={40}
      height={40}
     />
    </div>
   </div>
   <div className={styles.date}>
    <span>{formattedDate}</span>
   </div>

   <div className={styles.matchInfo}>
    <Image
     src={header?.sportLogoUrl as string}
     alt='sport logo url'
     width={30}
     height={30}
    />
    <div className={styles.venue}>
     <span>{header?.venueName} {header?.venueLocation}</span>
    </div>
   </div>
  </div>
 );
}

export default Header;