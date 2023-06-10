
import getBookmarks from '../actions/getBookmarks';
import getCurrentUser from '../actions/getCurrentUser';
import FeedHeader from '../components/feed-header/FeedHeader';
import PostFeed from '../components/posts/post-feed/PostFeed';
import styles from './Page.module.scss';

const Bookmarks = async () => {

 const [posts, currentUser] = await Promise.all([getBookmarks(), getCurrentUser()])


 return (
  <div className={styles.main}>
   <FeedHeader label='Bookmarks' isBack={false} />
   {posts.length < 1 ? (
    <div className={styles.noBookmarksMessage}>
     You dont have any bookmarked posts yet. When you bookmark one, it will show up here.
    </div>
   ) : (
    <PostFeed posts={posts} isProfilePage={false} currentUser={currentUser} hideHeader={true} />
   )}
  </div>
 );
}

export default Bookmarks;