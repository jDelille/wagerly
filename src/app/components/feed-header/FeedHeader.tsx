'use client';
import { useRouter } from 'next/navigation'
import styles from './FeedHeader.module.scss';
import tabStore from '@/app/store/tabStore';
import { FaBars } from 'react-icons/fa';
import Avatar from '../user/Avatar/Avatar';
import { useState } from 'react';
import MobileNavbar from '../mobile-navbar/MobileNavbar';


type Props = {
 label: string;
 isBack: boolean;
 isSportsbook?: boolean;
 currentUserPhoto?: string;
 currentUsername?: string;

}

const FeedHeader: React.FC<Props> = ({ label, isBack, isSportsbook, currentUserPhoto, currentUsername }) => {

 const router = useRouter();

 const [openMenu, setOpenMenu] = useState(false)

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

    <div className={styles.mobile} onClick={() => setOpenMenu(!openMenu)}>
     <Avatar photo={currentUserPhoto as string} />
     <FaBars size={18} color='white' />


    </div>
    {openMenu && (
     <MobileNavbar currentUsername={currentUsername} />
    )}
   </div>

  </div>
 );
}

export default FeedHeader;