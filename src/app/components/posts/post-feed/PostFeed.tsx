'use client'
import { Post, User } from '@prisma/client';

import PostCard from '../post-card/PostCard';
import PostFeedHeader from './post-feed-header/PostFeedHeader';
import searchStore from '@/app/store/searchStore';
import { observer } from 'mobx-react';
import { SafeUser } from '@/app/types/SafeUser';
import tabStore from '@/app/store/tabStore';
import UserBox from '../../user/user-box/UserBox';
import News from '../../news/News';
import { ExtendedPost } from '@/app/types/ExtendedPost';
import { useIntersection } from '@mantine/hooks';
import { useEffect, useRef } from 'react';

import styles from './PostFeed.module.scss';
import { useInfiniteQuery } from '@tanstack/react-query';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import axios from 'axios';


type Props = {
  initialPosts: any;
  isProfilePage: boolean;
  isSearchPage?: boolean;
  hideHeader?: boolean;
  isMainPage?: boolean;
  currentUser: SafeUser | null;
  users?: User[] | null
}

const PostFeed: React.FC<Props> = observer(({ initialPosts, isProfilePage, isSearchPage, hideHeader, isMainPage, currentUser, users }) => {

  const lastPostRef = useRef<HTMLElement>(null)
  let tab = tabStore.tab || "Posts"

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1
  })

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['infinite-query'],
    async ({ pageParam = 1 }) => {
      const query = `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`

      const { data } = await axios.get(query)
      return data as any;
    }, {
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialData: {
      pages: [initialPosts], pageParams: [1]
    }
  }
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage])

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts



  const renderPostCards = () => {
    return posts
      .map((post: any, index: number) => {
        if (index === posts.length - 1) {
          return (
            <li key={index} ref={ref}>
              <PostCard
                post={post}
                key={post?.id}
                currentUser={currentUser}
                isExpanded={false}
              />
            </li>
          )
        } else {
          return (
            <PostCard
              post={post}
              key={post.id}
              currentUser={currentUser}
              isExpanded={false}
            />
          )
        }
      });
  };

  const renderBets = () => {
    return posts
      .map((post: any, index: number) => {
        if (index === posts.length - 1) {
          return (
            <li key={index} ref={ref}>
              <PostCard
                post={post}
                key={post?.id}
                currentUser={currentUser}
                isExpanded={false}
              />
            </li>
          )
        } else {
          return (
            <PostCard
              post={post}
              key={post.id}
              currentUser={currentUser}
              isExpanded={false}
            />
          )
        }
      });
  };

  // const renderPeople = () => {
  //   return (
  //     <div className={styles.peopleFeed}>
  //       {users?.map((user) => (
  //         <UserBox key={user?.id} user={user} />
  //       ))}
  //     </div>
  //   );
  // };

  // const renderNews = () => {
  //   return (
  //     <div className={styles.newsFeed}>
  //       <News />
  //     </div>
  //   );
  // };


  const renderTabContent = () => {
    switch (tab) {
      case 'Posts':
        return renderPostCards();
      case 'Bets':
        return renderBets();
      // case 'People':
      //   return renderPeople();
      // case 'News':
      //   return renderNews();
      // case 'media':
      //  return renderMedia();
      default:
        return null;
    }
  };

  const storeSearch = searchStore.search

  return (
    <div className={isMainPage ? styles.mainPostFeed : styles.postFeed}>
      {!hideHeader && (
        <PostFeedHeader isProfilePage={isProfilePage} isMainPage={isMainPage} />
      )}

      {!storeSearch && (
        renderTabContent()
      )}
      {/* 
      {storeSearch && (
        posts.map((post: any) => {
          if (post.body?.includes(storeSearch) || post?.Bet?.thoughts.includes(storeSearch) || post?.UserBet?.body.includes(storeSearch) || post?.Parlay?.bets[0].thoughts.includes(storeSearch)) {
            return (
              <PostCard key={post.id} post={post} isExpanded={false} currentUser={currentUser} />
            )
          }
        })
      )} */}

    </div>
  );
})

export default PostFeed;