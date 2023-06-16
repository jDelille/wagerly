'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react'

import Input from '../../input/Input';
import Button from '../../button/Button';

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
            placeholder="John Smith"
            value={name}
            required
            tabIndex={0}

          />
          <Input
            type="text"
            label='Username'
            id='username'
            register={register}
            placeholder="@john"
            required
            value={username}
            tabIndex={0}


          />
          <Input
            type="text"
            label='Email'
            id='email'
            register={register}
            placeholder="something@email.com"
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
          <Button label='Signup' isButtonDisabled={!email || !name || !username || !password} tabIndex={0} />
          <div className={styles.footer}>
            <p>Already have an account?  <Link href='/login'>Log in</Link></p>

          </div>
        </form>
      </div>
    </div>

  );
}

export default Signup;