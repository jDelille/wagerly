'use client';

import { SafeUser } from '@/app/types/SafeUser';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import styles from './EditProfileBody.module.scss';
import Input from '../../input/Input';
import ImageUpload from '../../image-upload/ImageUpload';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EditProfileHeader from '../edit-profile-header/EditProfileHeader';

type Props = {
 currentUser: SafeUser | null;
}

const EditProfileBody: React.FC<Props> = ({ currentUser }) => {

 const router = useRouter();

 const [photo, setPhoto] = useState(currentUser?.photo)
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
  },
 });

 const name = watch('name');
 const username = watch("username");
 const bio = watch("bio");

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
   photo
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

    <div className={styles.avatar}>
     <label>Avatar</label>
     <div className={styles.img}>
      <ImageUpload
       value={photo as string}
       onChange={(image) => setPhoto(image)}
       setCustomValue={setCustomValue}
       isRegister
      />
      {/* <MdOutlineAddPhotoAlternate size={36} /> */}
     </div>

    </div>

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

    <div className={styles.bio}>
     <label htmlFor="bio">Bio</label>
     <textarea
      placeholder={currentUser?.bio as string}
      id='bio'
      value={bio}

     />
    </div>

   </div>
  </>

 );
}

export default EditProfileBody;