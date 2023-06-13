'use client'
import { Post, User } from '@prisma/client';

import styles from './PostFeed.module.scss';
import PostCard from '../post-card/PostCard';
import PostFeedHeader from './post-feed-header/PostFeedHeader';
import searchStore from '@/app/store/searchStore';
import { observer } from 'mobx-react';
import { SafeUser } from '@/app/types/SafeUser';
import tabStore from '@/app/store/tabStore';
import UserBox from '../../user/user-box/UserBox';
import News from '../../news/News';

type Props = {
  posts: any;
  isProfilePage: boolean;
  isSearchPage?: boolean;
  hideHeader?: boolean;
  isMainPage?: boolean;
  currentUser: SafeUser | null;
  users?: User[] | null
}

const PostFeed: React.FC<Props> = observer(({ posts, isProfilePage, isSearchPage, hideHeader, isMainPage, currentUser, users }) => {


  const renderPostCards = () => {
    return posts.map((post: Post) => (
      <PostCard
        post={post}
        key={post.id}
        currentUser={currentUser}
        isExpanded={false}
      />
    ));
  };

  const renderBets = () => {
    return posts
      .filter((post: any) => post?.Bet || post?.Parlay || post?.UserBet)
      .map((post: Post) => (
        <PostCard
          post={post}
          key={post.id}
          currentUser={currentUser}
          isExpanded={false}
        />
      ));
  };

  const renderPeople = () => {
    return (
      <div className={styles.peopleFeed}>
        {users?.map((user) => (
          <UserBox key={user?.id} user={user} />
        ))}
      </div>
    );
  };

  const renderNews = () => {
    return (
      <div className={styles.newsFeed}>
        <News />
      </div>
    );
  };


  let tab = tabStore.tab || "Posts"

  const renderTabContent = () => {
    switch (tab) {
      case 'Posts':
        return renderPostCards();
      case 'Bets':
        return renderBets();
      case 'People':
        return renderPeople();
      case 'News':
        return renderNews();
      // case 'media':
      //  return renderMedia();
      default:
        return null;
    }
  };

  const storeSearch = searchStore.search

  return (
    <div className={styles.postFeed}>
      {!hideHeader && (
        <PostFeedHeader isProfilePage={isProfilePage} isMainPage={isMainPage} />
      )}

      {!storeSearch && (
        renderTabContent()
      )}

      {storeSearch && (
        posts.map((post: any) => {
          if (post.body?.includes(storeSearch) || post?.Bet?.thoughts.includes(storeSearch) || post?.UserBet?.body.includes(storeSearch) || post?.Parlay?.bets[0].thoughts.includes(storeSearch)) {
            return (
              <PostCard key={post.id} post={post} isExpanded={false} currentUser={currentUser} />
            )
          }
        })
      )}

    </div>
  );
})

export default PostFeed;