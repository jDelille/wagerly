'use client';
import { useRouter } from 'next/navigation'
import { SafeUser } from '@/app/types/SafeUser';
import { signOut } from "next-auth/react";

import styles from './FeedHeader.module.scss';


type Props = {
 label: string;
 isBack: boolean;
 currentUser: SafeUser | null;
}

const FeedHeader: React.FC<Props> = ({ label, isBack, currentUser }) => {

 const router = useRouter();

 return (
  <div className={styles.feedHeader}>
   <div className={styles.header}>
    {isBack ? <strong onClick={() => router.push('/')} className={styles.back}>{label}</strong> : <strong className={styles.label}>{label}</strong>}
   </div>
   {currentUser && (
    <button onClick={() => signOut()}>Logout</button>
   )}
  </div>
 );
}

export default FeedHeader;