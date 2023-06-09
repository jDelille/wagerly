'use client';

import { Comment } from '@prisma/client';
import styles from './PostCardComments.module.scss';
import PostCardComment from './post-card-comment/PostCardComment';
import { SafeUser } from '@/app/types/SafeUser';

type Props = {
 post: any;
 currentUser: SafeUser | null;
}

const PostCardComments: React.FC<Props> = ({ post, currentUser }) => {

 const comments = post.comments

 return (
  <div className={styles.postCardComments}>
   {comments.map((comment: Comment) => (
    <PostCardComment key={comment.id} comment={comment} postUsername={post.user.username} post={post} postId={post.id} currentUser={currentUser} />
   ))}
  </div>
 );
}

export default PostCardComments;