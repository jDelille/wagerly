
import FeedHeader from '../components/feed-header/FeedHeader';
import styles from './Page.module.scss';

const BlockedUsers = () => {
 return (
  <div className={styles.main}>
   <FeedHeader label='Back' isBack />
   <div className={styles.noBlocksMessage}>
    You havent blocked any users yet.
   </div>
  </div>
 );
}

export default BlockedUsers;