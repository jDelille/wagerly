'use client';

import PostCard from '@/app/components/posts/post-card/PostCard';
import { SafeUser } from '@/app/types/SafeUser';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import { useIntersection } from '@mantine/hooks';
import { Post } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRef, useEffect } from 'react';

type Props = {
 initialPosts: any;
 currentUser: SafeUser | null;
};

const PostFeed: React.FC<Props> = ({ initialPosts, currentUser }) => {
 const lastPostRef = useRef<HTMLElement>(null);

 const { ref, entry } = useIntersection({
  root: lastPostRef.current,
  threshold: 1,
 });

 const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
  ['query'],
  async ({ pageParam = 1 }) => {
   const query = `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`;

   const { data } = await axios.get(query);
   return data as any;
  },
  {
   getNextPageParam: (_, pages) => {
    return pages.length + 1;
   },
   initialData: {
    pages: [initialPosts],
    pageParams: [1],
   },
  }
 );

 useEffect(() => {
  if (entry?.isIntersecting) {
   fetchNextPage();
  }
 }, [entry, fetchNextPage]);

 const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

 return (
  <ul>
   {posts.map((post: Post, index: number) => {
    if (index === posts.length - 1) {
     return (
      <li key={post.id} ref={ref}>
       <PostCard
        post={post}
        key={post?.id}
        currentUser={currentUser}
        isExpanded={false}
       />
      </li>
     );
    } else {
     return (
      <li key={post.id}>
       <PostCard
        post={post}
        key={post?.id}
        currentUser={currentUser}
        isExpanded={false}
       />
      </li>
     );
    }
   })}
  </ul>
 );
};

export default PostFeed;
