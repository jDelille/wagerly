'use client';

import { useMemo } from 'react';
import { MatchHeader, MatchOdds } from '@/app/types/Match';

import styles from './Odds.module.scss';
import Image from 'next/image';
import useBetSlipModal from '@/app/hooks/useBetSlipModal';
import betSlipStore from '@/app/store/betSlipStore';

type Props = {
 odds: MatchOdds;
 leftName: string;
 rightName: string;
 formattedDate: string;
 matchHeader: any
}

const Odds: React.FC<Props> = ({ odds, leftName, rightName, formattedDate, matchHeader }) => {
 const betSlipModal = useBetSlipModal();
 const cantBet = odds.eventStatus === 3

 const addToBetStore = (index: number, value?: any, team?: string) => {

  console.log(odds)

  if (cantBet) {
   return;
  }




  if (odds) {
   betSlipModal.onOpen();
   betSlipStore.setDate(formattedDate);
   betSlipStore.setMatchup(odds.betSection.name);
   betSlipStore.setSelectedOdds(value.odds);
   betSlipStore.setSelectedOddsDisplay(value.betSlip.description);
   betSlipStore.setSelectedBet(value.odds);
   betSlipStore.setOddsDisplay(value.betSlip.oddsDisplay);
   betSlipStore.setPayoutMultiplier(value.betSlip.payoutMultiplier);
  }

  if (team === 'leftTeam') {
   betSlipStore.setSelectedTeamLogo(matchHeader.leftTeam.logo as string);
   betSlipStore.setSelectedTeamName(
    matchHeader.leftTeam.entityName as string
   );
  } else {
   betSlipStore.setSelectedTeamLogo(matchHeader.rightTeam.logo as string);
   betSlipStore.setSelectedTeamName(
    matchHeader.rightTeam.entityName as string
   );
  }

  if (index === 0) {
   betSlipStore.setType('Spread');
  } else if (index === 1) {
   betSlipStore.setType('Moneyline');
  } else if (index === 2) {
   betSlipStore.setType('Total');
  }
 };


 return (
  <div className={styles.odds}>
   <strong className={styles.title}>{odds?.title}</strong>
   <div className={styles.columnHeaders}>
    {odds?.odds.columnHeaders.map((label) => (
     <span key={label}>{label}</span>
    ))}
   </div>
   <div className={styles.rows}>

    <div className={styles.row}>
     <div className={styles.displayName}>
      <Image
       src={odds?.odds.rows[0].imageUrl as string}
       alt={odds?.odds.rows[0].imageAltText as string}
       width={20}
       height={20}
      />
      <strong className={styles.name}>{odds?.odds.rows[0].fullText}</strong>
      <strong className={styles.score}>{matchHeader.leftTeam.score}</strong>
      <strong className={styles.abbreviation}>{leftName}<span>{matchHeader.leftTeam.score}</span></strong>
     </div>
     {odds?.odds.rows[0].values?.map((value, i) => {
      if (i <= 2) {
       return (
        <span
         className={value.success ? styles.cantBet : styles.canBet}
         key={i}
         onClick={() => addToBetStore(i, value, 'leftTeam')}>
         {value.odds}
        </span>
       );
      }
     })}
    </div>

    <div className={styles.row}>
     <div className={styles.displayName}>
      <Image
       src={odds?.odds.rows[1].imageUrl as string}
       alt={odds?.odds.rows[1].imageAltText as string}
       width={20}
       height={20}
      />
      <strong className={styles.name}>{odds?.odds.rows[1].fullText}</strong>
      <strong className={styles.score}>{matchHeader.rightTeam.score}</strong>
      <strong className={styles.abbreviation}>{rightName}<span>{matchHeader.rightTeam.score}</span></strong>
     </div>

     {odds?.odds.rows[1].values?.map((value, i) => {
      if (i <= 2) {
       return (
        <span
         className={value.success ? styles.cantBet : styles.canBet}
         key={i}
         onClick={() => addToBetStore(i, value, 'rightTeam')}>
         {value.odds}
        </span>
       );
      }
     })}
    </div>
   </div>
  </div>
 );
}

export default Odds;