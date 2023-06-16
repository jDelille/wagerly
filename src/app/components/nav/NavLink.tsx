import Link from "next/link";
import { IconType } from "react-icons";

import styles from './Nav.module.scss'

type Props = {
 label: string;
 id: number;
 icon: IconType
 href: string;
}


const NavLink: React.FC<Props> = ({ id, label, icon: Icon, href }) => {
 return (
  <div className={styles.link}>
   <Icon color="#282c37" />
   <Link href={href} key={id}>{label}</Link>
  </div>
 );
}

export default NavLink;