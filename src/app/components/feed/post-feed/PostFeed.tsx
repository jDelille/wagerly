'use client';

import { Post } from '@prisma/client';
import { SafeUser } from '@/app/types/SafeUser';
import PostCard from '@/app/components/posts/post-card/PostCard';

type Props = {
 posts: any;
 currentUser: SafeUser | null;

};

const PostFeed: React.FC<Props> = ({
 posts,
 currentUser,
}) => {
 return (
  <ul>
   {posts.map((post: Post, index: number) => (
    <li key={index} >
     <PostCard
      post={post}
      key={post?.id}
      currentUser={currentUser}
      isExpanded={false}
     />
    </li>
   )
   )}
  </ul>
 );
};

export default PostFeed;
