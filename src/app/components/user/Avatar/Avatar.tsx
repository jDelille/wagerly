'use client'

import Image from "next/image";

type Props = {
 photo: string;
}

const Avatar: React.FC<Props> = ({ photo }) => {
 return (
  <Image src={photo} width={40} height={40} alt="user-avatar" />
 );
}

export default Avatar;