'use client';

import EditProfileHeader from '@/app/components/profile/edit-profile-header/EditProfileHeader';
import { SafeUser } from '@/app/types/SafeUser';
import Input from '@/app/ui/input/Input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import styles from './EditProfileBody.module.scss';
import ImageUpload from '../image-upload/ImageUpload';
import CoverImageUpload from '../image-upload/CoverImageUpload';

type Props = {
  currentUser: SafeUser | null;
}

const EditProfileBody: React.FC<Props> = ({ currentUser }) => {

  const router = useRouter();

  const [photo, setPhoto] = useState(currentUser?.photo)
  const [coverPhoto, setCoverPhoto] = useState(currentUser?.coverPhoto || "")

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      username: '',
      bio: '',
      draftKings: '',
      betSperts: ''
    },
  });

  const name = watch('name');
  const username = watch("username");
  const bio = watch("bio");
  const draftKings = watch("draftKings");
  const betSperts = watch("betSperts")

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };



  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const payload = {
      ...data,
      photo,
      coverPhoto
    }

    axios
      .post('/api/profile', data)
      .then(() => {
        router.refresh();
        reset();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };



  return (
    <>
      <EditProfileHeader onClick={handleSubmit(onSubmit)} />
      <div className={styles.editProfileBody}>
        <h4>Basic Information</h4>
        <Input
          label='Display Name'
          type='text'
          value={name}
          placeholder={currentUser?.name as string}
          id='name'
          register={register}
          tabIndex={0}
        />
        <Input
          label='Username'
          type='text'
          value={username}
          placeholder={currentUser?.username as string}
          id='username'
          register={register}
          tabIndex={0}
        />

        <div className={styles.imageUpload}>
          <label>Profile picture</label>
          <span>PNG, GIF or JPG. At most 2 MB. Will be downscaled to 400x400px</span>
          <ImageUpload
            onChange={(image) => setPhoto(image)}
            setCustomValue={setCustomValue}
            isRegister
          />
        </div>
        <div className={styles.imageUpload}>
          <label>Cover picture</label>
          <span>PNG, GIF or JPG. At most 2 MB. Will be downscaled to 1500x500px</span>
          <CoverImageUpload
            onChange={(image) => setCoverPhoto(image)}
            setCustomValue={setCustomValue}
            isRegister
          />
        </div>



        {/* 
        <div className={styles.avatar}>
          <label>Avatar</label>
          <div className={styles.img}>
            <ImageUpload
              value={photo as string}
              onChange={(image) => setPhoto(image)}
              setCustomValue={setCustomValue}
              isRegister
            />
          </div>
        </div>

         */}

        {/* <div className={styles.bio}>
          <label htmlFor="bio">Bio</label>
          <textarea
            placeholder={currentUser?.bio as string}
            id='bio'
            value={bio}
            onChange={(e) => setCustomValue('bio', e.target.value)}
          />
        </div> */}

        {/* <div className={styles.externalLinks}>
          <label className={styles.linksLogo}>Link your other socials</label>
          <Input
            label='Draftkings'
            type='text'
            value={draftKings}
            placeholder={currentUser?.draftKingsLink || 'Draftkings Profile Link'}
            id='draftKings'
            register={register}
            tabIndex={0}
            hasLogo={true}
            logo='/images/draftkings.png'
          />
          <Input
            label='Betsperts'
            type='text'
            value={betSperts}
            placeholder={currentUser?.betSpertsLink || 'Betsperts Profile Link'}
            id='betSperts'
            register={register}
            tabIndex={0}
            hasLogo={true}
            logo='/images/betsperts.jpg'
          />
        </div> */}

      </div>
    </>

  );
}

export default EditProfileBody;