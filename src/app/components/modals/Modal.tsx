'use client';

import { useCallback, useEffect, useState } from 'react';

import styles from './Modal.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../button/Button';

type Props = {
 isOpen?: boolean;
 onClose: () => void;
 onSubmit: () => void;
 disabled: boolean;
 body: React.ReactElement;
 actionLabel: string;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, onSubmit, disabled, body, actionLabel }) => {

 const [showModal, setShowModal] = useState(isOpen);

 useEffect(() => {
  setShowModal(isOpen);
 }, [isOpen]);

 const handleClose = useCallback(() => {
  if (disabled) {
   return;
  }

  setShowModal(false);
  setTimeout(() => {
   onClose();
  }, 300);
 }, [disabled, onClose]);

 if (!isOpen) {
  return null;
 }


 return (
  <>
   <div className={styles.overlay}>
    <div className={showModal ? styles.showModal : styles.hideModal}>
     <div className={styles.header}>
      <AiOutlineClose size={20} color='#000' onClick={handleClose} />
     </div>
     <div className={styles.bodyContent}>
      {body}
     </div>
     <div className={styles.footer}>

      <Button
       label={actionLabel}
       onClick={onSubmit}
      />
     </div>
    </div>
   </div>
  </>
 );
}

export default Modal