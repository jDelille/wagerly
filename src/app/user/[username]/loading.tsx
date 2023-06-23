
import Loader from "@/app/components/loader/Loader";
import styles from './Page.module.scss';


const Loading = () => (
 <div className={styles.loading}>
  <Loader />
 </div>
)

export default Loading;