'use client';

import { User } from "@prisma/client";
import { FaUserPlus } from "react-icons/fa";
import Avatar from "../Avatar/Avatar";
import { useRouter } from "next/navigation";

import styles from './UserBox.module.scss';
import Button from "../../button/Button";
import useBlockUser from "@/app/hooks/useBlockUser";

type Props = {
 user: User
 isBlocked?: boolean;
}

const UserBox: React.FC<Props> = ({ user, isBlocked }) => {

 const router = useRouter();

 const { handleUnblockUser } = useBlockUser(user.id)

 const unBlock = (e: any) => {
  e.stopPropagation();
  handleUnblockUser()
 }

 return (
  <div className={styles.peopleBox} onClick={() => router.push(`user/${user?.username}`)}>
   {!isBlocked ? (
    <FaUserPlus className={styles.addUser} size="20" color="#20b46a" />
   ) : (
    <Button label="Unblock" onClick={unBlock} />
   )
   }
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

  </div >
 );
}

export default UserBox;