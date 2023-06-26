import getCurrentUser from '@/app/actions/getCurrentUser';
import FeedHeader from '@/app/components/feed/feed-header/FeedHeader';
import PostSkeleton from '@/app/components/skeleton/post-skeleton/PostSkeleton';
import dynamic from 'next/dynamic';

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
