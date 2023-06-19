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
 bets: any;
 currentUser: SafeUser | null
}

const BetFeed: React.FC<Props> = ({ bets, currentUser }) => {


 return (
  <ul>
   {bets.map((post: any, index: number) => {
    <li key={post.id} >
     <PostCard
      post={post}
      currentUser={currentUser}
      isExpanded={false}
     />
    </li>
   })}
  </ul>
 )
}

export default BetFeed