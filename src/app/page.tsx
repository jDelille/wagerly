import getPosts from './actions/getPosts';
import PostFeed from './components/posts/post-feed/PostFeed';
import styles from './styles/App.module.scss';

export default async function Home() {

  const [posts] = await Promise.all([getPosts()])


  return (
    <main className={styles.app}>
      <div className={styles.main}>
        <PostFeed posts={posts} />
      </div>
    </main>
  )
}
