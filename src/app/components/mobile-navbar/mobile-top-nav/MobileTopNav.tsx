'use client'

import styles from './MobileTopNav.module.scss';

type Props = {

}

const MobileTopNav: React.FC<Props> = () => {
 return (
  <div className={styles.nav}>
   <strong>Wagerly</strong>
  </div>
 );
}

export default MobileTopNav;