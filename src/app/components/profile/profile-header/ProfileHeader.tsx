'use client'
import { useState } from 'react';
import Avatar from '../../user/Avatar/Avatar';
import { ProfileScreenString } from '@/app/utils/app-string/ProfileScreenString';
import { format } from 'date-fns';
import { BiDotsVertical } from 'react-icons/bi';
import Button from '../../button/Button';
import Link from 'next/link';
import Image from 'next/image';

import styles from './ProfileHeader.module.scss';
import ProfileMenu from './profile-menu/ProfileMenu';
import { User } from '@prisma/client';
import useFollow from '@/app/hooks/useFollow';

type Props = {
 user: User
 currentUserId?: string;
 bio: string;
 followerCount: number;
 followingIds: string[];
}

const ProfileHeader: React.FC<Props> = ({ user, currentUserId, bio, followerCount, followingIds }) => {

 const [isMenuOpen, setIsMenuOpen] = useState(false);


 let joinedDate = format(new Date(user?.createdAt), 'MMMM dd, yyyy');

 const hasDraftkings = user?.draftKingsLink
 const hasBetSperts = user?.betSpertsLink

 const { handleFollow, handleUnfollow, isLoading } = useFollow(
  user?.id as string,
  user?.username as string,
  currentUserId as string
 );

 const isFollowing = followingIds.includes(user?.id as string)

 return (
  <div className={styles.profileHeader}>
   <div className={styles.top}>
    <Avatar photo={user?.photo || '/images/placeholder.png'} />
    <div className={styles.displayName}>
     <strong>{user?.name}</strong>
     <span>@{user?.username}</span>
    </div>
    <div className={styles.menu}>
     {currentUserId === user?.id && (
      <Link href={`/edit-profile/${user?.username}`} className={styles.editProfileButton}>Edit Profile</Link>
     )}

     {currentUserId !== user?.id && (

      <Button label={isFollowing ? 'Unfollow' : 'Follow'} onClick={isFollowing ? handleUnfollow : handleFollow} />

     )}
     <div className={styles.userMenu} onClick={() => setIsMenuOpen(!isMenuOpen)}>
      <BiDotsVertical size={22} />
     </div>
     {isMenuOpen && (
      <ProfileMenu
       setIsMenuOpen={setIsMenuOpen}
       currentUserId={currentUserId as string}
       user={user}
      />
     )}
    </div>
   </div>
   <div className={styles.middle}>
    <div className={styles.bio}>
     {bio && <p>{user?.bio} </p>}

     {!bio && currentUserId === user?.id && (
      <p className={styles.noBioMessage}>
       {ProfileScreenString.noBioMessage}
       <span >
        {ProfileScreenString.editProfile}
       </span>
      </p>
     )}

     <div className={styles.links}>
      <div className={styles.link}>
       <p>{ProfileScreenString.joined}</p>
       <span>{joinedDate}</span>
      </div>

      {hasDraftkings && (
       <div className={styles.link}>
        <div className={styles.logo}>
         <Image
          src='/images/draftkings.png'
          alt='draftkings logo'
          width={15}
          height={15}
         />
         <p>Draftkings</p>
        </div>
        <a target='_blank' href={user?.draftKingsLink as string}>{user?.draftKingsLink}</a>
       </div>
      )}

      {hasBetSperts && (
       <div className={styles.link}>
        <div className={styles.logo}>
         <Image
          src='/images/betsperts.jpg'
          alt='draftkings logo'
          width={15}
          height={15}
         />
         <p>Betsperts</p>

        </div>
        <a target='_blank' href={user?.betSpertsLink as string}>{user?.betSpertsLink}</a>
       </div>
      )}

     </div>
    </div>
   </div>
   <div className={styles.userInfo}>
    <p>
     {followerCount} <span>{ProfileScreenString.followers}</span>
    </p>
    <p>
     {user?.followingIds.length || 0}{' '}
     <span>{ProfileScreenString.following}</span>
    </p>
    <p>
     {user?.totalBets} <span>{ProfileScreenString.bets}</span>
    </p>
    <p>
     {0} <span>{ProfileScreenString.groups}</span>
    </p>
   </div>
  </div>
 );
}

export default ProfileHeader;