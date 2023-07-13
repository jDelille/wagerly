import useBookmarkPost from '@/app/hooks/useBookmarkPost';
import useLikePost from '@/app/hooks/useLikePost';
import useNotLoggedInModal from '@/app/hooks/useNotLoggedInModal';
import postPreviewStore from '@/app/store/postPreviewStore';
import { SafeUser } from '@/app/types/SafeUser';
import { Post } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useContext } from 'react';
import { AiTwotoneLike } from 'react-icons/ai';
import { BsFillBookmarkFill, BsShareFill } from 'react-icons/bs';
import { faBookmark, faReply, faRetweet, faShareFromSquare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PostContext } from '../PostCard';
import styles from './PostCardFooter.module.scss';

type Props = {
  currentUser: SafeUser | null;
  post: any;
};

const PostCardFooter: React.FC<Props> = ({ currentUser, post }) => {
  const router = useRouter();
  const notLoggedInModal = useNotLoggedInModal();

  const {
    localLike,
    setLocalLike,
    setLocalLikeCount,
    localLikeCount,
    setLocalBookmark,
    localBookmark,
  } = useContext(PostContext) ?? {};

  const { handleBookmarkPost, handleUnBookmarkPost } = useBookmarkPost(post.id);

  const { handleLikePost, handleUnLikePost } = useLikePost(post.id);

  const toggleLike = useCallback(() => {
    if (!currentUser) {
      notLoggedInModal.onOpen();
      return;
    }
    if (localLike) {
      handleUnLikePost();
      setLocalLike(false);
      setLocalLikeCount((prevLikeCount: number) => prevLikeCount - 1);
    } else {
      handleLikePost();
      setLocalLike(true);
      setLocalLikeCount((prevLikeCount: number) => prevLikeCount + 1);
    }
  }, [
    currentUser,
    localLike,
    notLoggedInModal,
    handleUnLikePost,
    setLocalLike,
    setLocalLikeCount,
    handleLikePost,
  ]);

  const toggleBookmark = useCallback(() => {
    if (!currentUser) {
      notLoggedInModal.onOpen();
      return;
    }
    setLocalBookmark((prevBookmark: boolean) => !prevBookmark);
    handleBookmarkPost();
  }, [currentUser, setLocalBookmark, handleBookmarkPost, notLoggedInModal]);

  const openPostPreview = (post: Post) => {
    postPreviewStore.clearPost();
    postPreviewStore.setOpen(true);
    postPreviewStore.setPost(post);
  };

  return (
    <div className={styles.postCardFooter}>
      <div
        className={styles.retweetIcon}
        onClick={() => {
          currentUser ? openPostPreview(post) : notLoggedInModal.onOpen();
        }}>
        <FontAwesomeIcon icon={faRetweet} color="#606984" />
        <span>{post.comments.length || 0}</span>
      </div>
      <div
        className={styles.replyIcon}
        onClick={() => {
          currentUser ? openPostPreview(post) : notLoggedInModal.onOpen();
        }}>
        <FontAwesomeIcon icon={faReply} color="#606984" />
        <span>{post.comments.length || 0}</span>
      </div>
      {currentUser ? (
        <Link
          href="/create-post"
          className={styles.mobileIcon}
          onClick={() => openPostPreview(post)}
        >
          <FontAwesomeIcon icon={faReply} color="#606984" />
          <span>{post.comments.length || 0}</span>
        </Link>
      ) : (
        <div className={styles.mobileIcon} onClick={() => notLoggedInModal.onOpen()}>
          <FontAwesomeIcon icon={faReply} color="#606984" />
          <span>{post.comments.length || 0}</span>
        </div>
      )}
      {localLike ? (
        <div className={styles.icon} onClick={toggleLike}>
          <FontAwesomeIcon icon={faThumbsUp} color="#2f89fc" />
          <span>{localLikeCount || 0}</span>
        </div>
      ) : (
        <div className={styles.icon} onClick={toggleLike}>
          <FontAwesomeIcon icon={faThumbsUp} color="#606984" />
          <span>{localLikeCount || 0}</span>
        </div>
      )}
      {localBookmark ? (
        <div className={styles.icon} onClick={handleUnBookmarkPost}>
          <FontAwesomeIcon icon={faBookmark} color="#ff304f" />
        </div>
      ) : (
        <div className={styles.icon} onClick={toggleBookmark}>
          <FontAwesomeIcon icon={faBookmark} color="#606984" />
        </div>
      )}

      <div className={styles.icon}>
        <FontAwesomeIcon icon={faShareFromSquare} color="#606984" />
      </div>
    </div>
  );
};

export default PostCardFooter;
