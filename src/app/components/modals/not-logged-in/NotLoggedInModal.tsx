'use client';

import useNotLoggedInModal from "@/app/hooks/useNotLoggedInModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Modal from "../Modal";
import styles from './NotLoggedInModal.module.scss';

const NotLoggedInModal = () => {

 const router = useRouter();

 const notLoggedInModal = useNotLoggedInModal();

 const [isLoading, setLoading] = useState(false)

 const onClose = () => {
  notLoggedInModal.onClose();
 }

 const bodyContent = (
  <div className={styles.notLoggedInMessage}>
   <strong>You must log in first.</strong>
   <p>To interact with this post, you must sign into an account first. Creating an account is quick and easy, allowing you to jump right into the action in no time. Click the button below to log in or create an account.</p>
  </div>
 )



 return (
  <Modal

   onClose={onClose}
   isOpen={notLoggedInModal.isOpen}
   onSubmit={() => router.push('/login')}
   disabled={isLoading}
   body={bodyContent}
   actionLabel="Log in"
  />
 );
}

export default NotLoggedInModal;