'use client'
import { Post } from '@prisma/client';

import styles from './PostFeed.module.scss';
import PostCard from '../post-card/PostCard';
import PostFeedHeader from './post-feed-header/PostFeedHeader';

type Props = {
 posts: any;
 isProfilePage: boolean;
}

const PostFeed: React.FC<Props> = ({ posts, isProfilePage }) => {
 return (
  <div className={styles.postFeed}>
   <PostFeedHeader isProfilePage={isProfilePage} />
   {posts.map((post: Post) => (
    <PostCard key={post.id} post={post} isExpanded={false} />
   ))}

  </div>
 );
}

export default PostFeed;