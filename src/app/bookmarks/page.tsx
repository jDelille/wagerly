
import dynamic from 'next/dynamic';
import getBookmarks from '../actions/getBookmarks';
import getCurrentUser from '../actions/getCurrentUser';
import FeedHeader from '../components/feed-header/FeedHeader';
import PostSkeleton from '../components/skeleton/post-skeleton/PostSkeleton';

import styles from './Page.module.scss';


const Bookmarks = async () => {

 const [posts, currentUser] = await Promise.all([getBookmarks(), getCurrentUser()])

 const DynamicPostFeed = dynamic(() => import('../components/posts/post-feed/PostFeed'), {
  loading: () => <>
   <PostSkeleton />
   <PostSkeleton />
   <PostSkeleton />
  </>
 })


 return (
  <div className={styles.main}>
   <FeedHeader
    label='Bookmarks'
    isBack={false}
    currentUserPhoto={currentUser?.photo || '/images/placeholder.png'}
    currentUsername={currentUser?.username}
   />
   {posts.length < 1 ? (
    <div className={styles.noBookmarksMessage}>
     You dont have any bookmarked posts yet. When you bookmark one, it will show up here.
    </div>
   ) : (
    <DynamicPostFeed posts={posts} isProfilePage={false} currentUser={currentUser} hideHeader={true} />
   )}
  </div>
 );
}

export default Bookmarks;