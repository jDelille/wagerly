'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import styles from './CreateComment.module.scss';
import axios from 'axios';
import postPreviewStore from '@/app/store/postPreviewStore';
import Button from '../../button/Button';
import ImageUpload from '../../image-upload/ImageUpload';
import { MdGifBox, MdPoll } from 'react-icons/md';

const CreateComment = () => {
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

    // const newPost = {
    //  id: '',
    //  userId: data.userId,
    //  body: body,
    //  photo: photo,
    //  groupId: null,
    //  createdAt: new Date(),
    //  updatedAt: new Date(),
    //  betId: '',
    //  parlayId: '',
    //  pollId: '',
    //  likedIds: [], commentedIds: [], taggedUserIds: [], isPinned: false, tags: []
    // }

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
        <textarea
          placeholder={`@${postUsername}`}
          className={styles.textarea}
          onChange={(event) => {
            event.stopPropagation();
            handleTextareaChange(event)
          }}
          value={body}
          ref={textAreaRef}
          rows={1}>
        </textarea>
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