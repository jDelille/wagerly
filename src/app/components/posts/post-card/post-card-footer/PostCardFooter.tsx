import { FaReply } from 'react-icons/fa';
import { AiTwotoneLike } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import styles from './PostCardFooter.module.scss';
import { BsFillBookmarkFill, BsShareFill, BsThreeDots } from 'react-icons/bs';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { set } from 'date-fns';
import { SafeUser } from '@/app/types/SafeUser';
import { Post } from '@prisma/client';
import postPreviewStore from '@/app/store/postPreviewStore';

type Props = {
  postId: string;
  currentUser: SafeUser | null;
  post: any;
};

const PostCardFooter: React.FC<Props> = ({ postId, currentUser, post }) => {
  const router = useRouter();
  const isBookmarked = currentUser?.bookmarks.includes(postId);

  const [bookmark, setBookmark] = useState(isBookmarked);

  const [localLikeCount, setLocalLikeCount] = useState(
    0 || post.likedIds.length
  );

  const likeSet = new Set(post.likedIds);
  const hasLiked = () => {
    return likeSet.has(currentUser?.id as string);
  }

  const [like, setLike] = useState(hasLiked);
  const [localLike, setLocalLike] = useState(false || hasLiked);



  const onBookmark = useCallback(() => {
    setBookmark(true);
    axios
      .post(`/api/bookmark/${postId}`)
      .then(() => {
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
        setBookmark(false);
      });
  }, [postId, router]);

  const onLike = useCallback(
    (id: string) => {
      if (!currentUser?.id) {
        return;
      }

      setLocalLikeCount((prevLikeCount: number) => prevLikeCount + 1);
      setLocalLike(true);

      axios
        .post(`/api/like-post/${id}`)
        .then(() => {
          router.refresh();
        })
        .catch((error) => {
          console.log(error);
          setLocalLikeCount((prevLikeCount: number) => prevLikeCount - 1);
          setLocalLike(false);
        });
    },
    [currentUser?.id, router]
  );

  const onRemoveLike = useCallback(
    (id: string) => {
      setLocalLikeCount((prevLikeCount: number) => prevLikeCount - 1);
      setLocalLike(false);

      axios
        .delete(`/api/like-post/${id}`)
        .then(() => {
          router.refresh();
        })
        .catch(() => {
          setLocalLikeCount((prevLikeCount: number) => prevLikeCount + 1);
          setLocalLike(true);
        });
    },
    [router]
  );

  const openPostPreview = (post: Post) => {
    postPreviewStore.clearPost(); // Clear the previous post (if any)
    postPreviewStore.setOpen(true);
    postPreviewStore.setPost(post);
  };

  return (
    <div className={styles.postCardFooter}>
      <div className={styles.icon} onClick={() => openPostPreview(post)}>
        <FaReply size={15} color='#5E616F' />
        <span>{post.comments.length || 0}</span>
      </div>
      <div className={styles.icon} onClick={() => localLike ? onRemoveLike(postId) : onLike(postId)}>
        <AiTwotoneLike
          size={15}
          color='#5E616F'
          className={localLike ? styles.liked : ''}
        />
        <span>{localLikeCount || 0}</span>
      </div>
      <div className={styles.icon} onClick={() => onBookmark()}>
        <BsFillBookmarkFill
          size={15}
          color='#5E616F'
          className={bookmark ? styles.bookmarked : ''}
        />
      </div>
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
