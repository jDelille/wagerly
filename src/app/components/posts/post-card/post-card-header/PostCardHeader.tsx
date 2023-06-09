'use client';

import Avatar from '@/app/components/user/Avatar/Avatar';
import { SafeUser } from '@/app/types/SafeUser';
import { createdAtFormatter } from '@/app/utils/dateUtils';
import { User } from '@prisma/client';
import { useMemo, useState } from 'react';
import { AiFillPushpin } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';

import PostCardMenu from '../post-card-menu/PostCardMenu';
import styles from './PostCardHeader.module.scss';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
 post: any;
 currentUser: SafeUser | null;
};

const PostCardHeader: React.FC<Props> = ({ post, currentUser }) => {
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const postCreationDate = useMemo(() => {
  return createdAtFormatter(post.createdAt);
 }, [post.createdAt]);

 const user: User = post.user;

 const isRetweeted = post.retweetedFromUsername;

 return (
  <div className={styles.postCardHeader}>
   {isRetweeted && (
    <span className={styles.retweetLabel}>
     <FontAwesomeIcon icon={faRetweet} color='#606984' />
     {isRetweeted} Reposted
    </span>
   )}
   <div className={styles.headerContent}>
    <Avatar
     photo={user.photo || '/images/placeholder.png'}
     username={user.username}
    />
    <div className={styles.displayName}>
     <strong>{user.name}</strong>
     <span>@{user.username}</span>
    </div>
    <div className={styles.menu}>
     {post.isPinned && <AiFillPushpin size={14} />}

     <p className={styles.createdAt}>{postCreationDate}</p>
     <BsThreeDotsVertical onClick={() => setIsMenuOpen(!isMenuOpen)} />
     {isMenuOpen && (
      <PostCardMenu
       setIsMenuOpen={setIsMenuOpen}
       currentUser={currentUser}
       post={post}
      />
     )}
    </div>
   </div>
  </div>
 );
};

export default PostCardHeader;
