import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types/SafeUser';
import Link from 'next/link';

import styles from './CurrentUserBox.module.scss';

type Props = {
 setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
 currentUser: SafeUser | null;
};

const CurrentUserMenu: React.FC<Props> = ({ setIsMenuOpen, currentUser }) => {
 const router = useRouter();

 const closeMenu = () => {
  setIsMenuOpen(false);
 };

 return (
  <>
   <div
    className={styles.overlay}
    onClick={() => setIsMenuOpen(false)}></div>

   <div className={styles.currentUserMenu}>
    <Link
     href={`user/${currentUser?.username}`}
     className={styles.option}
     onClick={closeMenu}>
     Go To Profile
    </Link>

    <Link
     href={`/edit-profile/${currentUser?.username}`}
     className={styles.option}
     onClick={closeMenu}>
     Edit Profile
    </Link>

    <div className={styles.divider}></div>

    <Link
     href={`/bookmarks/${currentUser?.username}`}
     className={styles.option}
     onClick={closeMenu}>
     Bookmarks
    </Link>
    <Link href={`/likes`} className={styles.option} onClick={closeMenu}>
     Likes
    </Link>

    <div className={styles.divider}></div>

    <Link
     href={`/muted-users`}
     className={styles.option}
     onClick={closeMenu}>
     Muted Users
    </Link>
    <Link
     href={`/blocked-users`}
     className={styles.option}
     onClick={closeMenu}>
     Blocked Users
    </Link>
    <p className={styles.option} onClick={closeMenu}>
     Muted Words
    </p>

    <div className={styles.divider}></div>

    <p className={styles.option} onClick={() => signOut()}>
     Logout
    </p>
   </div>
  </>
 );
};

export default CurrentUserMenu;
