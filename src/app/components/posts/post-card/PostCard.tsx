import styles from './PostCard.module.scss';

type Props = {
 post: any;
}


const PostCard: React.FC<Props> = ({ post }) => {
 return (
  <div className={styles.postCard}>
   {/* post header */}
   <div className={styles.postBody}>
    <p>{post.body}</p>
   </div>
   {/* post footer */}
  </div>
 );
}

export default PostCard