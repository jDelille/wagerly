import Loader from "@/app/components/loader/Loader";

import styles from './Page.module.scss';

const Loading = () => (
 <div className={styles.main}>
  <div className={styles.loading}>
   <Loader />
  </div>
 </div>
)

export default Loading;