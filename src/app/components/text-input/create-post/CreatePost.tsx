'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { MdGifBox, MdPoll } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import ImageUpload from '../../image-upload/ImageUpload';
import Image from 'next/image'
import Button from '../../button/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation'

import styles from './CreatePost.module.scss';
import Gifs from '../../gifs/Gifs';
import postPreviewStore from '@/app/store/postPreviewStore';
import CreateComment from '../create-comment/CreateComment';
import { observer } from 'mobx-react';


const CreatePost = observer(() => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState(false)
  const [showGifs, setShowGifs] = useState(false);
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const isOpen = postPreviewStore.isOpen
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

    const newPost = {
      id: '',
      userId: data.userId,
      body: body,
      photo: photo,
      groupId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      betId: '',
      parlayId: '',
      pollId: '',
      likedIds: [], commentedIds: [], taggedUserIds: [], isPinned: false, tags: []
    }

    axios
      .post('/api/post', data)
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

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 500) {
      setCustomValue('postBody', inputValue);
    } else {
      setCustomValue('postBody', inputValue.slice(0, 500));
    }
  }

  const autosize = () => {
    if (textAreaRef.current) {
      var el = textAreaRef.current;
      setTimeout(function () {
        el.style.cssText = 'height:auto; padding:0';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
      }, 0);
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      const textarea = textAreaRef.current;
      textarea.addEventListener('keydown', autosize);

      return () => {
        textarea.removeEventListener('keydown', autosize);
      };
    }
  }, []);

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

  if (isOpen) {
    return <CreateComment />
  }

  return (
    <>
      <div className={styles.createPost}>
        <textarea
          placeholder="What's on your mind?"
          className={styles.textarea}
          onChange={(event) => {
            event.stopPropagation();
            handleTextareaChange(event)
          }}
          value={body}
          ref={textAreaRef}
          rows={1}>
        </textarea>
        {photo && (
          <div className={styles.imagePreview}>

            <div
              className={styles.closeImagePreview}
              onClick={clearPhoto}>
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

            <div
              className={styles.closeImagePreview}
              onClick={clearPhoto}>
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
            <MdGifBox color="#36393e" size={22} />
          </div>

          <div className={styles.icon}>
            <MdPoll size={22} color='#36393e' />
          </div>
          <div className={styles.textCount}>
            {error ? (
              <p className={styles.lengthError}>{postBodyLength} / 500</p>
            ) : (
              <p>{postBodyLength} / 500</p>
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
})

export default CreatePost;