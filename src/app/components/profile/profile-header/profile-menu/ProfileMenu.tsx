'use client';

import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';

import styles from './ProfileMenu.module.scss';


type Props = {
 setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
 user: User
 currentUserId?: string
}

const ProfileMenu: React.FC<Props> = ({ setIsMenuOpen, user, currentUserId }) => {

 const closeMenu = () => {
  setIsMenuOpen(false);
 };

 return (
  <>
   <div
    className={styles.overlay}
    onClick={() => setIsMenuOpen(false)}></div>

   <div className={styles.profileMenu}>
    {currentUserId === user.id ? (
     <>
      <Link
       href={`/edit-profile/${user?.username}`}
       className={styles.option}
       onClick={closeMenu}>
       Edit Profile
      </Link>

      <div className={styles.divider}></div>

      <Link
       href={`/bookmarks/${user?.username}`}
       className={styles.option}
       onClick={closeMenu}>
       Bookmarks
      </Link>
      <Link href={`/likes`} className={styles.option} onClick={closeMenu}>
       Likes
      </Link>

      <div className={styles.divider}></div>

      <p className={styles.option} onClick={() => signOut()}>
       Logout
      </p>
     </>
    ) : (
     <>
      {/* <Link
       href={`/edit-profile/${user?.username}`}
       className={styles.option}
       onClick={closeMenu}>
       Mute @{user.username}
      </Link>
      <Link
       href={`/edit-profile/${user?.username}`}
       className={styles.option}
       onClick={closeMenu}>
       Report @{user.username}
      </Link> */}
     </>
    )}







   </div>
  </>
 );
}

export default ProfileMenu;