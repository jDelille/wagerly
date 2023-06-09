import FeedHeader from '../components/feed-header/FeedHeader';
import SportsbookGames from '../components/sportsbook/sportsbook-games/SportsbookGames';
import styles from './Page.module.scss';

const Sportsbook = () => {
 return (
  <div className={styles.main}>
   <FeedHeader label='Sportsbook' isBack={false} />
   <SportsbookGames />
  </div>
 );
}

export default Sportsbook;