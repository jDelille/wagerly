import { Dispatch, SetStateAction } from 'react';
import styles from './PostCardMenu.module.scss';

type Props = {
 setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const PostCardMenu: React.FC<Props> = ({ setIsMenuOpen }) => {
 return (
  <>
   <div className={styles.overlay} onClick={() => setIsMenuOpen(false)}></div>

   <div className={styles.postCardMenu}>
    <p className={styles.option}>Pin on profile</p>
    <p className={styles.option}>Expand this post</p>
    <p className={styles.option}>Copy link to post</p>

    <div className={styles.divider}></div>

    <p className={styles.option}>Edit</p>
    <p className={styles.option}>Delete & re-draft</p>
    <p className={styles.option}>Delete</p>
   </div>
  </>
 );
}

export default PostCardMenu;