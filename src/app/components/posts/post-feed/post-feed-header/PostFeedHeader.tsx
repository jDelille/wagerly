'use client';

import { useState } from 'react';
import styles from './PostFeedHeader.module.scss';

const tabs = ['Posts', 'Bets', 'People', 'News'];

type Props = {
 isProfilePage: boolean;
}

const PostFeedHeader: React.FC<Props> = ({ isProfilePage }) => {
 const [activeTab, setActiveTab] = useState('Posts');

 return (
  <div className={styles.postFeedHeader}>
   {tabs.map((tab) => {
    if (isProfilePage) {
     if (tab !== 'People' && tab !== 'News') {
      return (
       <p
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={activeTab === tab ? styles.activeTab : styles.tab}>
        {tab}
       </p>
      )
     }

    } else {
     return (
      <p
       key={tab}
       onClick={() => setActiveTab(tab)}
       className={activeTab === tab ? styles.activeTab : styles.tab}>
       {tab}
      </p>
     )
    }

   })}
  </div>
 );
};

export default PostFeedHeader;
