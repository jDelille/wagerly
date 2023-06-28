'use client';

import PostCard from '@/app/components/posts/post-card/PostCard';
import { SafeUser } from '@/app/types/SafeUser';
import { Post } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRef, useEffect } from 'react';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import { useIntersection } from '@mantine/hooks';

type Props = {
 initialBets: any;
 currentUser: SafeUser | null;
};

const BetFeed: React.FC<Props> = ({
 initialBets,
 currentUser,
}) => {

 const lastPostRef = useRef<HTMLElement>(null);

 const { ref, entry } = useIntersection({
  root: lastPostRef.current,
  threshold: 1,
 });

 const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
  ['query'],
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
   console.log('intersecting');
   fetchNextPage();
  }
 }, [entry, fetchNextPage]);

 const bets = data?.pages.flatMap((page) => page) ?? initialBets;

 return (
  <ul>
   {bets.map((post: Post, index: number) => {
    if (index === bets.length - 1) {
     return (
      <li key={index} ref={ref} >
       <PostCard
        post={post}
        key={post?.id}
        currentUser={currentUser}
        isExpanded={false}
       />
      </li>
     )
    } else {
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

export default BetFeed;
