
import getCurrentUser from '../actions/getCurrentUser';
import getUsers from '../actions/getUsers';
import FeedHeader from '../components/feed/feed-header/FeedHeader';
import LeaderboardUserCard from '../components/leaderboard-user-card/LeaderboardUserCard';

import styles from './Page.module.scss';

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
      <LeaderboardUserCard key={user.id} user={user} i={i} />
     ))}
    </div>
   </div>
  </div>
 );
}

export default Leaderboard;