import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdInsertPhoto } from 'react-icons/md';

import styles from './ImageUpload.module.scss';

type ImageUploadProps = {
 onChange: (base64: string) => void;
 value: string;
 setCustomValue: (id: string, value: any) => void;
 isRegister?: boolean;
 isPost?: boolean;
 disabled?: boolean;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
 onChange,
 value,
 setCustomValue,
 isPost,
 disabled,
}) => {
 const [base64, setBase64] = useState(value);

 const handleChange = useCallback(
  (base64: string) => {
   onChange(base64);
   setCustomValue('photo', base64);
  },
  [onChange, setCustomValue]
 );

 const handleDrop = useCallback(
  (files: any) => {
   const file = files[0];
   const reader = new FileReader();

   reader.onload = (event: any) => {
    setBase64(event.target.result);
    handleChange(event.target.result);
   };

   reader.readAsDataURL(file);
  },
  [handleChange]
 );

 const { getRootProps, getInputProps } = useDropzone({
  maxFiles: 1,
  onDrop: handleDrop,
  accept: {
   'image/jpeg': [],
   'image/png': [],
  },
 });

 return (
  <>
   {!disabled && (
    <div {...getRootProps({})}>
     <input
      {...getInputProps()}
      placeholder='upload'
      width='100px'
      height='50px'
     />

     {!isPost ? (
      <Image
       src={base64 || '/images/placeholder.png'}
       alt='profile-picture'
       width='50'
       height='50'
       style={{ objectFit: 'contain' }}
      />
     ) : (
      <div className={styles.icon}>
       <FontAwesomeIcon icon={faCameraRetro} color="#36393e" />
      </div>
     )}
    </div>
   )}

   {disabled && (
    <div className={styles.icon}>
     <MdInsertPhoto size={22} color='#36393e' />
    </div>
   )}
  </>
 );
};

export default ImageUpload;