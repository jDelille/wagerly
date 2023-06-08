'use client';

import PostCardBet from './post-card-bet/PostCardBet';
import PostCardHeader from './post-card-header/PostCardHeader';
import PostCardParlay from './post-card-parlay/PostCardParlay';
import PostCardPoll from './post-card-poll/PostCardPoll';
import Image from 'next/image';

import styles from './PostCard.module.scss';

type Props = {
 post: any;
 isExpanded: boolean;
}


const PostCard: React.FC<Props> = ({ post, isExpanded }) => {

 return (
  <div className={styles.postCard}>
   <PostCardHeader user={post.user} createdAt={post.createdAt} postId={post.id} />
   <div className={styles.postBody}>
    <p>{post?.Bet?.thoughts || post?.Parlay?.bets[0].thoughts || post?.body}</p>
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
      // currentUserId={currentUser?.id}
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
   {/* post footer */}
  </div >
 );
}

export default PostCard