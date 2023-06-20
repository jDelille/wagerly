import getUserByUsername from "@/app/actions/getUserByUsername";
import FeedHeader from "@/app/components/feed-header/FeedHeader";
import getCurrentUser from "@/app/actions/getCurrentUser";
import PostFeed from "@/app/components/posts/post-feed/PostFeed";
import getPostsByUsername from "@/app/actions/getPostsByUsername";
import dynamic from "next/dynamic";
import ProfileHeaderSkeleton from "@/app/components/skeleton/profile/ProfileHeaderSkeleton";
import Feed from "@/app/components/feed/Feed";
import PostSkeleton from "@/app/components/skeleton/post-skeleton/PostSkeleton";

import styles from './Page.module.scss';
import PostCard from "@/app/components/posts/post-card/PostCard";
import FeedHeaderSkeleton from "@/app/components/skeleton/feed-header/FeedHeaderSkeleton";

interface IParams {
 username?: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {

 const [user, currentUser, posts] = await Promise.all([getUserByUsername(params), getCurrentUser(), getPostsByUsername(params)]);

 const DynamicProfileHeader = dynamic(() => import('../../components/profile/profile-header/ProfileHeader'), {
  loading: () => <>
   <ProfileHeaderSkeleton />
  </>
 })

 const DynamicPostFeed = dynamic(() => import('../../components/posts/post-feed/PostFeed'), {
  loading: () => <>
   <PostSkeleton />
   <PostSkeleton />
   <PostSkeleton />
  </>
 })

 return (
  <div className={styles.main}>
   <FeedHeader
    label='Back'
    isBack
    currentUsername={currentUser?.username}
    currentUserPhoto={currentUser?.photo || '/images/placeholder.png'} />

   <div className={styles.content}>
    <DynamicProfileHeader user={user} currentUserId={currentUser?.id} bio={user?.bio as string} />
    <DynamicPostFeed posts={posts} isProfilePage currentUser={currentUser} />
   </div>
  </div>
 );
}

export default ProfilePage;