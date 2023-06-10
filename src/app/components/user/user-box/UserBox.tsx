'use client';

import { User } from "@prisma/client";
import { FaUserPlus } from "react-icons/fa";
import Avatar from "../Avatar/Avatar";
import { useRouter } from "next/navigation";

import styles from './UserBox.module.scss';

type Props = {
 user: User
}

const UserBox: React.FC<Props> = ({ user }) => {

 const router = useRouter();

 return (
  <div className={styles.peopleBox} onClick={() => router.push(`user/${user?.username}`)}>
   <FaUserPlus className={styles.addUser} size="20" color="#20b46a" />
   <div className={styles.top}>
    <Avatar photo={user.photo as string || '/images/placeholder.png'} username={user.username} />
    <div className={styles.displayName}>
     <strong className={styles.name}>{user.name}</strong>
     <span className={styles.username}>@{user.username}</span>
    </div>
   </div>

   <div className={styles.bio}>
    {user?.bio}
   </div>

  </div>
 );
}

export default UserBox;