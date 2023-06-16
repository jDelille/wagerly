import { User } from '@prisma/client';
import Avatar from '../../user/Avatar/Avatar';
import { SafeUser } from '@/app/types/SafeUser';
import { ProfileScreenString } from '@/app/utils/app-string/ProfileScreenString';
import { format } from 'date-fns';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Button from '../../button/Button';

import styles from './ProfileHeader.module.scss';
import Link from 'next/link';
import Image from 'next/image';


type Props = {
 user: SafeUser | null;
 currentUserId?: string;
 bio: string;
}

const ProfileHeader: React.FC<Props> = ({ user, currentUserId, bio }) => {

 let joinedDate = format(new Date(user?.createdAt as string), 'MMMM dd, yyyy');

 const hasDraftkings = user?.draftKingsLink
 const hasBetSperts = user?.betSpertsLink

 return (
  <div className={styles.profileHeader}>
   <div className={styles.top}>
    <Avatar photo={user?.photo || '/images/placeholder.png'} />
    <div className={styles.displayName}>
     <strong>{user?.name}</strong>
     <span>@{user?.username}</span>
    </div>
    <div className={styles.menu}>
     {currentUserId === user?.id ? (
      <Link href={`/edit-profile/${user?.username}`}>Edit Profile</Link>
     ) : (
      <Button label='Follow' />
     )}
     <div className={styles.userMenu}>
      <BsThreeDotsVertical />
     </div>
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
     {0} <span>{ProfileScreenString.followers}</span>
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