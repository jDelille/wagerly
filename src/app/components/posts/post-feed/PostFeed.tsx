'use client';
import { Post, User } from '@prisma/client';

import PostCard from '../post-card/PostCard';
import PostFeedHeader from './post-feed-header/PostFeedHeader';
import searchStore from '@/app/store/searchStore';
import { observer } from 'mobx-react';
import { SafeUser } from '@/app/types/SafeUser';
import tabStore from '@/app/store/tabStore';
import { useRouter } from 'next/navigation';

import styles from './PostFeed.module.scss';

type Props = {
  posts: any;
  isProfilePage: boolean;
  isSearchPage?: boolean;
  hideHeader?: boolean;
  isMainPage?: boolean;
  currentUser: SafeUser | null;
  users?: User[] | null;
  username?: string;
};

const PostFeed: React.FC<Props> = observer(
  ({ posts, isProfilePage, hideHeader, isMainPage, currentUser }) => {
    const router = useRouter();

    let tab = tabStore.tab || 'Posts';

    const renderPostCards = () => {
      return posts.map((post: Post, index: number) => (
        <li key={index}>
          <PostCard
            post={post}
            key={post?.id}
            currentUser={currentUser}
            isExpanded={false}
          />
        </li>
      ));
    };

    const renderBets = () => {
      return posts.map((post: Post, index: number) => {
        if (post.userBetId) {
          return (
            <li key={index}>
              <PostCard
                post={post}
                key={post?.id}
                currentUser={currentUser}
                isExpanded={false}
              />
            </li>
          );
        }
      });
    };

    const renderTabContent = () => {
      switch (tab) {
        case 'Posts':
          return renderPostCards();
        case 'Bets':
          return renderBets();
        default:
          return null;
      }
    };

    const storeSearch = searchStore.search;

    return (
      <div className={isMainPage ? styles.mainPostFeed : styles.postFeed}>
        {!hideHeader && (
          <PostFeedHeader
            isProfilePage={isProfilePage}
            isMainPage={isMainPage}
          />
        )}
        {!storeSearch && renderTabContent()}
      </div>
    );
  }
);

export default PostFeed;
