'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import axios from 'axios';

import Input from '../../input/Input';
import Button from '../../button/Button';

import styles from './Signup.module.scss';


const Signup = () => {

 const router = useRouter();

 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState(null)

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
     <h1>Lets get you set up on Wagerly.</h1>
     <p>With an account youll be able to post, follow users, like, comment, and fully interact with other users on the site.</p>
    </div>
    {error && <div className={styles.error}>
     <strong>{error}</strong></div>}
    <form action='POST' onSubmit={handleSubmit}>
     <Input
      type="text"
      label='Name'
      id='name'
      onChange={(e) => setName(e.target.value)}
      placeholder="John Smith"
      value={name}
      required
     />
     <Input
      type="text"
      label='Email'
      id='email'
      onChange={(e) => setEmail(e.target.value)}
      placeholder="something@email.com"
      value={email}
      required
     />
     <Input
      type="password"
      label='Password'
      id='password'
      onChange={(e) => setPassword(e.target.value)}
      placeholder="********"
      value={password}
      required
     />
     <Button label='Log in' />
     <div className={styles.footer}>
      <p>Already have an account?  <Link href='/login'>Log in</Link></p>

     </div>
    </form>
   </div>
  </div>

 );
}

export default Signup;