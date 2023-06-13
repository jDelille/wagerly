'use client';
import { FaHashtag, FaUserCircle, FaBell } from 'react-icons/fa';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { RiMoneyDollarBoxFill } from 'react-icons/ri'
import { AiFillLike } from 'react-icons/ai';

import styles from './MobileNavbar.module.scss';
import NavLink from '../nav/NavLink';
import Link from 'next/link';

type Props = {
 currentUsername?: string;
}

const MobileNavbar: React.FC<Props> = ({ currentUsername }) => {

 const links = [
  {
   id: 1,
   label: 'Explore',
   icon: FaHashtag,
   href: '/'
  },
  {
   id: 2,
   label: 'Sportsbook',
   icon: RiMoneyDollarBoxFill,
   href: '/sportsbook'
  },
  {
   id: 3,
   label: 'Profile',
   icon: FaUserCircle,
   href: `/user/${currentUsername}`

  },
  {
   id: 4,
   label: 'Notifications',
   icon: FaBell,
   href: '/'

  },
  {
   id: 5,
   label: 'Bookmarks',
   icon: BsFillBookmarkFill,
   href: '/bookmarks'

  },
  {
   id: 6,
   label: 'Likes',
   icon: AiFillLike,
   href: '/likes'
  },

 ]

 return (
  <div className={styles.mobileNavbar}>
   <div className={styles.links}>
    {!currentUsername ? (
     links.map((link) => {
      if (link.label === 'Explore')
       return (
        <Link href={link.href}>{link.label}</Link>
       )
     })
    ) : (
     links.map((link) => (
      <Link key={link.id} href={link.href}>{link.label}</Link>
     ))
    )
    }
    {currentUsername && (
     <p>Logout</p>
    )}
   </div >

  </div >
 );
}

export default MobileNavbar;