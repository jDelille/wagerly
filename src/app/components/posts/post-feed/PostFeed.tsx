'use client'
import { Post } from '@prisma/client';

import styles from './PostFeed.module.scss';
import PostCard from '../post-card/PostCard';
import PostFeedHeader from './post-feed-header/PostFeedHeader';
import searchStore from '@/app/store/searchStore';
import { observer } from 'mobx-react';
import { SafeUser } from '@/app/types/SafeUser';

type Props = {
 posts: any;
 isProfilePage: boolean;
 isSearchPage?: boolean;
 hideHeader?: boolean;
 isMainPage?: boolean;
 currentUser: SafeUser | null;
}

const PostFeed: React.FC<Props> = observer(({ posts, isProfilePage, isSearchPage, hideHeader, isMainPage, currentUser }) => {

 const storeSearch = searchStore.search


 return (
  <div className={styles.postFeed}>
   {!hideHeader && (
    <PostFeedHeader isProfilePage={isProfilePage} isMainPage={isMainPage} />
   )}
   {!storeSearch && (
    posts.map((post: Post) => (
     <PostCard key={post.id} post={post} isExpanded={false} currentUser={currentUser} />
    ))
   )}


   {storeSearch && (
    posts.map((post: any) => {
     if (post.body?.includes(storeSearch) || post?.Bet?.thoughts.includes(storeSearch) || post?.Parlay?.bets[0].thoughts.includes(storeSearch)) {
      return (
       <PostCard key={post.id} post={post} isExpanded={false} currentUser={currentUser} />
      )
     }
    })
   )}

  </div>
 );
})

export default PostFeed;