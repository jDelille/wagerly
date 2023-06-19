'use client'

import { SafeUser } from "@/app/types/SafeUser";
import PostFeedHeader from "../posts/post-feed/post-feed-header/PostFeedHeader";
import PostFeed from "./post-feed/PostFeed";
import tabStore from "@/app/store/tabStore";
import { observer } from "mobx-react";
import BetFeed from "./bet-feed/BetFeed";
import { User } from "@prisma/client";
import UserBox from "../user/user-box/UserBox";
import News from "../news/News";

import styles from './Feed.module.scss';


type Props = {
 hideHeader?: boolean;
 isProfilePage?: boolean;
 isMainPage?: boolean;
 initialPosts: any;
 currentUser: SafeUser | null;
 initialBets?: any;
 users?: User[]
 username?: string;
}


const Feed: React.FC<Props> = observer(({ hideHeader, isMainPage, isProfilePage, initialPosts, currentUser, initialBets, users, username }) => {

 const activeTab = tabStore.tab

 return (
  <div className={isMainPage ? styles.mainPostFeed : styles.postFeed}>
   {!hideHeader && (
    <PostFeedHeader isProfilePage={isProfilePage} isMainPage={isMainPage} />
   )}

   {activeTab === 'Posts' && (
    <PostFeed initialPosts={initialPosts} currentUser={currentUser} isProfilePage={false} />
   )}

   {activeTab === 'Bets' && (
    <BetFeed initialBets={initialBets} currentUser={currentUser} />
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