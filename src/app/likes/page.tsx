
import FeedHeader from '../components/feed/feed-header/FeedHeader';
import styles from './Page.module.scss';

const Likes = () => {
 return (
  <div className={styles.main}>
   <FeedHeader label='Back' isBack />
   <div className={styles.noFavoritesMessage}>
    You dont have any liked posts yet. When you like one, it will show up here.
   </div>
  </div>
 );
}

export default Likes;