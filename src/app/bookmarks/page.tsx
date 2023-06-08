
import FeedHeader from '../components/feed-header/FeedHeader';
import styles from './Page.module.scss';

const Bookmarks = () => {
 return (
  <div className={styles.main}>
   <FeedHeader label='Back' isBack />
   <div className={styles.noBookmarksMessage}>
    You dont have any bookmarked posts yet. When you bookmark one, it will show up here.
   </div>
  </div>
 );
}

export default Bookmarks;