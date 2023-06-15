'use client';

import Link from 'next/link';
import { NavLinks } from '@/app/constants/@Links';
import styles from './NavigationPanel.module.scss';

type Props = {
 currentUsername?: string;
};

const NavigationPanel: React.FC<Props> = ({ currentUsername }) => {
 return (
  <div className={styles.navigationPanel}>
   <div className={styles.links}>
    {!currentUsername
     ? NavLinks.navLinks.map((link) => {
      if (link.label === 'Explore')
       return (
        <div className={styles.link} key={link.id}>
         <Link href={link.href}>{link.label}</Link>
        </div>
       );
     })
     : NavLinks.navLinks.map((link) => (
      <>
       <div className={styles.link} key={link.id}>
        <Link href={link.href}> {link.label}</Link>
       </div>
      </>
     ))}
   </div>
  </div>
 );
};

export default NavigationPanel;
