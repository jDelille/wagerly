import getCurrentUser from '../actions/getCurrentUser';
import getPosts from '../actions/getPosts';
import getUserByUsername from '../actions/getUserByUsername';
import getUsers from '../actions/getUsers';
import FeedHeader from '../components/feed-header/FeedHeader';
import PostFeed from '../components/posts/post-feed/PostFeed';
import PostFeedHeader from '../components/posts/post-feed/post-feed-header/PostFeedHeader';
import SearchFeed from '../components/search-feed/SearchFeed';
import UserFeed from '../components/user/user-feed/UserFeed';
import tabStore from '../store/tabStore';

import styles from './Page.module.scss';

interface IParams {
 search: string;
}

const Search = async ({ params }: { params: IParams }) => {

 const [currentUser, posts, users] = await Promise.all([getCurrentUser(), getPosts(), getUsers()]);



 return (
  <div className={styles.main}>
   <FeedHeader label='Search' isBack={false} />
   <SearchFeed users={users} posts={posts} />
  </div>
 );
}

export default Search;