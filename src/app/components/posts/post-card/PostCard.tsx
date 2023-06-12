'use client';

import PostCardBet from './post-card-bet/PostCardBet';
import PostCardHeader from './post-card-header/PostCardHeader';
import PostCardParlay from './post-card-parlay/PostCardParlay';
import PostCardPoll from './post-card-poll/PostCardPoll';
import PostCardFooter from './post-card-footer/PostCardFooter';
import { SafeUser } from '@/app/types/SafeUser';
import { useState, createContext } from 'react';
import Image from 'next/image';


import styles from './PostCard.module.scss';

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

 const postBody = post?.Bet?.thoughts || post?.Parlay?.bets[0].thoughts || post?.body

 const postContextValue = {
  localLike,
  setLocalLike,
  localBookmark,
  setLocalBookmark,
  localLikeCount,
  setLocalLikeCount
 }




 return (
  <PostContext.Provider value={postContextValue}>
   <div className={styles.postCard}>
    <PostCardHeader
     currentUser={currentUser}
     post={post}
    />
    <div className={styles.postBody}>
     <p>{postBody}</p>
    </div>
    {post.Parlay && post?.Parlay.bets?.length <= 1 && (
     <PostCardBet post={post.Parlay.bets} />
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