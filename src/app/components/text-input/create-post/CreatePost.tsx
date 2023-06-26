'use client';

import Gifs from '@/app/components/gifs/Gifs';
import ImageUpload from '@/app/components/image-upload/ImageUpload';
import CreateComment from '@/app/components/text-input/create-comment/CreateComment';
import postPreviewStore from '@/app/store/postPreviewStore';
import Button from '@/app/ui/button/Button';
import useInputLengthValidator from '@/app/utils/inputLengthValidator';
import axios from 'axios';
import { observer } from 'mobx-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiGif } from 'react-icons/hi2';
import TagAndMentionInput from '../tag-and-mention-input/TagAndMentionInput';

import styles from './CreatePost.module.scss';
import { User } from '@prisma/client';

type Props = {
  users: User[]
}

const CreatePost: React.FC<Props> = observer(({ users }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [showGifs, setShowGifs] = useState(false);
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isOpen = postPreviewStore.isOpen;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      league: '',
      postBody: '',
      photo: '',
    },
  });

  const body = watch('postBody');
  const postPhoto = watch('photo');
  const postBodyLength = body.length || 0;

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    data.groupId = null;

    axios
      .post('/api/post', data)
      .then(() => {
        router.push('/');
        router.refresh();
        reset();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false);
        setPhoto('');
      });
  };


  const error = useInputLengthValidator(postBodyLength, 500);

  const clearPhoto = () => {
    setCustomValue('photo', '');
    setPhoto && setPhoto('');
  };

  if (isOpen) {
    return <CreateComment users={users} />;
  }

  return (
    <>
      <div className={styles.createPost}>
        <TagAndMentionInput
          placeholder="What's on your mind?"
          setCustomValue={setCustomValue}
          body={body}
          users={users}
        />
        {photo && (
          <div className={styles.imagePreview}>
            <div className={styles.closeImagePreview} onClick={clearPhoto}>
              <AiFillCloseCircle size={30} />
            </div>

            <Image
              src={photo}
              fill
              alt='Uploaded Image'
              className={styles.imagePreview}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        {postPhoto.url && (
          <div className={styles.imagePreview}>
            <div className={styles.closeImagePreview} onClick={clearPhoto}>
              <AiFillCloseCircle size={30} />
            </div>

            <Image
              src={postPhoto.url}
              fill
              alt='Uploaded Image'
              className={styles.imagePreview}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        {showGifs && (
          <Gifs
            onChange={(image) => setPhoto(image)}
            setCustomValue={setCustomValue}
            register={register}
            errors={errors}
            setShowGifs={setShowGifs}
          />
        )}
        <div className={styles.createPostButtons}>
          <div className={styles.icon}>
            <ImageUpload
              value={photo}
              onChange={(image) => setPhoto(image)}
              setCustomValue={setCustomValue}
              isPost
              disabled={photo.length > 0}
            />
          </div>

          <div className={styles.icon} onClick={() => setShowGifs(true)}>
            <HiGif color='#36393e' size={20} />
          </div>

          {/* <div className={styles.icon}>
            <MdPoll size={22} color='#36393e' />
          </div> */}
          <div className={styles.textCount}>
            {error ? (
              <p className={styles.lengthError}>{500 - postBodyLength}</p>
            ) : (
              <p>{500 - postBodyLength}</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.postButton}>
        <Button
          onClick={handleSubmit(onSubmit)}
          label='Post'
          isButtonDisabled={!body || postBodyLength > 500}
          ariaLabel='Publish post'
        />
      </div>
    </>
  );
});

export default CreatePost;
