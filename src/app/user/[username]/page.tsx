import getUserByUsername from "@/app/actions/getUserByUsername";
import FeedHeader from "@/app/components/feed-header/FeedHeader";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ProfileHeader from "@/app/components/profile/profile-header/ProfileHeader";
import PostFeed from "@/app/components/posts/post-feed/PostFeed";
import getPostsByUsername from "@/app/actions/getPostsByUsername";

import styles from './Page.module.scss';

interface IParams {
 username?: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {

 const [user, currentUser, posts] = await Promise.all([getUserByUsername(params), getCurrentUser(), getPostsByUsername(params)]);

 return (
  <div className={styles.main}>
   <FeedHeader label='Back' isBack />
   <ProfileHeader user={user} currentUserId={currentUser?.id} bio={user?.bio as string} />
   <PostFeed isProfilePage posts={posts} currentUser={currentUser} />
  </div>
 );
}

export default ProfilePage;