import getCurrentUser from './actions/getCurrentUser';
import getPosts from './actions/getPosts';
import FeedHeader from './components/feed-header/FeedHeader';
import PostFeed from './components/posts/post-feed/PostFeed';
import styles from './styles/App.module.scss';

export default async function Home() {

  const [posts, currentUser] = await Promise.all([getPosts(), getCurrentUser()])

  return (
    <main className={styles.app}>
      <div className={styles.main}>
        <FeedHeader label='Explore' isBack={false} />
        <PostFeed posts={posts} isProfilePage={false} />
      </div>
    </main>
  )
}
