'use client';
import { useRouter } from 'next/navigation'
import { SafeUser } from '@/app/types/SafeUser';
import { signOut } from "next-auth/react";

import styles from './FeedHeader.module.scss';
import tabStore from '@/app/store/tabStore';


type Props = {
 label: string;
 isBack: boolean;
}

const FeedHeader: React.FC<Props> = ({ label, isBack }) => {

 const router = useRouter();

 const onBack = () => {
  router.push('/')
  tabStore.setTab('Posts')
 }

 return (
  <div className={styles.feedHeader}>
   <div className={styles.header}>
    {isBack ? <strong onClick={onBack} className={styles.back}>{label}</strong> : <strong className={styles.label}>{label}</strong>}
   </div>

  </div>
 );
}

export default FeedHeader;