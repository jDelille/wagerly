import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";
import { SafeUser } from '@/app/types/SafeUser';

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
    <p
     className={styles.option}
     onClick={() => {
      router.push(`user/${currentUser?.username}`);
      closeMenu();
     }}>
     Go To Profile
    </p>
    <p className={styles.option}>Edit Profile</p>

    <div className={styles.divider}></div>

    <p className={styles.option}
     onClick={() => {
      router.push(`bookmarks/${currentUser?.username}`);
      closeMenu();
     }}>Bookmarks</p>
    <p className={styles.option}
     onClick={() => {
      router.push(`likes`);
      closeMenu();
     }}
    >Likes</p>

    <div className={styles.divider}></div>

    <p className={styles.option}
     onClick={() => {
      router.push(`muted-users`);
      closeMenu();
     }}
    >Muted Users</p>
    <p className={styles.option}
     onClick={() => {
      router.push(`blocked-users`);
      closeMenu();
     }}
    >Blocked Users</p>
    <p className={styles.option}>Muted Words</p>

    <div className={styles.divider}></div>

    <p className={styles.option} onClick={() => signOut()}>Logout</p>
   </div>
  </>
 );
};

export default CurrentUserMenu;
