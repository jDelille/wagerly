'use client';

import Link from "next/link";
import { IconType } from "react-icons";
import styles from './NavigationPanel.module.scss';

type Props = {
 value: string;
 icon: IconType;
 href: string;
}

const NavLink: React.FC<Props> = ({ value, icon: Icon, href }) => {
 return (
  <Link href={href} className={styles.link}>
   <Icon size={18} className={styles.icon} color="#3c3f47" />
   <span className={styles.value}>{value}</span>
  </Link>
 );
}

export default NavLink;