'use client';

import styles from './GamebarControls.module.scss';

const GamebarControls: React.FC = () => {
 return (
  <div className={styles.gamebarControls}>
   {/* <span className={styles.option}>Featured Games</span> */}
   <p>More sports coming soon.</p>
   {/* <span className={styles.option}>MLB</span>
   <span className={styles.option}>MLS</span>
   <span className={styles.option}>NFL</span>
   <span className={styles.option}>NBA</span>
   <span className={styles.option}>NHL</span> */}
  </div>
 );
}

export default GamebarControls;