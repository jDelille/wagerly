'use client';

import useBetSlipModal from "@/app/hooks/useBetSlipModal";
import betSlipStore from "@/app/store/betSlipStore";
import { SafeUser } from "@/app/types/SafeUser";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Modal from "../Modal";
import styles from './BetSlip.module.scss';

;



type Props = {
  currentUser: SafeUser | null
}

const BetSlip: React.FC<Props> = ({ currentUser }) => {

  const router = useRouter();

  const betSlipModal = useBetSlipModal();
  const [isLoading, setIsLoading] = useState(false);
  const [wager, setWager] = useState(10)
  const [postBody, setPostBody] = useState('')


  const { date, matchup, selectedBet, selectedTeamLogo, selectedTeamName, oddsDisplay, selectedOdds, selectedOddsDisplay, payoutMultiplier, type, homeId, awayId, location } = betSlipStore

  const onClose = () => {
    betSlipModal.onClose();
  }

  const payout = (wager * payoutMultiplier).toFixed(2);

  const onSubmit = () => {
    setIsLoading(true);

    const payload = {
      groupId: null,
      date,
      matchup,
      bet: selectedBet,
      logo: selectedTeamLogo,
      name: selectedTeamName,
      description: selectedOddsDisplay,
      odds: oddsDisplay,
      wager,
      payout,
      type,
      postBody,
      homeId,
      awayId,
      outcome: '',
      location
    }

    axios.post('/api/bet', payload)
      .then(() => {
        router.refresh()
        betSlipModal.onClose();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const bodyContent = (
    <div>
      <div className={styles.header}>
        <span>{date}</span>
        <strong>{matchup}</strong>
      </div>
      <div className={styles.betContent}>
        <div className={styles.imageWrapper}>
          <Image src={selectedTeamLogo} alt="logo" width={30} height={30} />
        </div>
        <div className={styles.displayName}>
          <strong>{selectedTeamName} {selectedBet} </strong>
        </div>
        <span className={styles.description}>{selectedOddsDisplay}</span>

        <div className={styles.odds}>
          <span>ODDS</span>
          <strong>{oddsDisplay}</strong>
        </div>

        <div className={styles.placeBet}>
          <div className={styles.inputLabels}>
            <div className={styles.min}>Min
              <strong>$5</strong>
            </div>
            <div className={styles.yourBet}>Wager
              <strong>${wager}</strong>
            </div>
            <div className={styles.max}>Max
              <strong>$100</strong>
            </div>
          </div>
          <input type="range" id="rangeInput" min="5" max="100" value={wager} onChange={(e) => setWager(Number(e.target.value))} />

          <div className={styles.payout}>
            <span>Returns</span>
            <strong>${payout}</strong>
          </div>

          <div className={styles.text}>
            <textarea
              placeholder="Share your thoughts on this bet."
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
            />
          </div>
        </div>


      </div>
    </div>
  )



  return (
    <Modal
      onClose={onClose}
      isOpen={betSlipModal.isOpen}
      onSubmit={onSubmit}
      disabled={isLoading}
      body={bodyContent}
      actionLabel={currentUser ? "Place bet" : "You must sign in to place a bet."}
      disableButton={!currentUser}
    />
  );
}

export default BetSlip;