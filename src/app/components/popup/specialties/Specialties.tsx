'use client';
import useSpecialtiesModal from '@/app/hooks/useSpecialtiesModal';
import { useState } from 'react';
import Popup from '../Popup';
import { SafeUser } from '@/app/types/SafeUser';

import styles from './Specialties.module.scss';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

type Props = {
  currentUser: SafeUser | null;

}

const Specialties: React.FC<Props> = ({ currentUser }) => {

  const specialtiesModal = useSpecialtiesModal();
  const router = useRouter();

  const [selectedSports, setSelectedSports] = useState<string[]>(currentUser?.specialties || []);

  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    specialtiesModal.onClose();
  }

  const onSubmit = () => {
    setIsLoading(true)

    const payload = {
      selectedSports
    }

    axios.post(`/api/specialties/${currentUser?.id}`, payload)
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

  const sportNames = ['NFL', 'MLB', 'NBA', 'MLS', 'NHL', 'UFC', 'WNBA']

  const handleSportClick = (sport: string) => {
    if (selectedSports.includes(sport)) {
      // If the sport is already in the array, remove it
      setSelectedSports(selectedSports.filter((selectedSport) => selectedSport !== sport));
    } else {
      // If the sport is not in the array, add it
      setSelectedSports([...selectedSports, sport]);
    }
  };


  const bodyContent = (
    <>
      <div className={styles.header}>
        <strong>Your Specialties:</strong>
        <span>{"You haven't selected any specialties yet!"}</span>
      </div>

      <div className={styles.sports}>
        {sportNames.map((sport, i) => (
          <div key={i} className={selectedSports.includes(sport) ? styles.selectedSport : styles.sport} onClick={() => handleSportClick(sport)} >
            {selectedSports.includes(sport) ? (
              <div className={styles.selected}>
                <FontAwesomeIcon icon={faCircleCheck} color="#4a4de7" />
              </div>
            ) : (
              <div className={styles.unselected}>

              </div>
            )}

            <div className={styles.content}>
              <Image src={`/images/sport-logos/${sport}.png`} width={40} height={40} alt='nfl-logo' />
              <strong>{sport}</strong>
            </div>
          </div>
        ))}
      </div>
    </>
  )


  return (
    <Popup
      onClose={onClose}
      isOpen={specialtiesModal.isOpen}
      onSubmit={onSubmit}
      disabled={isLoading}
      body={bodyContent}
    />
  );
}

export default Specialties;