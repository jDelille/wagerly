'use client';

import useBetSlipModal from "@/app/hooks/useBetSlipModal";
import betSlipStore from "@/app/store/betSlipStore";
import { SafeUser } from "@/app/types/SafeUser";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-toggle/style.css"
import Modal from "../../modals/Modal";
import styles from './BetSlip.module.scss';
import Toggle from "react-toggle";
import CreatePost from "../../text-input/create-post/CreatePost";
import { User } from "@prisma/client";
import Popup from "../Popup";
import CreateBetPostText from "../../text-input/create-bet-post-text/CreateBetPostText";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export enum STEPS {
  ODDS = 0,
  TEXT = 1,
}


type Props = {
  currentUser: SafeUser | null;
  users: User[];
}

const BetSlip: React.FC<Props> = ({ currentUser, users }) => {

  const router = useRouter();

  const betSlipModal = useBetSlipModal();
  const [isLoading, setIsLoading] = useState(false);
  const [wager, setWager] = useState(10)
  const [postBody, setPostBody] = useState('')
  const [showTextarea, setShowTextarea] = useState(false)
  const [step, setStep] = useState(STEPS.ODDS)


  const { date, matchup, selectedBet, selectedTeamLogo, selectedTeamName, oddsDisplay, selectedOdds, selectedOddsDisplay, payoutMultiplier, type, homeId, awayId, location } = betSlipStore

  const onClose = () => {
    betSlipModal.onClose();
  }


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      postBody: '',
      photo: '',
    },
  });

  const body = watch('postBody');
  const postPhoto = watch('photo');
  const postBodyLength = body.length || 0;

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };


  const payout = (wager * payoutMultiplier).toFixed(2);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    if (step === STEPS.ODDS) {
      return setStep(STEPS.TEXT)
    }

    setIsLoading(true);

    const payload = {
      groupId: null,
      date,
      matchup,
      bet: selectedBet.toString(),
      logo: selectedTeamLogo,
      name: selectedTeamName,
      description: selectedOddsDisplay,
      odds: oddsDisplay,
      wager,
      payout,
      type,
      homeId,
      awayId,
      outcome: '',
      location,
      postBody: data.postBody,
      photo: data.photo.url
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

  const onBack = () => {
    setStep(STEPS.ODDS)
  }

  let bodyContent = (
    <>
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

          {/* <div className={styles.text}>
            <CreatePost users={users} />
          </div> */}

          {/* <CreatePost users={users} /> */}

        </div>
        {/* <div className={styles.advancedControls}>
          <div className={styles.toggle}>
            <div className={styles.text}>
              <strong>Customize bet</strong>
              <span>Add text, an image, or a gif to this bet post.</span>
            </div>
            <Toggle
              id='text-toggle'
              defaultChecked={false}
              onChange={() => { setShowTextarea(!showTextarea) }} />
          </div>
          {showTextarea && (
            <CreatePost users={users} />
          )}
        </div> */}


      </div>
    </>
  )

  if (step === STEPS.TEXT) {
    bodyContent = (
      <>
        <div className={styles.header}>
          <span>{date}</span>
          <strong>{matchup}</strong>
          <div className={styles.imageWrapper}>
            <Image src={selectedTeamLogo} alt="logo" width={30} height={30} />
          </div>
          <div className={styles.displayName}>
            <strong>{selectedTeamName} {selectedBet} </strong>
          </div>
          <div className={styles.odds}>
            <span>ODDS</span>
            <strong>{oddsDisplay}</strong>
          </div>
        </div>
        <CreateBetPostText
          users={users}
          setCustomValue={setCustomValue}
          postBody={body}
          register={register}
          errors={errors}
          postPhoto={postPhoto}
        />
      </>

    )
  }



  return (
    <Popup
      onClose={onClose}
      isOpen={betSlipModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
      body={bodyContent}
      actionLabel={step === STEPS.ODDS ? "Continue" : 'Place bet'}
      step={step}
      setStep={setStep}
      secondaryActionLabel={step === STEPS.ODDS ? "" : 'Back'}
      secondaryAction={onBack}
    // disableButton={!currentUser}
    />
  );
}

export default BetSlip;