import Link from "next/link";
import { IconType } from "react-icons";

import styles from './Nav.module.scss'

type Props = {
 label: string;
 id: number;
 icon: IconType
}


const NavLink: React.FC<Props> = ({ id, label, icon: Icon }) => {
 return (
  <div className={styles.link}>
   <Icon color="lightgray" />
   <Link href={'/'} key={id}>{label}</Link>
  </div>
 );
}

export default NavLink;