import { FaReply } from 'react-icons/fa';
import { AiTwotoneLike } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { BsFillBookmarkFill, BsShareFill, BsThreeDots } from 'react-icons/bs';
import { useCallback, useContext, useState } from 'react';
import { SafeUser } from '@/app/types/SafeUser';
import { Post } from '@prisma/client';
import postPreviewStore from '@/app/store/postPreviewStore';
import useBookmarkPost from '@/app/hooks/useBookmarkPost';
import useLikePost from '@/app/hooks/useLikePost';
import { PostContext } from '../PostCard';

import styles from './PostCardFooter.module.scss';

type Props = {
  currentUser: SafeUser | null;
  post: any;

};

const PostCardFooter: React.FC<Props> = ({ currentUser, post }) => {
  const router = useRouter();

  const { localLike, setLocalLike, setLocalLikeCount, localLikeCount, setLocalBookmark, localBookmark } = useContext(PostContext)

  const { handleBookmarkPost, handleUnBookmarkPost } = useBookmarkPost(post.id);

  const { handleLikePost, handleUnLikePost } = useLikePost(post.id)


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

  const toggleBookmark = useCallback(() => {
    setLocalBookmark((prevBookmark: boolean) => !prevBookmark);
    handleBookmarkPost();
  }, [handleBookmarkPost, setLocalBookmark]);

  const openPostPreview = (post: Post) => {
    postPreviewStore.clearPost();
    postPreviewStore.setOpen(true);
    postPreviewStore.setPost(post);
  };

  return (
    <div className={styles.postCardFooter}>
      <div className={styles.icon} onClick={() => openPostPreview(post)}>
        <FaReply size={15} color='#5E616F' />
        <span>{post.comments.length || 0}</span>
      </div>
      {
        localLike ? (
          <div className={styles.icon} onClick={toggleLike}>
            <AiTwotoneLike
              size={15}
              color='#5E616F'
              className={styles.liked}
            />
            <span>{localLikeCount || 0}</span>
          </div>
        ) : (
          <div className={styles.icon} onClick={toggleLike}>
            <AiTwotoneLike
              size={15}
              color='#5E616F'
              className={''}
            />
            <span>{localLikeCount || 0}</span>
          </div>
        )
      }
      {localBookmark ? (
        <div className={styles.icon} onClick={handleUnBookmarkPost}>
          <BsFillBookmarkFill
            size={15}
            color='#5E616F'
            className={styles.bookmarked}
          />
        </div>
      ) : (
        <div className={styles.icon} onClick={toggleBookmark}>
          <BsFillBookmarkFill
            size={15}
            color='#5E616F'
            className={''}
          />
        </div>
      )}


      <div className={styles.icon}>
        <BsShareFill size={15} color='#5E616F' />
      </div>
      <div className={styles.icon}>
        <BsThreeDots size={15} color='#5E616F' />
      </div>
    </div>
  );
};

export default PostCardFooter;
