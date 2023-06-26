import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link";

import styles from './Nav.module.scss'

type Props = {
 label: string;
 id: number;
 icon: IconProp
 href: string;
 hasNotification?: boolean;
}


const NavLink: React.FC<Props> = ({ id, label, icon, href, hasNotification }) => {
 return (
  <div className={styles.link}>
   {hasNotification && label === 'Notifications' && (
    <div className={styles.dot}></div>
   )}
   <div className={styles.iconWrapper}>
    <FontAwesomeIcon icon={icon} color="#282c37" />
   </div>
   <Link href={href} key={id}>{label}</Link>
  </div>
 );
}

export default NavLink;