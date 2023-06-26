'use client'

import { SafeUser } from '@/app/types/SafeUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '../../../ui/button/Button';
import styles from './Auth.module.scss';

type Props = {
 currentUser: SafeUser | null;
}

const Auth: React.FC<Props> = ({ currentUser }) => {
 const [shouldRender, setShouldRender] = useState(false);
 const router = useRouter();

 useEffect(() => {
  router.refresh()
  const path = window.location.pathname;
  const shouldRenderColumns = !['/signup', '/login'].includes(path);
  setShouldRender(shouldRenderColumns);
 }, []);

 if (currentUser) {
  return null;
 }


 return (
  <div className={styles.authContainer}>
   <div className={styles.message}>
    <p>Login to follow profiles or groups, like and reply to posts. You can also view sports scores and news, post polls, post images, and post your sports bets.</p>
   </div>
   <div className={styles.authButtons}>
    <Button
     label='Create account'
     onClick={() => router.push('/signup')}
     ariaLabel='Create an account'
     tabIndex={0}
    />
    <Button
     label='Login'
     onClick={() => router.push('/login')}
     ariaLabel='Login'
     tabIndex={0}
    />
   </div>
  </div>
 );
}

export default Auth;