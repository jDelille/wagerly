'use client'

import Button from '../../button/Button';
import { useRouter } from 'next/navigation';

import styles from './Auth.module.scss';

const Auth = () => {

 const shouldRenderColumns = (path: string) => {
  return !['/signup', '/login'].includes(path);
 };

 const router = useRouter();

 if (!shouldRenderColumns(window.location.pathname)) {
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
    />
    <Button
     label='Login'
     onClick={() => router.push('/login')}
     ariaLabel='Login'
    />
   </div>
  </div>
 );
}

export default Auth;