'use client';

import Button from '@/app/ui/button/Button';
import Input from '@/app/ui/input/Input';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import styles from './Login.module.scss';

const Login = () => {
 const router = useRouter();

 const [error, setError] = useState('');
 const [isLoading, setIsLoading] = useState(false);

 const {
  register,
  handleSubmit,
  formState: { errors },
  watch,
  reset,
 } = useForm<FieldValues>({
  defaultValues: {
   email: '',
   password: '',
  },
 });

 const email = watch('email');
 const password = watch('password');

 const onSubmit: SubmitHandler<FieldValues> = (data) => {
  setIsLoading(true);

  signIn('credentials', {
   ...data,
   redirect: false,
  }).then((callback) => {
   setIsLoading(false);

   if (callback?.ok) {
    router.push('/');
    router.refresh();
   }

   if (callback?.error) {
    setError('Invalid credentials');
   }
  });
 };

 const signIntoDemoAccount = () => {
  setIsLoading(true);

  signIn('credentials', {
   email: 'buzz@gmail.com',
   password: 'password',
   redirect: false,
  }).then((callback) => {
   setIsLoading(false);

   if (callback?.ok) {
    router.push('/');
    router.refresh();
   }
   if (callback?.error) {
    setError('Invalid credentials');
   }
  });
 };

 return (
  <div className={styles.page}>
   <div className={styles.authContainer}>
    <div className={styles.header}>
     <h1>Login to Wagerly</h1>
     <p>
      Login with your <span>Wagerly</span> credentials. If you dont have
      an account yet, you can create a free one to get started.
     </p>
    </div>
    {error && (
     <div className={styles.error}>
      <strong>{error}</strong>
     </div>
    )}
    <form onSubmit={handleSubmit(onSubmit)}>
     <Input
      id='email'
      type='text'
      label='Email'
      placeholder='something@email.com'
      register={register}
      value={email}
      tabIndex={1}
     />
     <Input
      id='password'
      type='password'
      label='Password'
      placeholder='••••••••'
      value={password}
      register={register}
      tabIndex={2}
     />
     <Button label='Log in' tabIndex={3} />
     <div className={styles.footer}>
      <Link href='/signup'>Create an account</Link>
      <p>or</p>
      <p
       tabIndex={3}
       onClick={signIntoDemoAccount}
       className={styles.demoLink}
      >
       Sign into demo account
      </p>
     </div>
     <div></div>
    </form>
   </div>
  </div>
 );
};

export default Login;
