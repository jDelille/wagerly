'use client';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Popup.module.scss';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import Button from '@/app/ui/button/Button';
import { STEPS } from './bet-slip/BetSlip';

type Props = {
 isOpen: boolean;
 onClose: () => void;
 onSubmit: () => void;
 disabled: boolean;
 body: React.ReactElement;
 actionLabel: string;
 step?: STEPS;
 setStep?: Dispatch<SetStateAction<STEPS>>
 secondaryActionLabel?: string;
 secondaryAction?: () => void;
}

const Popup: React.FC<Props> = ({ body, isOpen, onClose, disabled, onSubmit, actionLabel, secondaryActionLabel, secondaryAction }) => {

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
     {secondaryActionLabel && (
      <Button label={secondaryActionLabel} onClick={secondaryAction} />
     )}
     <Button label={actionLabel} onClick={onSubmit} />
    </div>
   </div>
  </div>

 );
}

export default Popup;