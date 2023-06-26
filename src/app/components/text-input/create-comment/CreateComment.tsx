'use client';

import ImageUpload from '@/app/components/image-upload/ImageUpload';
import postPreviewStore from '@/app/store/postPreviewStore';
import Button from '@/app/ui/button/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { MdGifBox, } from 'react-icons/md';
import TagAndMentionInput from '../tag-and-mention-input/TagAndMentionInput';
import styles from './CreateComment.module.scss';
import { User } from '@prisma/client';

type Props = {
  users: User[]
}

const CreateComment: React.FC<Props> = ({ users }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false)
  const [photo, setPhoto] = useState('');
  const [error, setError] = useState(false)
  const [showGifs, setShowGifs] = useState(false);
  const [showOutline, setShowOutline] = useState(false);

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
  const postBodyLength = body.length || 0

  const postId = postPreviewStore.post.id
  const postUsername = postPreviewStore.post.user.username

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
      .post(`/api/comment/${postId}`, data)
      .then(() => {
        router.push('/')
        router.refresh();
        reset();
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setIsLoading(false);
        setPhoto("")
      });
  };


  useEffect(() => {
    if (postBodyLength > 500) {
      setError(true)
    } else {
      setError(false)
    }
  }, [postBodyLength])

  const clearPhoto = () => {
    setCustomValue('photo', '');
    setPhoto && setPhoto('')
  }

  useEffect(() => {
    const containerElement = containerRef.current;

    if (postPreviewStore.post) {
      setShowOutline(true)
    }

    setTimeout(() => {
      setShowOutline(false);
    }, 1000);
  }, [postPreviewStore.post]);



  return (
    <>
      <div
        className={`${styles.createComment} ${showOutline ? styles.outline : ''}`}
        ref={containerRef}
      >
        <TagAndMentionInput
          placeholder={`@${postUsername}`}
          setCustomValue={setCustomValue}
          body={body}
          users={users}
        />
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
            <MdGifBox color="#36393e" size={22} />
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
          label='Comment'
          isButtonDisabled={!body || postBodyLength > 500}
          ariaLabel='Publish comment'
        />

      </div>
    </>

  );
}

export default CreateComment;