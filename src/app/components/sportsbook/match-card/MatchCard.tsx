'use client';

import { Game } from '@/app/types/Game';

import styles from './MatchCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import matchStore from '@/app/store/matchStore';


type Props = {
 game: Game;
 sport: string;
 league: string;
}

const MatchCard: React.FC<Props> = ({ game, sport, league }) => {

 return (
  <Link href={`/sportsbook/${game.id}`} className={styles.match}
   onClick={() => { matchStore.setHomeTeamId(game.competitions[0].competitors[0].id); matchStore.setAwayTeamId(game.competitions[0].competitors[1].id) }}
  >
   <div className={styles.status}>
    <p>{game.status.type.shortDetail}</p>
   </div>
   <div className={styles.teams}>
    <div className={styles.team}>
     {game.competitions.map((team) => (
      <div key={team.id} className={styles.home}>
       <strong>{team.competitors[0].team.name}</strong>
       <Image src={team.competitors[0].team.logo} width={25} height={25} alt='logo' />
      </div>

     ))}
    </div>
    <strong>vs</strong>
    <div className={styles.team}>
     {game.competitions.map((team) => (
      <div key={team.id} className={styles.away}>
       <Image src={team.competitors[1].team.logo} width={25} height={25} alt='logo' />
       <strong>{team.competitors[1].team.name}</strong>
      </div>
     ))}
    </div>

   </div>

  </Link>
 );
}

export default MatchCard;