'use client';

import Avatar from "@/app/components/user/Avatar/Avatar";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa";

import styles from './UserBox.module.scss';
import ProfileHeader from "../../profile/profile-header/ProfileHeader";
import { SafeUser } from "@/app/types/SafeUser";
import UserHeader from "./UserHeader";

type Props = {
 user: User
 currentUser: SafeUser | null;
 followerCount: number;
}

const UserBox: React.FC<Props> = ({ user, currentUser, followerCount }) => {

 const router = useRouter();

 return (
  <div className={styles.peopleBox} onClick={() => router.push(`user/${user?.username}`)}>
   <UserHeader
    user={user as any}
    currentUserId={currentUser?.id}
    bio={user?.bio as string}
    followerCount={0}
    followingIds={currentUser?.followingIds as string[]} />
  </div >
 );
}

export default UserBox;