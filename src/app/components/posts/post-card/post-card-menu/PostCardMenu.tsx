import { Dispatch, SetStateAction, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import usePinPost from '@/app/hooks/usePinPost';
import { SafeUser } from '@/app/types/SafeUser';
import useBookmarkPost from '@/app/hooks/useBookmarkPost';

import styles from './PostCardMenu.module.scss';
import useLikePost from '@/app/hooks/useLikePost';
import { PostContext } from '../PostCard';

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
    setLocalBookmark((prevBookmark: boolean) => !prevBookmark);
    handleBookmarkPost();
  }, [handleBookmarkPost, setLocalBookmark]);


  const toggleLike = useCallback(() => {
    if (localLike) {
      handleUnLikePost();
      setLocalLike(false)
      setLocalLikeCount((prevLikeCount: number) => prevLikeCount - 1);
    } else {
      handleLikePost();
      setLocalLike(true)
      setLocalLikeCount((prevLikeCount: number) => prevLikeCount + 1);
    }
  }, [localLike, handleUnLikePost, setLocalLike, setLocalLikeCount, handleLikePost]);

  return (
    <>
      <div
        className={styles.overlay}
        onClick={() => setIsMenuOpen(false)}></div>

      <div className={styles.postCardMenu}>
        {post.isPinned ? (
          <p className={styles.option} onClick={() => handleUnPinPost()}>
            Unpin post
          </p>
        ) : (
          <p className={styles.option} onClick={() => handlePinPost()}>
            Pin on profile
          </p>
        )}
        <p className={styles.option} onClick={handleExpandPost}>
          Expand this post
        </p>
        <p className={styles.option}>Copy link to post</p>
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
        <div className={styles.divider}></div>
        <p className={styles.option}>Edit</p>
        <p className={styles.option}>Delete & re-draft</p>
        <p className={styles.option}>Delete</p>
      </div>
    </>
  );
};

export default PostCardMenu;
