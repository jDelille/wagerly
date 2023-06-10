'use client';

import { useState } from 'react';
import tabStore from '@/app/store/tabStore';
import { observer } from 'mobx-react';

import styles from './PostFeedHeader.module.scss';


const mainTabs = ['Posts', 'Bets', 'People', 'News'];
const profileTabs = ['Posts', 'Bets']
const searchTabs = ['All', 'Profiles', 'Posts']

type Props = {
 isMainPage?: boolean
 isProfilePage?: boolean;
 isSearchPage?: boolean;
}

const PostFeedHeader: React.FC<Props> = observer(({ isProfilePage, isSearchPage, isMainPage }) => {
 const activeTab = tabStore.tab || "Posts"

 const setTab = (tab: string) => {
  tabStore.setTab(tab)
 }

 return (
  <div className={styles.postFeedHeader}>
   {isProfilePage && (
    profileTabs.map((tab) => (
     <p
      key={tab}
      onClick={() => setTab(tab)}
      className={activeTab === tab ? styles.activeTab : styles.tab}>
      {tab}
     </p>
    ))
   )}

   {isSearchPage && (
    searchTabs.map((tab) => (
     <p
      key={tab}
      onClick={() => setTab(tab)}
      className={activeTab === tab ? styles.activeTab : styles.tab}>
      {tab}
     </p>
    ))
   )}

   {isMainPage && (
    mainTabs.map((tab) => (
     <p
      key={tab}
      onClick={() => setTab(tab)}
      className={activeTab === tab ? styles.activeTab : styles.tab}>
      {tab}
     </p>
    ))
   )}

  </div>
 );
});

export default PostFeedHeader;
