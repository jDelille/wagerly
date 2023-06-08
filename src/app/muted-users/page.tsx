
import FeedHeader from '../components/feed-header/FeedHeader';
import styles from './Page.module.scss';

const MutedUsers = () => {
 return (
  <div className={styles.main}>
   <FeedHeader label='Back' isBack />
   <div className={styles.noMutesMessage}>
    You havent muted any users yet.
   </div>
  </div>
 );
}

export default MutedUsers;