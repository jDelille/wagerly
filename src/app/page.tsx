import dynamic from 'next/dynamic';
import getCurrentUser from './actions/getCurrentUser';
import getPosts from './actions/getPosts';
import getUsers from './actions/getUsers';
import FeedHeader from './components/feed-header/FeedHeader';
import PostSkeleton from './components/skeleton/post-skeleton/PostSkeleton';

import styles from './styles/App.module.scss';


export default async function Home() {

  const [posts, currentUser, users] = await Promise.all([getPosts(), getCurrentUser(), getUsers()])

  const DynamicPostFeed = dynamic(() => import('./components/posts/post-feed/PostFeed'), {
    loading: () => <>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </>
  })

  return (
    <main className={styles.app}>
      <div className={styles.main}>
        <FeedHeader label='Explore' isBack={false} />
        <DynamicPostFeed posts={posts} isProfilePage={false} isMainPage={true} currentUser={currentUser} users={users} />
      </div>
    </main>
  )
}
