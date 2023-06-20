
import FeedHeaderSkeleton from "@/app/components/skeleton/feed-header/FeedHeaderSkeleton";
import PostSkeleton from "@/app/components/skeleton/post-skeleton/PostSkeleton";
import ProfileHeaderSkeleton from "@/app/components/skeleton/profile/ProfileHeaderSkeleton";

const Loading = () => (
 <div>
  <FeedHeaderSkeleton value="Back" isBack />
  <ProfileHeaderSkeleton />
  <PostSkeleton />
  <PostSkeleton />
  <PostSkeleton />
  <PostSkeleton />
 </div>
)

export default Loading;