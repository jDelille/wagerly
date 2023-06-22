import getCurrentUser from "../actions/getCurrentUser";
import getPosts from "../actions/getPosts";
import FeedHeader from "../components/feed/feed-header/FeedHeader";
import PostPreview from "../components/post-preview/PostPreview";
import CreatePost from "../components/text-input/create-post/CreatePost";
import Avatar from "../components/user/Avatar/Avatar";

import styles from './Page.module.scss';

const CreatePostPage = async () => {

 const [currentUser] = await Promise.all([getCurrentUser()])

 return (
  <div className={styles.main}>
   <FeedHeader
    label='Back'
    isBack
    currentUsername={currentUser?.username}
    currentUserPhoto={currentUser?.photo || '/images/placeholder.png'} />
   <div className={styles.content}>
    <div className={styles.userHeader}>
     <Avatar photo={currentUser?.photo || '/images/placeholder.png'} />
     <div className={styles.displayName}>
      <strong>{currentUser?.name}</strong>
      <span>{currentUser?.username}</span>
     </div>
    </div>
    <PostPreview />
    <CreatePost />
   </div>
  </div>
 );
}

export default CreatePostPage;