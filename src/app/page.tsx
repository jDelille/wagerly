import dynamic from 'next/dynamic';

import getCurrentUser from './actions/getCurrentUser';
import getPosts from './actions/getPosts';
import getUsers from './actions/getUsers';
import FeedHeader from './components/feed/feed-header/FeedHeader';
import PostSkeleton from './components/skeleton/post-skeleton/PostSkeleton';
import styles from './styles/App.module.scss';
import getBets from './actions/getBets';

export default async function Home() {

  const [posts, currentUser, users, bets] = await Promise.all([getPosts(), getCurrentUser(), getUsers(), getBets()])

  const DynamicFeed = dynamic(() => import('./components/feed/Feed'), {
    ssr: false,
    loading: () => <>
      <PostSkeleton />
      <PostSkeleton />
    </>
  })

  const DynamicGamebar = dynamic(() => import('./components/gamebar/Gamebar'), {
    ssr: false,
    loading: () => <>
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
          hasControls
        />
        <DynamicGamebar />
        <DynamicFeed
          isMainPage
          posts={posts}
          currentUser={currentUser}
          users={users}
          bets={bets}
        />
      </div>
    </main>
  )
}
