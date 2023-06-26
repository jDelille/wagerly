'use client';

import axios from 'axios';
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Button from '../../../ui/button/Button';
import Input from '../../../ui/input/Input';
import styles from './Signup.module.scss';

const Signup = () => {

  const router = useRouter();

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      photo: '',
    },
  });

  const email = watch('email')
  const password = watch("password")
  const name = watch('name')
  const username = watch("username")


  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then(() => {
        signIn('credentials', {
          ...data,
          redirect: false
        }).then(() => {
          router.push('/');
          router.refresh()
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  return (
    <div className={styles.page}>
      <div className={styles.authContainer}>
        <div className={styles.header}>
          <h1>Lets get you set up on Wagerly.</h1>
          <p>With an account youll be able to post, follow users, like, comment, and fully interact with other users on the site.</p>
        </div>
        {error && <div className={styles.error}>
          <strong>{error}</strong></div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            label='Name'
            id='name'
            register={register}
            placeholder="Enter your name"
            value={name}
            required
            tabIndex={0}

          />
          <Input
            type="text"
            label='Username'
            id='username'
            register={register}
            placeholder="Enter your username"
            required
            value={username}
            tabIndex={0}


          />
          <Input
            type="text"
            label='Email'
            id='email'
            register={register}
            placeholder="Enter your email"
            required
            value={email}
            tabIndex={0}

          />
          <Input
            type="password"
            label='Password'
            id='password'
            register={register}
            placeholder="********"
            required
            value={password}
            tabIndex={0}

          />
          <Button label='Signup' tabIndex={0} />
          <div className={styles.footer}>
            <p>Already have an account?  <Link href='/login'>Log in</Link></p>

          </div>
        </form>
      </div>
    </div>

  );
}

export default Signup;