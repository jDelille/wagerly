'use client'
import { Post } from '@prisma/client';

import styles from './PostFeed.module.scss';
import PostCard from '../post-card/PostCard';
import PostFeedHeader from './post-feed-header/PostFeedHeader';

type Props = {
 posts: any;
}

const PostFeed: React.FC<Props> = ({ posts }) => {
 return (
  <div className={styles.postFeed}>
   <PostFeedHeader />
   {posts.map((post: Post) => (
    <PostCard key={post.id} post={post} />
   ))}

  </div>
 );
}

export default PostFeed;