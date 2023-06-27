import getCurrentUser from '@/app/actions/getCurrentUser';
import FeedHeader from '@/app/components/feed/feed-header/FeedHeader';
import PostSkeleton from '@/app/components/skeleton/post-skeleton/PostSkeleton';
import dynamic from 'next/dynamic';

import styles from './Page.module.scss';

interface IParams {
 matchId?: string;
}

const DynamicMatchDetails = dynamic(
 () => import('../../components/sportsbook/match-details/MatchDetails'),
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

const Match = async ({ params }: { params: IParams }) => {
 const currentUser = await getCurrentUser();

 return (
  <div className={styles.main}>
   <FeedHeader
    label='Sportsbook'
    isBack={false}
    isSportsbook={true}
    currentUserPhoto={currentUser?.photo as string}
    currentUsername={currentUser?.username as string}
   />
   <div className={styles.content}>
    <DynamicMatchDetails
     matchId={params.matchId as string}
     currentUserId={currentUser?.id}
    />
   </div>
  </div>
 );
};

export default Match;
