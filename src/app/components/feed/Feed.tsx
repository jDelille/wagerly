'use client'

import { SafeUser } from "@/app/types/SafeUser";
import PostFeedHeader from "../posts/post-feed/post-feed-header/PostFeedHeader";
import PostFeed from "./post-feed/PostFeed";
import tabStore from "@/app/store/tabStore";
import { observer } from "mobx-react";
import { User } from "@prisma/client";
import UserBox from "../user/user-box/UserBox";
import News from "../news/News";

import styles from './Feed.module.scss';
import { Suspense } from "react";


type Props = {
 hideHeader?: boolean;
 isProfilePage?: boolean;
 isMainPage?: boolean;
 posts: any;
 currentUser: SafeUser | null;
 users?: User[]
 username?: string;
}


const Feed: React.FC<Props> = observer(({ hideHeader, isMainPage, isProfilePage, posts, currentUser, users, username }) => {

 const activeTab = tabStore.tab


 return (
  <div className={isMainPage ? styles.mainPostFeed : styles.postFeed}>
   {!hideHeader && (
    <PostFeedHeader isProfilePage={isProfilePage} isMainPage={isMainPage} />
   )}
   {activeTab === 'Posts' && (
    <PostFeed posts={posts} currentUser={currentUser} />

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