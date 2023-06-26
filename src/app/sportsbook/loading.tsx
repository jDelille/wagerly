import Loader from "@/app/components/loader/Loader";
import FeedHeaderSkeleton from "@/app/components/skeleton/feed-header/FeedHeaderSkeleton";

import styles from './Page.module.scss';

const Loading = () => (
 <div className={styles.main}>
  <FeedHeaderSkeleton value="Sportsbook" />
  <div className={styles.loading}>
   <Loader />
  </div>
 </div>
)

export default Loading;