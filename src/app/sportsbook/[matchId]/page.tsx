
import FeedHeader from '@/app/components/feed-header/FeedHeader';
import styles from './Page.module.scss';
import MatchDetails from '@/app/components/sportsbook/match-details/MatchDetails';

interface IParams {
 matchId?: string;
}

const Match = async ({ params }: { params: IParams }) => {
 return (
  <div className={styles.main}>
   <FeedHeader label='Sportsbook' isBack={false} />
   <MatchDetails matchId={params.matchId as string} />
  </div>
 );
}

export default Match;