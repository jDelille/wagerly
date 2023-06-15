'use client';

import { FaBell, FaHashtag, FaUserCircle } from 'react-icons/fa';
import styles from './NavigationPanel.module.scss';
import { RiMoneyDollarBoxFill } from 'react-icons/ri';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { AiFillLike } from 'react-icons/ai';
import NavLink from '../nav/NavLink';
import Link from 'next/link';

type Props = {
 currentUsername?: string;
}



const NavigationPanel: React.FC<Props> = ({ currentUsername }) => {

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
  <div className={styles.navigationPanel}>
   <div className={styles.links}>
    {!currentUsername ? (
     links.map((link) => {
      if (link.label === 'Explore')
       return (
        <div className={styles.link}>
         <Link href={link.href} key={link.id}>{link.label}</Link>
        </div>
       )
     })
    ) : (
     links.map((link) => (
      <>
       <div className={styles.link}>
        <Link href={link.href} key={link.id}>{link.label}</Link>
       </div>
      </>

     ))
    )}
   </div>


  </div>
 );
}

export default NavigationPanel;