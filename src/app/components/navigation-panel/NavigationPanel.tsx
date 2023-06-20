'use client';

import Link from 'next/link';
import { NavLinks } from '@/app/constants/@Links';
import styles from './NavigationPanel.module.scss';
import NavLink from './NavLink';

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
    </div>
  );
};

export default NavigationPanel;
