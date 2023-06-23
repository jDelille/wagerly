
import dynamic from 'next/dynamic';
import getBookmarks from '../../actions/getBookmarks';
import getCurrentUser from '../../actions/getCurrentUser';
import FeedHeader from '../../components/feed/feed-header/FeedHeader';
import PostSkeleton from '../../components/skeleton/post-skeleton/PostSkeleton';

import styles from './Page.module.scss';
import PostCard from '@/app/components/posts/post-card/PostCard';

interface IParams {
 username?: string;
}

const Bookmarks = async ({ params }: { params: IParams }) => {

 const [posts, currentUser] = await Promise.all([getBookmarks(params), getCurrentUser()])

 const DynamicPostFeed = dynamic(() => import('../../components/posts/post-feed/PostFeed'), {
  ssr: false,
  loading: () => <>
   <p>Loading...</p>
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
    <div className={styles.content}>
     <DynamicPostFeed posts={posts} currentUser={currentUser} isProfilePage={false} />
    </div>
   )}
  </div>
 );
}

export default Bookmarks;