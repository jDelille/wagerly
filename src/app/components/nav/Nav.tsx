'use client';

import { FaHashtag, FaMoneyBill, FaUserCircle, FaBell } from 'react-icons/fa';

import styles from './Nav.module.scss';
import Link from 'next/link';
import NavLink from './NavLink';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { RiMoneyDollarBoxFill } from 'react-icons/ri'
import { AiFillLike } from 'react-icons/ai';

type Props = {

}

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
  href: '/'

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
  href: '/'

 },
 {
  id: 6,
  label: 'Likes',
  icon: AiFillLike,
  href: '/'

 },

]

const Nav: React.FC<Props> = () => {
 return (
  <div className={styles.nav}>
   <div className={styles.logo}>
    <strong>Wagerly</strong>
   </div>
   <div className={styles.links}>
    {links.map((link) => (
     <NavLink key={link.id} label={link.label} id={link.id} icon={link.icon} href={link.href} />
    ))}
   </div>
  </div>
 );
}

export default Nav;