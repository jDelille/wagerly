'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
 photo: string;
 username: string;
}

const Avatar: React.FC<Props> = ({ photo, username }) => {

 const router = useRouter();

 const onClick = (e: React.MouseEvent<HTMLImageElement>) => {
  e.stopPropagation();
  if (username) {
   router.push(`/user/${username}`);
  }
 };

 return (
  <Image src={photo} width={40} height={40} alt="user-avatar" onClick={onClick} style={{ cursor: 'pointer', borderRadius: '4px' }} />
 );
}

export default Avatar;