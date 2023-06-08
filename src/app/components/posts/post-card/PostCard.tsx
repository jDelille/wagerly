import styles from './PostCard.module.scss';
import PostCardHeader from './post-card-header/PostCardHeader';

type Props = {
 post: any;
}


const PostCard: React.FC<Props> = ({ post }) => {
 return (
  <div className={styles.postCard}>
   <PostCardHeader user={post.user} createdAt={post.createdAt} />
   <div className={styles.postBody}>
    <p>{post.body}</p>
   </div>
   {/* post footer */}
  </div >
 );
}

export default PostCard