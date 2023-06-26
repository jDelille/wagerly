import getCurrentUser from '@/app/actions/getCurrentUser';
import getPosts from '@/app/actions/getPosts';
import getUsers from '@/app/actions/getUsers';
import FeedHeader from '@/app/components/feed/feed-header/FeedHeader';
import SearchFeed from '@/app/components/search-feed/SearchFeed';

import styles from './Page.module.scss';

interface IParams {
 search: string;
}

const Search = async ({ params }: { params: IParams }) => {

 const [currentUser, posts, users] = await Promise.all([getCurrentUser(), getPosts(), getUsers()]);

 return (
  <div className={styles.main}>
   <FeedHeader label='Search' isBack={false} />
   <SearchFeed users={users} posts={posts} currentUser={currentUser} />
  </div>
 );
}

export default Search;