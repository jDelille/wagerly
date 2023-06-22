'use client';

import Button from "../../../ui/button/Button";
import { BaseSyntheticEvent } from "react";

import styles from './EditProfileHeader.module.scss';

type Props = {
 onClick: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}


const EditProfileHeader: React.FC<Props> = ({ onClick }) => {
 return (
  <div className={styles.header}>
   <h1>Edit Profile</h1>
   <Button label="Save changes" onClick={onClick} />
  </div>
 );
}

export default EditProfileHeader;