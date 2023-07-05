'use client'

import Avatar from '@/app/components/user/Avatar/Avatar';
import useFollow from '@/app/hooks/useFollow';
import useNotLoggedInModal from '@/app/hooks/useNotLoggedInModal';
import Button from '@/app/ui/button/Button';
import { ProfileScreenString } from '@/app/utils/app-string/ProfileScreenString';
import { User } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiDotsVertical } from 'react-icons/bi';

import ProfileMenu from './profile-menu/ProfileMenu';
import styles from './ProfileHeader.module.scss';
import useSpecialtiesModal from '@/app/hooks/useSpecialtiesModal';
import Specialties from '../../popup/specialties/Specialties';

type Props = {
 user: User
 currentUserId?: string;
 bio: string;
 followerCount: number;
 followingIds?: string[];
}

const ProfileHeader: React.FC<Props> = ({ user, currentUserId, bio, followerCount, followingIds }) => {

 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const notLoggedInModal = useNotLoggedInModal();

 const specialtiesModal = useSpecialtiesModal();


 let joinedDate = format(new Date(user?.createdAt), 'MMMM dd, yyyy');

 const hasDraftkings = user?.draftKingsLink
 const hasBetSperts = user?.betSpertsLink

 const { handleFollow, handleUnfollow, isLoading } = useFollow(
  user?.id as string,
  user?.username as string,
  currentUserId as string
 );

 const isFollowing = followingIds?.includes(user?.id as string)

 return (
  <div className={styles.profileHeader}>
   <div className={styles.coverPhoto}>
    {user?.coverPhoto && (
     <Image src={user?.coverPhoto} alt='cover-photo' fill style={{ objectFit: 'cover' }} />
    )}
   </div>
   <div className={styles.content}>
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

      {!currentUserId && (
       <Button label={'Follow'} onClick={notLoggedInModal.onOpen} />
      )}

      {currentUserId && currentUserId !== user?.id && (
       <Button label={isFollowing ? 'Unfollow' : 'Follow'} onClick={isFollowing ? handleUnfollow : handleFollow} />
      )}
      {currentUserId === user.id && (
       <>
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
       </>
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

      {currentUserId === user?.id && user.specialties.length < 1 && (
       <div className={styles.specialties}>
        <strong>Specialties</strong>
        <div className={styles.sports}>
         {user.specialties.length < 1 ? (
          <span>{"You haven't added any specialties yet!"}</span>
         ) : (
          user.specialties.map((sport) => (
           <span key={sport} className={styles.sport}>{sport}</span>
          ))
         )}
        </div>
        {currentUserId === user?.id && (
         <span className={styles.editSpecialties} onClick={specialtiesModal.onOpen}>Edit</span>
        )}
       </div>
      )}

      {user.specialties.length > 1 && (
       <div className={styles.specialties}>
        <strong>Specialties</strong>
        <div className={styles.sports}>
         {user.specialties.map((sport) => (
          <span key={sport} className={styles.sport}>{sport}</span>
         ))}
        </div>
        {currentUserId === user?.id && (
         <span className={styles.editSpecialties} onClick={specialtiesModal.onOpen}>Edit</span>
        )}
       </div>
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
      {user.wins} <span>Wins</span>
     </p>
     <p>
      {user.losses} <span>Losses</span>
     </p>
    </div>
   </div>

  </div>
 );
}

export default ProfileHeader;