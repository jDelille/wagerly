'use client';

import { faBaseballBatBall, faBell, faBookmark, faHashtag, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './Nav.module.scss';
import NavLink from './NavLink';

type Props = {
  currentUsername?: string;
  hasNotification?: boolean;
}



const Nav: React.FC<Props> = ({ currentUsername, hasNotification }) => {

  const links = [
    {
      id: 1,
      label: 'Explore',
      icon: faHashtag,
      href: '/'
    },
    {
      id: 2,
      label: 'Sportsbook',
      icon: faBaseballBatBall,
      href: '/sportsbook'
    },
    {
      id: 3,
      label: 'Profile',
      icon: faUser,
      href: `/user/${currentUsername}`
    },
    {
      id: 4,
      label: 'Notifications',
      icon: faBell,
      href: `/notifications/${currentUsername}`,
      hasNotification: hasNotification
    },
    {
      id: 5,
      label: 'Bookmarks',
      icon: faBookmark,
      href: `/bookmarks/${currentUsername}`
    },
  ];


  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <strong>Wagerly</strong>
      </div>
      <div className={styles.links}>
        {!currentUsername ? (
          links.map((link) => {
            if (link.label === 'Explore' || link.label === 'Sportsbook')
              return (
                <NavLink key={link.id} label={link.label} id={link.id} icon={link.icon} href={link.href} />
              )
          })
        ) : (
          links.map((link) => (
            <NavLink key={link.id} label={link.label} id={link.id} icon={link.icon} href={link.href} hasNotification={hasNotification} />
          ))
        )}

      </div>
    </div>
  );
}

export default Nav;