'use client';

import { NavLinks } from '@/app/constants/@Links';
import styles from './NavigationPanel.module.scss';
import NavLink from './NavLink';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { IoLogOut } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';

type Props = {
  currentUsername?: string;
};

const NavigationPanel: React.FC<Props> = ({ currentUsername }) => {
  return (
    <div className={styles.navigationPanel}>
      <div className={styles.logo}>
        <strong>Wagerly</strong>
      </div>
      <div className={styles.links}>
        {!currentUsername
          ? NavLinks.navLinks.map((link) => {
            if (link.label === 'Explore')
              return (
                <NavLink key={link.id} value={link.label} icon={link.icon} href={link.href} />
              );
          })
          : NavLinks.navLinks.map((link) => (
            <>
              <NavLink key={link.id} value={link.label} icon={link.icon} href={link.href} />
            </>
          ))}


      </div>
      <div className={styles.authLinks}>
        {!currentUsername ? (
          <>
            <Link href={'/login'} className={styles.link}>Log In</Link>
            <Link href={'/login'} className={styles.link}>Sign up</Link>
          </>
        ) : (
          <div onClick={() => signOut()} className={styles.logoutLink}><IoLogOut size={20} color="#3c3f47" /><span>Logout</span></div>
        )}
      </div>
    </div >
  );
};

export default NavigationPanel;
