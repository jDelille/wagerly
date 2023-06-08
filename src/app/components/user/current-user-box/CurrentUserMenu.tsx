import { Dispatch, SetStateAction } from 'react';
import styles from './CurrentUserBox.module.scss';

type Props = {
 setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const CurrentUserMenu: React.FC<Props> = ({ setIsMenuOpen }) => {
 return (
  <>
   <div className={styles.overlay} onClick={() => setIsMenuOpen(false)}></div>

   <div className={styles.currentUserMenu}>
    <p className={styles.option}>Go To Profile</p>
    <p className={styles.option}>Edit Profile</p>

    <div className={styles.divider}></div>

    <p className={styles.option}>Bookmarks</p>
    <p className={styles.option}>Favorites</p>

    <div className={styles.divider}></div>

    <p className={styles.option}>Muted Users</p>
    <p className={styles.option}>Blocked Users</p>
    <p className={styles.option}>Muted Word</p>

    <div className={styles.divider}></div>

    <p className={styles.option}>Logout</p>
   </div >
  </>
 );
}

export default CurrentUserMenu;