import FeedHeaderSkeleton from "@/app/components/skeleton/feed-header/FeedHeaderSkeleton";
import PostSkeleton from "@/app/components/skeleton/post-skeleton/PostSkeleton";

const Loading = () => (
 <div>
  <FeedHeaderSkeleton />
  <PostSkeleton />
  <PostSkeleton />
  <PostSkeleton />
  <PostSkeleton />
 </div>
)

export default Loading;