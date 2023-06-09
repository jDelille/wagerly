'use client';

import postPreviewStore from '@/app/store/postPreviewStore';
import { observer } from 'mobx-react';

import styles from './PostPreview.module.scss';
import Image from 'next/image';
import { IoCloseSharp } from 'react-icons/io5';
import { AiOutlineLink } from 'react-icons/ai';


const PostPreview: React.FC = observer(() => {

 const isOpen = postPreviewStore.isOpen
 const post = postPreviewStore.post;

 const closePostPreview = () => {
  postPreviewStore.setOpen(false)
 }

 if (!isOpen) {
  return null;
 }


 return (
  <div className={styles.postPreview}>
   <div onClick={closePostPreview} className={styles.close}>
    <IoCloseSharp size={20} color='white' />
   </div>
   <div className={styles.postUser}>
    <Image
     src={post?.user.photo || '/images/placeholder.png'}
     alt='profile picture'
     width={25}
     height={25}
    />
    <div className={styles.userName}>
     <p>{post?.user.name} <span>@{post?.user.username}</span></p>
    </div>
   </div>
   <p className={styles.body}>{post?.body}</p>

   {post?.photo && !post?.photo?.url && (
    <div className={styles.media}>
     <AiOutlineLink />
     <a href={post?.photo} target="_blank">{post?.photo}</a>

    </div>
   )}


   {post?.photo?.url && (
    <div className={styles.media}>
     <AiOutlineLink />
     <a href={post?.photo.url} target="_blank">{post?.photo.url}</a>

    </div>
   )}

  </div>
 );
});

export default PostPreview