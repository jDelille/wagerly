
import FeedHeader from '../components/feed-header/FeedHeader';
import styles from './Page.module.scss';

const Favorites = () => {
 return (
  <div className={styles.main}>
   <FeedHeader label='Back' isBack />
   <div className={styles.noFavoritesMessage}>
    You dont have any favorite posts yet. When you favourite one, it will show up here.
   </div>
  </div>
 );
}

export default Favorites;