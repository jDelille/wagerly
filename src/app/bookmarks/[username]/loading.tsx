import FeedHeaderSkeleton from "../../components/skeleton/feed-header/FeedHeaderSkeleton";
import PostSkeleton from "../../components/skeleton/post-skeleton/PostSkeleton";

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