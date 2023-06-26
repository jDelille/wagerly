'use client';

import { SafeUser } from '@/app/types/SafeUser';
import Image from 'next/image';
import { createContext, useState } from 'react';

import PostCardBet from './post-card-bet/PostCardBet';
import PostCardFooter from './post-card-footer/PostCardFooter';
import PostCardHeader from './post-card-header/PostCardHeader';
import PostCardParlay from './post-card-parlay/PostCardParlay';
import PostCardPoll from './post-card-poll/PostCardPoll';
import styles from './PostCard.module.scss';
import Link from 'next/link';

export const PostContext = createContext<any>(null);

type Props = {
 post: any;
 isExpanded: boolean;
 currentUser: SafeUser | null;
}


const PostCard: React.FC<Props> = ({ post, isExpanded, currentUser }) => {

 const [localLike, setLocalLike] = useState(post.likedIds.includes(currentUser?.id as string))


 const [localLikeCount, setLocalLikeCount] = useState(
  0 || post.likedIds.length);


 const [localBookmark, setLocalBookmark] = useState(currentUser?.bookmarks.includes(post.id))

 const postBody = post?.Bet?.thoughts || post?.Parlay?.bets[0].thoughts || post?.body || post?.UserBet?.body

 const postContextValue = {
  localLike,
  setLocalLike,
  localBookmark,
  setLocalBookmark,
  localLikeCount,
  setLocalLikeCount
 }

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

 const mentionedUsernames = extractMentions(postBody);

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

 const renderedPostBody = renderPostBodyWithLinks(postBody, mentionedUsernames);


 return (
  <PostContext.Provider value={postContextValue}>
   <div className={styles.postCard}>
    <PostCardHeader
     currentUser={currentUser}
     post={post}
    />
    <div className={styles.postBody}>
     <p>{renderedPostBody}</p>
    </div>
    {post.Parlay && post?.Parlay.bets?.length <= 1 || post.UserBet && (
     <PostCardBet post={post.Parlay?.bets || post.UserBet} />
    )}
    {post.userBet && (
     <PostCardBet post={post.userBet} />

    )}
    {post.Parlay && post?.Parlay.bets?.length > 1 && (
     <PostCardParlay
      post={post.Parlay.bets}
      odds={post.Parlay.odds}
      wager={post.Parlay.wager}
      payout={post.Parlay.payout}
      isExpanded={isExpanded}
     />
    )}
    {post.Poll && (
     <div className={styles.postPoll}>
      <PostCardPoll
       post={post.Poll}
       option1Count={post?.Poll?.option1Votes}
       option2Count={post?.Poll?.option2Votes}
      />
     </div>

    )}
    {post?.photo && (
     <div className={post?.photo.url ? styles.postGif : styles.postPhoto}>
      <Image
       src={post?.photo.url || post?.photo}
       fill
       alt='Uploaded Image'
       className={styles.imagePreview}
       style={{ objectFit: 'cover' }}
       onClick={(e) => {
        e.stopPropagation();
        // setImageView(post?.photo.url || post?.photo);
       }}
      />
     </div>
    )}
    <PostCardFooter
     currentUser={currentUser}
     post={post}
    />
   </div >
  </PostContext.Provider>
 );
}

export default PostCard