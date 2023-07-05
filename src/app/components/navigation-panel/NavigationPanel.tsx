'use client';

import { getNavLinks } from '@/app/constants/@Links';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

import styles from './NavigationPanel.module.scss';
import NavLink from './NavLink';

type Props = {
  currentUsername?: string;
};


const NavigationPanel: React.FC<Props> = ({ currentUsername }) => {
  const navLinks = getNavLinks(currentUsername as string);

  return (
    <div className={styles.navigationPanel}>
      <div className={styles.logo}>
        <strong>Wagerly</strong>
      </div>
      <div className={styles.links}>
        {!currentUsername
          ? navLinks.map((link) => {
            if (link.label === 'Explore')
              return (
                <NavLink
                  key={link.id}
                  value={link.label}
                  icon={link.icon}
                  href={link.href}
                />
              );
          })
          : navLinks.map((link) => (
            <>
              <NavLink
                key={link.id}
                value={link.label}
                icon={link.icon}
                href={link.href}
              />
            </>
          ))}
      </div>
      <div className={styles.authLinks}>
        {!currentUsername ? (
          <>
            <Link href={'/login'} className={styles.link}>
              Log In
            </Link>
            <Link href={'/login'} className={styles.link}>
              Sign up
            </Link>
          </>
        ) : (
          <div onClick={() => signOut()} className={styles.logoutLink}>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faRightFromBracket} color='#36393e' />
            </div>

            <span>Logout</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationPanel;
