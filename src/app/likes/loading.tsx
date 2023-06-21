import FeedHeaderSkeleton from "../components/skeleton/feed-header/FeedHeaderSkeleton";
import PostSkeleton from "../components/skeleton/post-skeleton/PostSkeleton";
import ProfileHeaderSkeleton from "../components/skeleton/profile/ProfileHeaderSkeleton";

const Loading = () => (
 <div>
  <FeedHeaderSkeleton />
  <ProfileHeaderSkeleton />
  <PostSkeleton />
  <PostSkeleton />

 </div>
)

export default Loading;