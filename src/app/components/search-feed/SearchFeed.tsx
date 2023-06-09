'use client';

import { observer } from 'mobx-react';
import { User, Post } from '@prisma/client';
import PostFeedHeader from '../posts/post-feed/post-feed-header/PostFeedHeader';
import UserFeed from '../user/user-feed/UserFeed';
import PostFeed from '../posts/post-feed/PostFeed';

import styles from './SearchFeed.module.scss';
import tabStore from '@/app/store/tabStore';
import { SafeUser } from '@/app/types/SafeUser';


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
     <PostFeed posts={posts} isProfilePage={false} isSearchPage={true} hideHeader={true} currentUser={currentUser} />
    </>
   )}

   {tabStore.tab === 'Profiles' && (
    <UserFeed users={users} />
   )}

   {tabStore.tab === 'Posts' && (
    <PostFeed posts={posts} isProfilePage={false} isSearchPage={true} hideHeader={true} currentUser={currentUser} />
   )}

  </>
 );
})

export default SearchFeed;