'use client';
import useSpecialtiesModal from '@/app/hooks/useSpecialtiesModal';
import { useState } from 'react';
import Modal from '../Modal';
import { SafeUser } from '@/app/types/SafeUser';

import styles from './Specialties.module.scss';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Props = {
 currentUser: SafeUser | null;

}

const Specialties: React.FC<Props> = ({ currentUser }) => {

 const specialtiesModal = useSpecialtiesModal();
 const router = useRouter();

 const [sports, setSports] = useState([])

 const [isLoading, setIsLoading] = useState(false);

 const onClose = () => {
  specialtiesModal.onClose();
 }

 const onSubmit = () => {
  setIsLoading(true)

  const payload = {
   sports
  }

  axios.post('/api/specialties', payload)
   .then(() => {
    router.refresh();
    specialtiesModal.onClose();
   })
   .catch((error) => {
    console.log(error)
   })
   .finally(() => {
    setIsLoading(false)
   })
 }

 const sportNames = ['NFL', 'MLB', 'NBA']


 const bodyContent = (
  <>
   <div className={styles.header}>
    <strong>Your Specialties:</strong>
    <span>{"You haven't selected any specialties yet!"}</span>
   </div>

   <div className={styles.sports}>
    {sportNames.map((sport, i) => (
     <div key={i}>
      <strong>{sport}</strong>
     </div>
    ))}
   </div>
  </>
 )


 return (
  <Modal
   onClose={onClose}
   isOpen={specialtiesModal.isOpen}
   onSubmit={onSubmit}
   disabled={isLoading}
   body={bodyContent}
   actionLabel={currentUser ? "Place bet" : "You must sign in to place a bet."}
   disableButton={!currentUser}
  />
 );
}

export default Specialties;