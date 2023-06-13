'use client';

import Button from "../../button/Button";

import styles from './EditProfileHeader.module.scss';

type Props = {

}

const EditProfileHeader: React.FC<Props> = () => {
 return (
  <div className={styles.header}>
   <h1>Edit Profile</h1>
   <Button label="Save changes" />
  </div>
 );
}

export default EditProfileHeader;