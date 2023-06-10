import getCurrentUser from './actions/getCurrentUser';
import getPosts from './actions/getPosts';
import getUsers from './actions/getUsers';
import FeedHeader from './components/feed-header/FeedHeader';
import PostFeed from './components/posts/post-feed/PostFeed';

import styles from './styles/App.module.scss';

export default async function Home() {

  const [posts, currentUser, users] = await Promise.all([getPosts(), getCurrentUser(), getUsers()])

  return (
    <main className={styles.app}>
      <div className={styles.main}>
        <FeedHeader label='Explore' isBack={false} />
        <PostFeed posts={posts} isProfilePage={false} isMainPage={true} currentUser={currentUser} users={users} />
      </div>
    </main>
  )
}
