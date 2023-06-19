'use client'

import styles from './FeedHeaderSkeleton.module.scss';

type Props = {
 value?: string;
}

const FeedHeaderSkeleton: React.FC<Props> = ({ value = 'Explore' }) => {
 return (
  <div className={styles.feedHeader}>
   <strong>{value}</strong>
  </div>
 );
}

export default FeedHeaderSkeleton;