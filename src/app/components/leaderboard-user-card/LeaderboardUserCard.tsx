'use client';

import { faCrown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Avatar from '../user/Avatar/Avatar';
import { User } from '@prisma/client';

import styles from './LeaderboardUserCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
 user: User,
 i: number;
}

const LeaderboardUserCard: React.FC<Props> = ({ user, i }) => {
 return (
  <Link href={`/user/${user.username}`} key={user.id} className={styles.userCard}>
   <span className={styles.placement}>{i + 1}</span>
   <div className={styles.user}>
    <Avatar photo={user.photo || '/images/placeholder.png'} />
    <div className={styles.displayName}>
     <strong>{user.name} {i === 0 && <FontAwesomeIcon icon={faCrown} color="#eac100" />}</strong>
     <span>@{user.username}</span>
    </div>

   </div>
   <div className={styles.points}>{user.earnings && user.earnings.toFixed(2) || 0}</div>
   <div className={styles.wins}>{user.wins}</div>
   <div className={styles.losses}>{user.losses}</div>
  </Link>
 );
}

export default LeaderboardUserCard;