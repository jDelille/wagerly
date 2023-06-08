import getPostById from "@/app/actions/getPostById";
import getUserByUsername from "@/app/actions/getUserByUsername";
import PostCard from "@/app/components/posts/post-card/PostCard";

import styles from './Page.module.scss';
import FeedHeader from "@/app/components/feed-header/FeedHeader";

interface IParams {
 postId?: string;
}

const PostPage = async ({ params }: { params: IParams }) => {

 const post = await getPostById(params)


 return (
  <div className={styles.main}>
   <div className={styles.feed}>
    <FeedHeader label="Back" isBack={true} />
    <PostCard post={post} isExpanded={true} />
   </div>

  </div>
 );
}

export default PostPage;