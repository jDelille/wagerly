
import getBlockedUsers from '../actions/getBlockedUsers';
import getCurrentUser from '../actions/getCurrentUser';
import FeedHeader from '../components/feed-header/FeedHeader';
import UserBox from '../components/user/user-box/UserBox';
import styles from './Page.module.scss';

const BlockedUsers = async () => {

 const currentUser = await getCurrentUser();

 const blockedUsers = await getBlockedUsers({ blockedUserIds: currentUser?.blockedUserIds as string[] })


 return (
  <div className={styles.main}>
   <FeedHeader label='Back' isBack />
   <div className={styles.content}>
    {blockedUsers.length === 0 ? (
     <div className={styles.noBlocksMessage}>
      You havent blocked any users yet.
     </div>
    ) : (
     <div>
      {blockedUsers.map((user) => (
       <UserBox key={user.id} user={user} isBlocked />
      ))}
     </div>
    )}
   </div>
  </div>
 );
}

export default BlockedUsers;