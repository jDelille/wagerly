'use client';

import tabStore from '@/app/store/tabStore';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2'

import MobileNavbar from '../../mobile-navbar/MobileNavbar';
import Avatar from '../../user/Avatar/Avatar';
import styles from './FeedHeader.module.scss';
import GamebarControls from './gamebar-controls/GamebarControls';

type Props = {
 label: string;
 isBack: boolean;
 isSportsbook?: boolean;
 currentUserPhoto?: string;
 currentUsername?: string;
 hasControls?: boolean;

}

const FeedHeader: React.FC<Props> = ({ label, isBack, isSportsbook, currentUserPhoto, currentUsername, hasControls }) => {

 const router = useRouter();

 const [openMenu, setOpenMenu] = useState(false)
 const [openControls, setOpenControls] = useState(false)

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
     <Avatar photo={currentUserPhoto as string || '/images/placeholder.png'} />
     <strong>{currentUsername}</strong>
     <FaBars size={18} color='#222222' />
    </div>
    {openMenu && (
     <MobileNavbar currentUsername={currentUsername} />
    )}

    {hasControls && (
     <div className={styles.controls} onClick={() => setOpenControls(!openControls)}>
      <HiAdjustmentsHorizontal size={24} />
      {openControls && (
       <GamebarControls />
      )}
     </div>
    )}
   </div>

  </div>
 );
}

export default FeedHeader;