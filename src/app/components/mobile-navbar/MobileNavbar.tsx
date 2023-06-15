'use client';
import { FaHashtag, FaUserCircle, FaBell } from 'react-icons/fa';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { RiMoneyDollarBoxFill } from 'react-icons/ri'
import { AiFillLike } from 'react-icons/ai';

import styles from './MobileNavbar.module.scss';
import NavLink from '../nav/NavLink';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

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
    {
      id: 7,
      label: 'Log in',
      icon: AiFillLike,
      href: '/login'
    },
    {
      id: 8,
      label: 'Sign up',
      icon: AiFillLike,
      href: '/signup'
    },

  ]

  return (
    <div className={styles.mobileNavbar}>
      <div className={styles.links}>


        {!currentUsername && (
          links.map((link) => {
            if (link.label === 'Explore' || link.label === "Log in" || link.label === "Sign up")
              return (
                <Link href={link.href}>{link.label}</Link>
              )
          })
        )}

        {currentUsername && (
          links.map((link) => {
            if (link.label !== 'Log in' && link.label !== 'Sign up') {
              return (
                <Link key={link.id} href={link.href}>{link.label}</Link>
              )
            }
          })
        )}
        {currentUsername && (
          <p onClick={() => signOut()}> Logout</p>
        )}
      </div >

    </div >
  );
}

export default MobileNavbar;