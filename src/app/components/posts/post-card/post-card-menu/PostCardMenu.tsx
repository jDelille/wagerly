import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import usePinPost from '@/app/hooks/usePinPost';
import { SafeUser } from '@/app/types/SafeUser';
import useBookmarkPost from '@/app/hooks/useBookmarkPost';

import styles from './PostCardMenu.module.scss';

type Props = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  postId: string;
  isPinned: boolean;
  currentUser: SafeUser | null;
};

const PostCardMenu: React.FC<Props> = ({
  setIsMenuOpen,
  postId,
  isPinned,
  currentUser,
}) => {
  const router = useRouter();
  const { id: userId, bookmarks = [] } = currentUser || {};
  const isBookmarked = bookmarks.includes(postId);

  const { handlePinPost, handleUnPinPost } = usePinPost(
    postId,
    userId as string,
    setIsMenuOpen
  );
  const { handleBookmarkPost, handleUnBookmarkPost } = useBookmarkPost(postId);

  const handleExpandPost = useCallback(() => {
    router.push(`/post/${postId}`);
  }, [postId, router]);

  const toggleBookmark = useCallback(() => {
    setBookmark((prevBookmark) => !prevBookmark);
    handleBookmarkPost();
  }, [handleBookmarkPost]);

  const [bookmark, setBookmark] = useState(isBookmarked);

  return (
    <>
      <div
        className={styles.overlay}
        onClick={() => setIsMenuOpen(false)}></div>

      <div className={styles.postCardMenu}>
        {isPinned ? (
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
        {bookmark ? (
          <p className={styles.option} onClick={handleUnBookmarkPost}>
            Remove bookmark
          </p>
        ) : (
          <p className={styles.option} onClick={toggleBookmark}>
            Bookmark
          </p>
        )}

        <p className={styles.option}>Like</p>
        <div className={styles.divider}></div>
        <p className={styles.option}>Edit</p>
        <p className={styles.option}>Delete & re-draft</p>
        <p className={styles.option}>Delete</p>
      </div>
    </>
  );
};

export default PostCardMenu;
