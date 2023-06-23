
import Loader from "@/app/components/loader/Loader";
import styles from './styles/App.module.scss';
import FeedHeaderSkeleton from "@/app/components/skeleton/feed-header/FeedHeaderSkeleton";


const Loading = () => (
 <div className={styles.main}>
  <FeedHeaderSkeleton value="Back" isBack />
  <div className={styles.loading}>
   <Loader />
  </div>
 </div>
)

export default Loading;