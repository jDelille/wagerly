'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import axios from 'axios';

import Input from '../../input/Input';
import Button from '../../button/Button';

import styles from './Login.module.scss';


const Login = () => {

 const router = useRouter();

 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState("");

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
   await axios.post('http://localhost:5000/auth/login', {
    email,
    password
   }).then((res) => {

    if (res.data.message === 'User does not exist.') {
     return setError(res.data.message)
    }

    if (res.data.message === 'Invalid E-mail address or password.') {
     return setError(res.data.message)
    }
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userId', res.data.userID);

    return router.push('/')
   })
  } catch (error) {
   console.log(error)
  }
 }

 return (
  <div className={styles.page}>
   <div className={styles.authContainer}>
    <div className={styles.header}>
     <h1>Login to Wagerly</h1>
     <p>Login with your <span>Wagerly</span> credentials. If you dont have an account yet, you can create a free one to get started.</p>
    </div>
    {error && <div className={styles.error}>
     <strong>{error}</strong></div>}
    <form action='POST' onSubmit={handleSubmit}>
     <Input
      id='email'
      type='text'
      label='Email'
      placeholder='something@email.com'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
     />
     <Input
      id='password'
      type='password'
      label='Password'
      placeholder='********'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
     />
     <Button label='Log in' />
     <div className={styles.footer}>
      <Link href='/signup'>Create an account</Link>
     </div>
    </form>
   </div>
  </div>

 );
}

export default Login;