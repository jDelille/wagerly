'use client';

import { observer } from 'mobx-react';
import { User, Post } from '@prisma/client';
import PostFeedHeader from '../posts/post-feed/post-feed-header/PostFeedHeader';
import UserFeed from '../user/user-feed/UserFeed';
import tabStore from '@/app/store/tabStore';
import { SafeUser } from '@/app/types/SafeUser';
import PostCard from '../posts/post-card/PostCard';
import { ExtendedPost } from '@/app/types/ExtendedPost';


type Props = {
 users: User[]
 posts: any;
 currentUser: SafeUser | null;
}

const SearchFeed: React.FC<Props> = observer(({ users, posts, currentUser }) => {

 const activeTab = tabStore.tab

 return (
  <>
   <PostFeedHeader isProfilePage={false} isSearchPage />
   {tabStore.tab === 'All' && (
    <>
     <UserFeed users={users} />
     {posts.map((post: any) => (
      <PostCard key={post.id} post={post} isExpanded={false} currentUser={currentUser} />
     ))}
    </>
   )}

   {tabStore.tab === 'Profiles' && (
    <UserFeed users={users} />
   )}

   {tabStore.tab === 'Posts' && (
    posts.map((post: any) => (
     <PostCard key={post.id} post={post} isExpanded={false} currentUser={currentUser} />
    ))
   )}

  </>
 );
})

export default SearchFeed;