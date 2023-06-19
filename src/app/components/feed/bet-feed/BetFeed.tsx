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
 initialBets: any;
 currentUser: SafeUser | null
}

const BetFeed: React.FC<Props> = ({ initialBets, currentUser }) => {
 const lastPostRef = useRef<HTMLElement>(null);

 const { ref, entry } = useIntersection({
  root: lastPostRef.current,
  threshold: 1,
 });


 const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
  ['infinite-query'],
  async ({ pageParam = 1 }) => {
   const query = `/api/bets?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`;

   const { data } = await axios.get(query);
   return data as any;
  },
  {
   getNextPageParam: (_, pages) => {
    return pages.length + 1;
   },
   initialData: {
    pages: [initialBets],
    pageParams: [1],
   },
  }
 );

 useEffect(() => {
  if (entry?.isIntersecting) {
   fetchNextPage();
  }
 }, [entry, fetchNextPage]);

 const posts = data?.pages.flatMap((page) => page) ?? initialBets;

 return (
  <ul>
   {posts.map((post: any, index: number) => {
    if (index === posts.length - 1) {
     return (
      <li key={post.id} ref={ref}>
       <PostCard
        post={post}
        currentUser={currentUser}
        isExpanded={false}
       />
      </li>
     )
    } else {
     return (
      <PostCard
       post={post}
       key={post.id}
       currentUser={currentUser}
       isExpanded={false}
      />
     )
    }
   })}

   {isFetchingNextPage && (
    <li>
     <PostSkeleton />
    </li>
   )}
  </ul>
 )
}

export default BetFeed