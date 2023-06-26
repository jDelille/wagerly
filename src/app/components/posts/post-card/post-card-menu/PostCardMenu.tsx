import useBookmarkPost from '@/app/hooks/useBookmarkPost';
import useLikePost from '@/app/hooks/useLikePost';
import useNotLoggedInModal from '@/app/hooks/useNotLoggedInModal';
import usePinPost from '@/app/hooks/usePinPost';
import { SafeUser } from '@/app/types/SafeUser';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback, useContext, } from 'react';

import { PostContext } from '../PostCard';
import styles from './PostCardMenu.module.scss';

type Props = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  currentUser: SafeUser | null;
  post: any;
};

const PostCardMenu: React.FC<Props> = ({
  setIsMenuOpen,
  post,
  currentUser,
}) => {
  const router = useRouter();
  const notLoggedInModal = useNotLoggedInModal();

  const { id: userId } = currentUser || {};

  const { localLike, setLocalLike, setLocalLikeCount, localBookmark, setLocalBookmark } = useContext(PostContext)

  const { handlePinPost, handleUnPinPost } = usePinPost(
    post.id,
    userId as string,
    setIsMenuOpen
  );
  const { handleBookmarkPost, handleUnBookmarkPost } = useBookmarkPost(post.id);

  const { handleLikePost, handleUnLikePost } = useLikePost(post.id)

  const handleExpandPost = useCallback(() => {
    router.push(`/post/${post.id}`);
  }, [post.id, router]);

  const toggleBookmark = useCallback(() => {
    if (!currentUser) {
      notLoggedInModal.onOpen();
      return;
    }
    setLocalBookmark((prevBookmark: boolean) => !prevBookmark);
    handleBookmarkPost();
  }, [currentUser, setLocalBookmark, handleBookmarkPost, notLoggedInModal]);


  const toggleLike = useCallback(() => {
    if (!currentUser) {
      notLoggedInModal.onOpen();
      return;
    }
    if (localLike) {
      handleUnLikePost();
      setLocalLike(false)
      setLocalLikeCount((prevLikeCount: number) => prevLikeCount - 1);
    } else {
      handleLikePost();
      setLocalLike(true)
      setLocalLikeCount((prevLikeCount: number) => prevLikeCount + 1);
    }
  }, [currentUser, localLike, notLoggedInModal, handleUnLikePost, setLocalLike, setLocalLikeCount, handleLikePost]);

  const onDelete = useCallback(
    (id: string) => {
      axios
        .delete(`/api/post/${id}`)
        .then(() => {
          router.refresh();
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => { });
    },
    [router]
  );

  return (
    <>
      <div
        className={styles.overlay}
        onClick={() => setIsMenuOpen(false)}></div>

      <div className={styles.postCardMenu}>
        {currentUser?.id === post.user.id && (
          post.isPinned ? (
            <p className={styles.option} onClick={() => handleUnPinPost()}>
              Unpin post
            </p>
          ) : (
            <p className={styles.option} onClick={() => handlePinPost()}>
              Pin on profile
            </p>
          )
        )}

        <p className={styles.option} onClick={handleExpandPost}>
          Expand this post
        </p>
        <p className={styles.option}>Copy link to post</p>
        <p className={styles.option} onClick={handleExpandPost}>
          Go to profile
        </p>
        <div className={styles.divider}></div>
        {localBookmark ? (
          <p className={styles.option} onClick={handleUnBookmarkPost}>
            Remove bookmark
          </p>
        ) : (
          <p className={styles.option} onClick={toggleBookmark}>
            Bookmark
          </p>
        )}

        {localLike ? (
          <p className={styles.option} onClick={toggleLike}>Unlike</p>
        ) : (
          <p className={styles.option} onClick={toggleLike}>Like</p>
        )}


        {/* <p className={styles.option} onClick={() => onDelete(post.id)}>Mute @{post.user.username}</p> */}


        {/* <p className={styles.option} onClick={() => onDelete(post.id)}>Report @{post.user.username}</p> */}
        {currentUser?.id === post.userId && (
          <>
            {/* <p className={styles.option}>Edit</p>
            <p className={styles.option}>Delete & re-draft</p> */}
            <div className={styles.divider}></div>

            <p className={styles.option} onClick={() => onDelete(post.id)}>Delete</p>
          </>
        )}

      </div >
    </>
  );
};

export default PostCardMenu;
