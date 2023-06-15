'use client';

import { Comment } from '@prisma/client';
import styles from './PostCardComments.module.scss';
import Avatar from '@/app/components/user/Avatar/Avatar';
import PostCardFooter from '../../post-card-footer/PostCardFooter';
import { SafeUser } from '@/app/types/SafeUser';

type Props = {
 comment: Comment;
 postUsername: string;
 post: any;
 postId: string;
 currentUser: SafeUser | null;
}


const PostCardComment: React.FC<Props> = ({ comment, postUsername, post, postId, currentUser }) => {
 return (
  <div className={styles.postCardComment}>
   <div className={styles.header}>
    <div className={styles.avatar}>
     <div className={styles.line}></div>
     <Avatar photo={comment.photo || '/images/placeholder.png'} username={comment.username} />
    </div>

    <div className={styles.displayName}>
     <strong>{comment.name}</strong>
     <span>@{comment.username}</span>
    </div>
   </div>
   <div className={styles.body}>
    <p><span>@{postUsername}</span>{comment.body}</p>
   </div>
   {/* <div className={styles.footer}>
    <PostCardFooter postId={postId} post={post} currentUser={currentUser} />
   </div> */}

  </div>
 );
}

export default PostCardComment;