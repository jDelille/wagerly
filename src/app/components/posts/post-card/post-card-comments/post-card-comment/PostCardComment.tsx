'use client';

import Avatar from '@/app/components/user/Avatar/Avatar';
import { SafeUser } from '@/app/types/SafeUser';
import { Comment } from '@prisma/client';
import Link from 'next/link';

import PostCardFooter from '../../post-card-footer/PostCardFooter';
import styles from './PostCardComments.module.scss';

type Props = {
 comment: Comment;
 postUsername: string;
 post: any;
 postId: string;
 currentUser: SafeUser | null;
}


const PostCardComment: React.FC<Props> = ({ comment, postUsername, post, postId, currentUser }) => {

 const commentBody = comment.body

 const extractMentions = (text: string) => {
  const mentionRegex = /@(\w+)/g;
  const mentions = [];
  let match;

  while ((match = mentionRegex.exec(text))) {
   const username = match[1];
   mentions.push(username);
  }

  return mentions;
 };

 const mentionedUsernames = extractMentions(commentBody);

 const renderPostBodyWithLinks = (postBody: string, mentionedUsernames: any) => {
  const parts = postBody.split(/(@\w+)/g);

  return parts.map((part, index) => {
   if (mentionedUsernames.includes(part.slice(1))) {
    return (
     <Link href={`/user/${part.slice(1)}`} key={index} className={styles.taggedUsername}>
      {part}
     </Link>
    );
   } else {
    return <span key={index}>{part}</span>;
   }
  });
 };


 const renderedCommentBody = renderPostBodyWithLinks(commentBody, mentionedUsernames);


 return (
  <div className={styles.postCardComment}>
   <div className={styles.header}>
    <div className={styles.avatar}>
     <div className={styles.line}></div>
     <Avatar photo={comment.photo || '/images/placeholder.png'} username={comment.username} />
    </div>

    <div className={styles.displayName}>
     <strong>{comment.name}</strong>
     <span>@{comment.username}</span>
    </div>
   </div>
   <div className={styles.body}>
    <p><Link href={`/user/${postUsername}`}>@<span>{postUsername}</span></Link> {renderedCommentBody}</p>
   </div>
   {/* <div className={styles.footer}>
    <PostCardFooter post={post} currentUser={currentUser} />
   </div> */}

  </div>
 );
}

export default PostCardComment;