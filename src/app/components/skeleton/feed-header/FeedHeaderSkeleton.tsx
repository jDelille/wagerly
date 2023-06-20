'use client'

import styles from './FeedHeaderSkeleton.module.scss';

type Props = {
 value?: string;
 isBack?: boolean;
}

const FeedHeaderSkeleton: React.FC<Props> = ({ value, isBack }) => {
 return (
  <div className={styles.feedHeader}>
   <div className={styles.header}>
    {isBack ? <strong className={styles.back}>{value}</strong> : <strong className={styles.label}>{value}</strong>}
   </div>
  </div>
 );
}

export default FeedHeaderSkeleton;