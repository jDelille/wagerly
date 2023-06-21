'use client';

import { User } from '@prisma/client';
import Avatar from '../Avatar/Avatar';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react';
import searchStore from '@/app/store/searchStore';

import styles from './UserFeed.module.scss';
import { useEffect, useState } from 'react';

type Props = {
  users: User[]
}

const UserFeed: React.FC<Props> = observer(({ users }) => {

  const router = useRouter();

  const [searchedUsers, setSearchedUsers] = useState<User[]>()

  const storeSearch = searchStore.search

  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      user.name.includes(storeSearch) || user.username.includes(storeSearch)
    );
    setSearchedUsers(filteredUsers);
  }, [users, storeSearch]);


  return (
    <div className={styles.userFeed}>
      {searchedUsers && searchedUsers.length < 1 && (
        <strong className={styles.noResultsMessage}>Could not find anything for these search terms</strong>
      )}
      {searchedUsers && searchedUsers.map((user) => (
        <div key={user.id} className={styles.user} onClick={() => router.push(`user/${user.username}`)}>
          <Avatar photo={user.photo || '/images/placeholder.png'} />
          <div className={styles.displayName}>
            <strong>{user.name}</strong>
            <span>@{user.username}</span>
          </div>
        </div>
      )
      )}
    </div>
  );
})

export default UserFeed;