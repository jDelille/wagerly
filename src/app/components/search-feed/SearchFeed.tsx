'use client';

import PostCard from '@/app/components/posts/post-card/PostCard';
import PostFeedHeader from '@/app/components/posts/post-feed/post-feed-header/PostFeedHeader';
import UserFeed from '@/app/components/user/user-feed/UserFeed';
import searchStore from '@/app/store/searchStore';
import tabStore from '@/app/store/tabStore';
import { SafeUser } from '@/app/types/SafeUser';
import { User } from '@prisma/client';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

import styles from './SearchFeed.module.scss';

type Props = {
 users: User[]
 posts: any;
 currentUser: SafeUser | null;
}

const SearchFeed: React.FC<Props> = observer(({ users, posts, currentUser }) => {

 const activeTab = tabStore.tab

 const [searchedPosts, setSearchedPosts] = useState([])

 const storeSearch = searchStore.search

 useEffect(() => {
  const filteredPosts = posts.filter((post: any) => post?.body?.toLowerCase().includes(storeSearch.toLowerCase()) || post?.UserBet?.body.toLowerCase().includes(storeSearch.toLowerCase()))

  setSearchedPosts(filteredPosts)
 }, [posts, storeSearch])


 return (
  <div className={styles.content}>
   <PostFeedHeader isProfilePage={false} isSearchPage />
   {tabStore.tab === 'All' && (
    <>
     <UserFeed users={users} />
     {searchedPosts && searchedPosts.map((post: any) => (
      <PostCard key={post.id} post={post} isExpanded={false} currentUser={currentUser} />
     ))}
    </>
   )}

   {tabStore.tab === 'Profiles' && (
    <UserFeed users={users} />
   )}

   {tabStore.tab === 'Posts' && (
    searchedPosts && searchedPosts.map((post: any) => (
     <PostCard key={post.id} post={post} isExpanded={false} currentUser={currentUser} />
    ))
   )}

  </div>
 );
})

export default SearchFeed;