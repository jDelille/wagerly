import dynamic from 'next/dynamic';

import getCurrentUser from '../actions/getCurrentUser';
import FeedHeader from '../components/feed/feed-header/FeedHeader';
import PostSkeleton from '../components/skeleton/post-skeleton/PostSkeleton';
import styles from './Page.module.scss';

const DynamicSportsbookGames = dynamic(
 () => import('../components/sportsbook/sportsbook-games/SportsbookGames'),
 {
  loading: () => (
   <>
    <PostSkeleton />
    <PostSkeleton />
    <PostSkeleton />
   </>
  ),
 }
);

const Sportsbook = async () => {
 const currentUser = await getCurrentUser();

 return (
  <div className={styles.main}>
   <FeedHeader
    label='Sportsbook'
    isBack={false}
    currentUserPhoto={currentUser?.photo as string}
    currentUsername={currentUser?.username as string}
   />
   <DynamicSportsbookGames />
  </div>
 );
};

export default Sportsbook;
