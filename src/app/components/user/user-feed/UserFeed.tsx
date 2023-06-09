'use client';

import { User } from '@prisma/client';
import Avatar from '../Avatar/Avatar';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react';
import searchStore from '@/app/store/searchStore';

import styles from './UserFeed.module.scss';

type Props = {
 users: User[]
}

const UserFeed: React.FC<Props> = observer(({ users }) => {

 const router = useRouter();

 const storeSearch = searchStore.search


 return (
  <div className={styles.userFeed}>
   {users.map((user) => {
    if (user.name.includes(storeSearch) || user.username.includes(storeSearch))
     return (
      <div key={user.id} className={styles.user} onClick={() => router.push(`user/${user.username}`)}>
       <Avatar photo={user.photo || '/images/placeholder.png'} />
       <div className={styles.displayName}>
        <strong>{user.name}</strong>
        <span>@{user.username}</span>
       </div>
      </div>
     )
   })}
  </div>
 );
})

export default UserFeed;