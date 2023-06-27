import getCurrentUser from '@/app/actions/getCurrentUser';
import getFollowersCount from '@/app/actions/getFollowersCount';
import getPostsByUsername from '@/app/actions/getPostsByUsername';
import getUserByUsername from '@/app/actions/getUserByUsername';
import FeedHeader from '@/app/components/feed/feed-header/FeedHeader';
import PostSkeleton from '@/app/components/skeleton/post-skeleton/PostSkeleton';
import ProfileHeaderSkeleton from '@/app/components/skeleton/profile/ProfileHeaderSkeleton';
import dynamic from 'next/dynamic';

import styles from './Page.module.scss';

interface IParams {
 username?: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {
 const [user, currentUser, posts, followerCount] = await Promise.all([
  getUserByUsername(params),
  getCurrentUser(),
  getPostsByUsername(params),
  getFollowersCount(params),
 ]);

 const DynamicProfileHeader = dynamic(
  () => import('../../components/profile/profile-header/ProfileHeader'),
  {
   ssr: false,
   loading: () => (
    <>
     <ProfileHeaderSkeleton />
    </>
   ),
  }
 );

 const DynamicPostFeed = dynamic(
  () => import('../../components/posts/post-feed/PostFeed'),
  {
   ssr: false,
   loading: () => (
    <>
     <PostSkeleton />
     <PostSkeleton />
    </>
   ),
  }
 );

 return (
  <div className={styles.main}>
   <FeedHeader
    label='Back'
    isBack
    currentUsername={currentUser?.username}
    currentUserPhoto={currentUser?.photo || '/images/placeholder.png'}
   />
   <div className={styles.content}>
    <DynamicProfileHeader
     user={user as any}
     currentUserId={currentUser?.id}
     bio={user?.bio as string}
     followerCount={followerCount as number}
     followingIds={currentUser?.followingIds as string[]}
    />
    <DynamicPostFeed
     posts={posts}
     isProfilePage
     currentUser={currentUser}
    />
   </div>
  </div>
 );
};

export default ProfilePage;
