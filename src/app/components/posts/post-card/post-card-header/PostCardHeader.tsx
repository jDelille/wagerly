'use client';

import { User } from '@prisma/client';

import styles from './PostCardHeader.module.scss';
import Avatar from '@/app/components/user/Avatar/Avatar';
import { createdAtFormatter } from '@/app/utils/dateUtils';
import { useMemo } from 'react';

type Props = {
 user: User;
 createdAt: string;
};

const PostCardHeader: React.FC<Props> = ({ user, createdAt }) => {

 const postCreationDate = useMemo(() => {
  return createdAtFormatter(createdAt);
 }, [createdAt]);

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
   <p className={styles.createdAt}>{postCreationDate}</p>
  </div>
 );
};

export default PostCardHeader;
