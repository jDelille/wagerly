'use client';

import { useState } from 'react';
import styles from './PostFeedHeader.module.scss';

const tabs = ['Posts', 'Bets', 'People', 'News'];

const PostFeedHeader = () => {
 const [activeTab, setActiveTab] = useState('Posts');

 return (
  <div className={styles.postFeedHeader}>
   {tabs.map((tab) => (
    <p
     key={tab}
     onClick={() => setActiveTab(tab)}
     className={activeTab === tab ? styles.activeTab : styles.tab}>
     {tab}
    </p>
   ))}
  </div>
 );
};

export default PostFeedHeader;
