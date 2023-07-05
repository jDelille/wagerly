'use client';

import Button from "@/app/ui/button/Button";
import { BaseSyntheticEvent } from "react";

import styles from './EditProfileHeader.module.scss';

type Props = {
 onClick: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}


const EditProfileHeader: React.FC<Props> = ({ onClick }) => {
 return (
  <div className={styles.header}>
   <h1>Edit Profile</h1>
   <p><strong>Customize what people see on your public profile and next to your posts.</strong> Other people are more likely to follow you back and interact with you when you have a filled out profile and a profile picture.</p>
   <Button label="Save changes" onClick={onClick} />
  </div>
 );
}

export default EditProfileHeader;