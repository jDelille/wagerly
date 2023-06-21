'use client';

import { useEffect, useRef } from 'react';
import { Post } from '@prisma/client';
import { SafeUser } from '@/app/types/SafeUser';
import PostCard from '@/app/components/posts/post-card/PostCard';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import axios from 'axios';
import PostSkeleton from '../../skeleton/post-skeleton/PostSkeleton';

type Props = {
 posts: any;
 currentUser: SafeUser | null;
 blockedUsers: string[];

};

const PostFeed: React.FC<Props> = ({
 posts,
 currentUser,
 blockedUsers

}) => {


 return (
  <ul>
   {posts.map((post: Post, index: number) => {
    if (!blockedUsers?.includes(post.userId)) {
     return (
      <li key={index} >
       <PostCard
        post={post}
        key={post?.id}
        currentUser={currentUser}
        isExpanded={false}
       />
      </li>
     )
    }
   })}
  </ul>
 );
};

export default PostFeed;
