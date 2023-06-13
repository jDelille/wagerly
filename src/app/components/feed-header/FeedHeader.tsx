'use client';
import { useRouter } from 'next/navigation'
import styles from './FeedHeader.module.scss';
import tabStore from '@/app/store/tabStore';


type Props = {
 label: string;
 isBack: boolean;
 isSportsbook?: boolean;
}

const FeedHeader: React.FC<Props> = ({ label, isBack, isSportsbook }) => {

 const router = useRouter();

 const onBack = () => {

  if (isSportsbook) {
   return router.push('/sportsbook')
  }

  router.push('/')
  tabStore.setTab('Posts')
 }



 return (
  <div className={styles.feedHeader}>
   <div className={styles.header}>
    {isBack || isSportsbook ? <strong onClick={onBack} className={styles.back}>{isSportsbook ? 'Back' : label}</strong> : <strong className={styles.label}>{label}</strong>}
   </div>

  </div>
 );
}

export default FeedHeader;