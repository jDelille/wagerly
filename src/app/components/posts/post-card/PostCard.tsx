'use client';

import { SafeUser } from '@/app/types/SafeUser';
import extractMentions from '@/app/utils/extractMentions';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useEffect, useState } from 'react';

import PostCardBet from './post-card-bet/PostCardBet';
import PostCardFooter from './post-card-footer/PostCardFooter';
import PostCardHeader from './post-card-header/PostCardHeader';
import PostCardPoll from './post-card-poll/PostCardPoll';
import styles from './PostCard.module.scss';

export const PostContext = createContext<any>(null);

type Props = {
 post: any;
 isExpanded: boolean;
 currentUser: SafeUser | null;
}


const PostCard: React.FC<Props> = ({ post, isExpanded, currentUser }) => {

 const router = useRouter();

 const [localLike, setLocalLike] = useState(post.likedIds.includes(currentUser?.id as string))

 const [localLikeCount, setLocalLikeCount] = useState(
  0 || post.likedIds.length);

 const [localBookmark, setLocalBookmark] = useState(currentUser?.bookmarks.includes(post.id))

 const [status, setStatus] = useState<string>('')
 const [outcome, setOutcome] = useState<string>('')
 const [homeScore, setHomeScore] = useState()
 const [awayScore, setAwayScore] = useState()

 const postBody = post?.Bet?.thoughts || post?.Parlay?.bets[0].thoughts || post?.body || post?.UserBet?.body

 const postContextValue = {
  localLike,
  setLocalLike,
  localBookmark,
  setLocalBookmark,
  localLikeCount,
  setLocalLikeCount
 }

 const mentionedUsernames = extractMentions(postBody);

 const renderPostBodyWithLinks = (postBody: string, mentionedUsernames: any) => {
  const parts = postBody?.split(/(@\w+)/g);

  return parts?.map((part, index) => {
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


 const onCheck = useCallback((id: string, userId: string) => {
  if (post?.UserBet?.outcome !== '') {
   return;
  }

  axios.post(`/api/updateBet/${id}`).then(() => {
   router.refresh()
  }).catch((error) => {
   console.log(error)
  })

 }, [post?.UserBet?.outcome, router])

 useEffect(() => {
  onCheck(post?.UserBet?.id, post.user.username)
 }, [])


 return (
  <PostContext.Provider value={postContextValue}>
   <div className={styles.postCard}>
    <PostCardHeader
     currentUser={currentUser}
     post={post}
    />
    <div className={styles.postBody}>
     <p>{renderedPostBody}</p>
     {post?.UserBet && post?.UserBet.outcome !== '' && (
      <span className={post?.UserBet?.outcome === 'win' ? styles.win : styles.loss}>{post?.UserBet?.outcome}</span>
     )}
    </div>

    {post.UserBet && (
     <PostCardBet post={post.UserBet} />
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