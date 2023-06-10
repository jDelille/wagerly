import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

import styles from './PostCardMenu.module.scss';
import usePinPost from '@/app/hooks/usePinPost';

type Props = {
 setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
 postId: string;
 currentUserId?: string;
 isPinned: boolean;
}

const PostCardMenu: React.FC<Props> = ({ setIsMenuOpen, postId, currentUserId, isPinned }) => {
 const router = useRouter();

 const { handlePinPost, handleUnPinPost } = usePinPost(postId as string, currentUserId as string, setIsMenuOpen);

 return (
  <>
   <div className={styles.overlay} onClick={() => setIsMenuOpen(false)}></div>

   <div className={styles.postCardMenu}>
    {isPinned ? (
     <p className={styles.option} onClick={() => handleUnPinPost()}>Unpin post</p>
    ) : (
     <p className={styles.option} onClick={() => handlePinPost()}>Pin on profile</p>
    )}

    <p className={styles.option} onClick={(e) => {
     router.push(`post/${postId}`);
    }} >Expand this post</p>
    <p className={styles.option}>Copy link to post</p>

    <div className={styles.divider}></div>

    <p className={styles.option}>Bookmark</p>
    <p className={styles.option}>Favorite</p>

    <div className={styles.divider}></div>

    <p className={styles.option}>Edit</p>
    <p className={styles.option}>Delete & re-draft</p>
    <p className={styles.option}>Delete</p>
   </div>
  </>
 );
}

export default PostCardMenu;