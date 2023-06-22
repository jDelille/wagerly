import dynamic from 'next/dynamic';
import getCurrentUser from './actions/getCurrentUser';
import getPosts from './actions/getPosts';
import getUsers from './actions/getUsers';
import FeedHeader from './components/feed/feed-header/FeedHeader';
import PostSkeleton from './components/skeleton/post-skeleton/PostSkeleton';

import styles from './styles/App.module.scss';
import PostFeed from './components/feed/post-feed/PostFeed';
import Feed from './components/feed/Feed';
import Gamebar from './components/gamebar/Gamebar';


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

        <FeedHeader
          label='Explore'
          isBack={false}
          currentUsername={currentUser?.username}
          currentUserPhoto={currentUser?.photo || '/images/placeholder.png'}
        />
        <Gamebar />
        {/* <DynamicPostFeed
          initialPosts={posts}
          isProfilePage={false}
          isMainPage={true}
          currentUser={currentUser}
          users={users}
        /> */}
        {/* <PostFeed
          initialPosts={posts}
          currentUser={currentUser}
        /> */}
        <Feed
          isMainPage
          posts={posts}

          currentUser={currentUser}
          users={users}
        />
      </div>
    </main>
  )
}
