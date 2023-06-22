import dynamic from 'next/dynamic';
import FeedHeader from '../components/feed/feed-header/FeedHeader';
import PostSkeleton from '../components/skeleton/post-skeleton/PostSkeleton';

import styles from './Page.module.scss';


const DynamicSportsbookGames = dynamic(() => import('../components/sportsbook/sportsbook-games/SportsbookGames'), {
 loading: () => <>
  <PostSkeleton />
  <PostSkeleton />
  <PostSkeleton />
 </>
})

const Sportsbook = () => {
 return (
  <div className={styles.main}>
   <FeedHeader label='Sportsbook' isBack={false} />
   <DynamicSportsbookGames />
  </div>
 );
}

export default Sportsbook;