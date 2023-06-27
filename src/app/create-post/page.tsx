import getCurrentUser from "@/app/actions/getCurrentUser";
import FeedHeader from "@/app/components/feed/feed-header/FeedHeader";
import PostPreview from "@/app/components/post-preview/PostPreview";
import CreatePost from "@/app/components/text-input/create-post/CreatePost";
import Avatar from "@/app/components/user/Avatar/Avatar";

import getUsers from "../actions/getUsers";
import styles from './Page.module.scss';

const CreatePostPage = async () => {

 const [currentUser, users] = await Promise.all([getCurrentUser(), getUsers()])

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
    <CreatePost users={users} />
   </div>
  </div>
 );
}

export default CreatePostPage;