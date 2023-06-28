'use client'

import tabStore from "@/app/store/tabStore";
import { SafeUser } from "@/app/types/SafeUser";
import { User } from "@prisma/client";
import { observer } from "mobx-react";

import News from "../news/News";
import PostFeedHeader from "../posts/post-feed/post-feed-header/PostFeedHeader";
import UserBox from "../user/user-box/UserBox";
import BetFeed from "./bet-feed/BetFeed";
import styles from './Feed.module.scss';
import PostFeed from "./post-feed/PostFeed";

type Props = {
 hideHeader?: boolean;
 isProfilePage?: boolean;
 isMainPage?: boolean;
 posts: any;
 currentUser: SafeUser | null;
 users?: User[]
 username?: string;
 bets: any;
}


const Feed: React.FC<Props> = observer(({ hideHeader, isMainPage, isProfilePage, posts, currentUser, users, username, bets }) => {

 const activeTab = tabStore.tab


 return (
  <div className={isMainPage ? styles.mainPostFeed : styles.postFeed}>
   {!hideHeader && (
    <PostFeedHeader isProfilePage={isProfilePage} isMainPage={isMainPage} />
   )}
   {activeTab === 'Posts' && (
    <PostFeed initialPosts={posts} currentUser={currentUser} />
   )}

   {activeTab === 'Bets' && (
    <BetFeed initialBets={bets} currentUser={currentUser} />
   )}


   {activeTab === 'People' && (
    <div className={styles.peopleFeed}>
     {users?.map((user) => (
      <UserBox key={user?.id} user={user} />
     ))}
    </div>
   )}

   {activeTab === 'News' && (
    <div className={styles.newsFeed}>
     <News />
    </div>
   )}
  </div>
 );
})

export default Feed;