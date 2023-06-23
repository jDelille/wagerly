import getPostById from "@/app/actions/getPostById";
import getUserByUsername from "@/app/actions/getUserByUsername";
import PostCard from "@/app/components/posts/post-card/PostCard";

import styles from './Page.module.scss';
import FeedHeader from "@/app/components/feed/feed-header/FeedHeader";
import getCurrentUser from "@/app/actions/getCurrentUser";
import PostCardComments from "@/app/components/posts/post-card/post-card-comments/PostCardComments";
import dynamic from "next/dynamic";

interface IParams {
 postId?: string;
}

const PostPage = async ({ params }: { params: IParams }) => {

 const [currentUser, post] = await Promise.all([getCurrentUser(), getPostById(params)])

 const DynamicPostCard = dynamic(() => import('../../components/posts/post-card/PostCard'), {
  ssr: false,
  loading: () => <><p>Loading...</p></>
 })

 const DynamicPostCardComments = dynamic(() => import('../../components/posts/post-card/post-card-comments/PostCardComments'), {
  ssr: false,
  loading: () => <><p>Loading...</p></>
 })


 return (
  <div className={styles.main}>
   <div className={styles.feed}>
    <FeedHeader label="Back" isBack={true} />
    <div className={styles.content}>
     <DynamicPostCard post={post} isExpanded={true} currentUser={currentUser} />
     <DynamicPostCardComments post={post} currentUser={currentUser} />
    </div>

   </div>

  </div>
 );
}

export default PostPage;