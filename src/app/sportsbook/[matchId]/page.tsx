
import FeedHeader from '@/app/components/feed-header/FeedHeader';
import dynamic from 'next/dynamic';
import PostSkeleton from '@/app/components/skeleton/post-skeleton/PostSkeleton';

import styles from './Page.module.scss';

interface IParams {
 matchId?: string;
}

const DynamicMatchDetails = dynamic(() => import('../../components/sportsbook/match-details/MatchDetails'), {
 loading: () => <>
  <PostSkeleton />
  <PostSkeleton />
  <PostSkeleton />
 </>
})

const Match = async ({ params }: { params: IParams }) => {
 return (
  <div className={styles.main}>
   <FeedHeader
    label='Sportsbook'
    isBack={false}
    isSportsbook={true}

   />
   <DynamicMatchDetails matchId={params.matchId as string} />
  </div>
 );
}

export default Match;