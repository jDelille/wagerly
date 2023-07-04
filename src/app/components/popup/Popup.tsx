'use client';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Popup.module.scss';
import { useCallback, useEffect, useState } from 'react';
import Button from '@/app/ui/button/Button';

type Props = {
 isOpen: boolean;
 onClose: () => void;
 onSubmit: () => void;
 disabled: boolean;
 body: React.ReactElement;
}

const Popup: React.FC<Props> = ({ body, isOpen, onClose, disabled, onSubmit }) => {

 const [showPopup, setShowPopup] = useState(isOpen);

 useEffect(() => {
  setShowPopup(isOpen);
 }, [isOpen]);

 const handleClose = useCallback(() => {
  if (disabled) {
   return;
  }

  setShowPopup(false);
  setTimeout(() => {
   onClose();
  }, 300);
 }, [disabled, onClose]);

 if (!isOpen) {
  return null;
 }

 return (
  <div className={styles.overlay}>
   <div className={showPopup ? styles.popup : styles.hidePopup}>
    <div className={styles.header}>
     <div className={styles.close} onClick={handleClose}>
      <FontAwesomeIcon icon={faXmark} color="gray" />
     </div>
    </div>
    <div className={styles.body}>
     {body}
    </div>
    <div className={styles.footer}>
     <Button label='Save' onClick={onSubmit} />
    </div>
   </div>
  </div>

 );
}

export default Popup;