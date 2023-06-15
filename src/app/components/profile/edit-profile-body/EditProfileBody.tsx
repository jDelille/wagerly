'use client';

import { SafeUser } from '@/app/types/SafeUser';
import { FieldValues, useForm } from 'react-hook-form';

import styles from './EditProfileBody.module.scss';
import Input from '../../input/Input';

type Props = {
 currentUser: SafeUser | null;
}



const EditProfileBody: React.FC<Props> = ({ currentUser }) => {

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
   displayName: '',
   bio: '',
   location: '',
  },
 });

 const setCustomValue = (id: string, value: any) => {
  setValue(id, value, {
   shouldDirty: true,
   shouldValidate: true,
   shouldTouch: true,
  });
 };



 return (
  <div className={styles.editProfileBody}>
   <Input
    label='Display Name'
    type='text'
    value='displayName'
    placeholder={currentUser?.name as string}
    id='displayName'
    register={register}
   />

   <Input
    label='Username'
    type='text'
    value='username'
    placeholder={currentUser?.username as string}
    id='username'
    register={register}
   />

   <div className={styles.bio}>
    <label htmlFor="bio">Bio</label>
    <textarea placeholder={currentUser?.bio as string} />
   </div>


  </div>
 );
}

export default EditProfileBody;