'use client';

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { IconType } from "react-icons";

import styles from './NavigationPanel.module.scss';

type Props = {
 value: string;
 icon: IconProp
 href: string;
}

const NavLink: React.FC<Props> = ({ value, icon, href }) => {
 return (
  <Link href={href} className={styles.link}>
   <FontAwesomeIcon icon={icon} color="#282c37" className={styles.icon} />
   <span className={styles.value}>{value}</span>
  </Link>
 );
}

export default NavLink;