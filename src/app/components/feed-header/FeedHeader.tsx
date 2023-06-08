'use client';
import { useRouter } from 'next/navigation'
import styles from './FeedHeader.module.scss';

type Props = {
 label: string;
 isBack: boolean;
}

const FeedHeader: React.FC<Props> = ({ label, isBack }) => {

 const router = useRouter();

 return (
  <div className={styles.feedHeader}>
   <div className={styles.header}>
    {isBack ? <strong onClick={() => router.push('/')} className={styles.back}>{label}</strong> : <strong className={styles.label}>{label}</strong>}
   </div>
  </div>
 );
}

export default FeedHeader;