import getPostById from "@/app/actions/getPostById";
import getUserByUsername from "@/app/actions/getUserByUsername";
import PostCard from "@/app/components/posts/post-card/PostCard";

import styles from './Page.module.scss';
import FeedHeader from "@/app/components/feed-header/FeedHeader";
import getCurrentUser from "@/app/actions/getCurrentUser";
import PostCardComments from "@/app/components/posts/post-card/post-card-comments/PostCardComments";

interface IParams {
 postId?: string;
}

const PostPage = async ({ params }: { params: IParams }) => {

 const [currentUser, post] = await Promise.all([getCurrentUser(), getPostById(params)])


 return (
  <div className={styles.main}>
   <div className={styles.feed}>
    <FeedHeader label="Back" isBack={true} />
    <PostCard post={post} isExpanded={true} currentUser={currentUser} />
    <PostCardComments post={post} currentUser={currentUser} />
   </div>

  </div>
 );
}

export default PostPage;