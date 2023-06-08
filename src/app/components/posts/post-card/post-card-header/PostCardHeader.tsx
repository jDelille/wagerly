'use client';

import { User } from '@prisma/client';

import { useMemo, useState } from 'react';
import Avatar from '@/app/components/user/Avatar/Avatar';
import { createdAtFormatter } from '@/app/utils/dateUtils';
import { BsThreeDotsVertical } from 'react-icons/bs'

import styles from './PostCardHeader.module.scss';
import PostCardMenu from '../post-card-menu/PostCardMenu';


type Props = {
 user: User;
 createdAt: string;
 postId: string
};

const PostCardHeader: React.FC<Props> = ({ user, createdAt, postId }) => {

 const [isMenuOpen, setIsMenuOpen] = useState(false)


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
   <div className={styles.menu}>
    <p className={styles.createdAt}>{postCreationDate}</p>
    <BsThreeDotsVertical onClick={() => setIsMenuOpen(!isMenuOpen)} />
    {isMenuOpen && <PostCardMenu setIsMenuOpen={setIsMenuOpen} postId={postId} />}
   </div>
  </div>
 );
};

export default PostCardHeader;
