'use client';

import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';

import styles from './ProfileMenu.module.scss';
import useBlockUser from '@/app/hooks/useBlockUser';


type Props = {
 setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
 user: User
 currentUserId?: string
 blockedUserIds?: string[]
}

const ProfileMenu: React.FC<Props> = ({ setIsMenuOpen, user, currentUserId, blockedUserIds }) => {

 const closeMenu = () => {
  setIsMenuOpen(false);
 };

 const { handleBlockUser, handleUnblockUser } = useBlockUser(user.id)

 const isBlocked = blockedUserIds?.includes(user.id)


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
     </>
    ) : (
     <>
      <Link
       href={`/edit-profile/${user?.username}`}
       className={styles.option}
       onClick={closeMenu}>
       Mute @{user.username}
      </Link>
      <a
       className={styles.option}
       onClick={!isBlocked ? handleBlockUser : handleUnblockUser}>
       {isBlocked ? `Unblock @${user.username}` : `Block @${user.username}`}
      </a>
      <Link
       href={`/edit-profile/${user?.username}`}
       className={styles.option}
       onClick={closeMenu}>
       Report @{user.username}
      </Link>
     </>
    )}







   </div>
  </>
 );
}

export default ProfileMenu;