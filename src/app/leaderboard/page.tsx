
import Image from 'next/image';
import getCurrentUser from '../actions/getCurrentUser';
import getUsers from '../actions/getUsers';
import FeedHeader from '../components/feed/feed-header/FeedHeader';

import styles from './Page.module.scss';
import Avatar from '../components/user/Avatar/Avatar';


const Leaderboard = async () => {

 const [currentUser, users] = await Promise.all([getCurrentUser(), getUsers()])

 const sortedUsers = users.sort((a, b) => b.balance - a.balance);


 return (
  <div className={styles.main}>
   <FeedHeader
    label='Leaderboard'
    isBack={false}
    currentUserPhoto={currentUser?.photo as string}
    currentUsername={currentUser?.username as string}
   />
   <div className={styles.content}>
    <div className={styles.labels}>
     <span className={styles.placement}>#</span>
     <span className={styles.user}>User</span>
     <span className={styles.points}>Earnings</span>
     <span className={styles.wins}>Wins</span>
     <span className={styles.losses}>Losses</span>
    </div>
    <div className={styles.users}>
     {sortedUsers.map((user, i) => (
      <div key={user.id} className={styles.userCard}>
       <span className={styles.placement}>{i + 1}</span>
       <div className={styles.user}>
        <Avatar photo={user.photo || '/images/placeholder.png'} />
        <div className={styles.displayName}>
         <strong>{user.name}</strong>
         <span>@{user.username}</span>
        </div>

       </div>
       <div className={styles.points}>{user.earnings || 0}</div>
       <div className={styles.wins}>0</div>
       <div className={styles.losses}>0</div>
      </div>
     ))}
    </div>
   </div>
  </div>
 );
}

export default Leaderboard;