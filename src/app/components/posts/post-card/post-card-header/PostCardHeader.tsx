'use client';

import { User } from '@prisma/client';

import styles from './PostCardHeader.module.scss';
import Avatar from '@/app/components/user/Avatar/Avatar';

type Props = {
 user: User;
};

const PostCardHeader: React.FC<Props> = ({ user }) => {
 return (
  <div className={styles.postCardHeader}>
   <Avatar
    photo={user.photo || '/images/placeholder.png'}
    username={user.username}
   />
   <div className={styles.displayName}>
    <strong>{user.name}</strong>
    <span>@{user.username}</span>
   </div>
  </div>
 );
};

export default PostCardHeader;
