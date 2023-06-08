'use client';

import styles from './FeedHeader.module.scss';

type Props = {
 label: string;
}

const FeedHeader: React.FC<Props> = ({ label }) => {
 return (
  <div className={styles.feedHeader}>
   <div className={styles.header}>
    <strong>{label}</strong>
   </div>
  </div>
 );
}

export default FeedHeader;