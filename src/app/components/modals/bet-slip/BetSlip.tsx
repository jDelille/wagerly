'use client';

import useBetSlipModal from "@/app/hooks/useBetSlipModal";
import Modal from "../Modal";
import { useState } from "react";
import betSlipStore from "@/app/store/betSlipStore";

import styles from './BetSlip.module.scss';
import Image from "next/image";

const BetSlip = () => {

 const betSlipModal = useBetSlipModal();
 const [isLoading, setIsLoading] = useState(false);
 const [wager, setWager] = useState(10)

 const { date, matchup, selectedBet, selectedTeamLogo, selectedTeamName, oddsDisplay, selectedOdds, selectedOddsDisplay, payoutMultiplier } = betSlipStore

 const onClose = () => {
  betSlipModal.onClose();
 }

 const payout = (wager * payoutMultiplier).toFixed(2);

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
    </div>

   </div>
  </div>
 )



 return (
  <Modal
   onClose={onClose}
   isOpen={betSlipModal.isOpen}
   onSubmit={() => { }}
   disabled={isLoading}
   body={bodyContent}
  />
 );
}

export default BetSlip;