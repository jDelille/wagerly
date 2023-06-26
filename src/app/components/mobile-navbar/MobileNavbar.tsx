'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { AiFillLike } from 'react-icons/ai';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { FaBell, FaHashtag, FaUserCircle } from 'react-icons/fa';
import { RiMoneyDollarBoxFill } from 'react-icons/ri'

import NavLink from '../nav/NavLink';
import styles from './MobileNavbar.module.scss';

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
      label: 'Bookmarks',
      icon: BsFillBookmarkFill,
      href: '/bookmarks'

    },
    {
      id: 5,
      label: 'Log in',
      icon: AiFillLike,
      href: '/login'
    },
    {
      id: 6,
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