'use client';

import useBetSlipModal from '@/app/hooks/useBetSlipModal';
import betSlipStore from '@/app/store/betSlipStore';
import { MatchHeader, MatchOdds, OddsType } from '@/app/types/Match';
import Image from 'next/image';
import { useMemo } from 'react';

import styles from './Odds.module.scss';

type Props = {
 odds: OddsType;
 leftName: string;
 rightName: string;
 formattedDate: string;
 matchHeader: any;
 matchId: string;
};

const Odds: React.FC<Props> = ({
 odds,
 leftName,
 rightName,
 formattedDate,
 matchHeader,
 matchId
}) => {
 const betSlipModal = useBetSlipModal();
 // const cantBet = odds.eventStatus === 3

 const homeTeamOdds = odds.homeTeamOdds;
 const awayTeamOdds = odds.awayTeamOdds;

 const isHomeFavorite = odds.homeTeamOdds.favorite

 const matchup = `${matchHeader.awayTeam.name} @ ${matchHeader.homeTeam.name}`;

 const addToBetStore = (value?: any, team?: string) => {

  betSlipModal.onOpen();
  betSlipStore.setDate(formattedDate);
  betSlipStore.setMatchup(matchup);
  betSlipStore.setSelectedOdds(value.value.odds);
  betSlipStore.setSelectedOddsDisplay(matchId);
  betSlipStore.setSelectedBet(value.value.label);
  betSlipStore.setOddsDisplay(value.value.odds);
  betSlipStore.setPayoutMultiplier(1.95);
  betSlipStore.setType(value.value.type)


  if (team === 'home') {
   betSlipStore.setSelectedTeamLogo(matchHeader.homeTeam.logo as string);
   betSlipStore.setSelectedTeamName(
    matchHeader.homeTeam.name
   );
  } else {
   betSlipStore.setSelectedTeamLogo(matchHeader.awayTeam.logo as string);
   betSlipStore.setSelectedTeamName(
    matchHeader.awayTeam.name
   );
  }
 };

 return (
  <div className={styles.odds}>
   <strong className={styles.title}>Matchup Odds</strong>
   <div className={styles.columnHeaders}>
    <span>Spread</span>
    <span>Total</span>
    <span>To Win</span>
   </div>
   <div className={styles.rows}>
    <div className={styles.row}>
     <div className={styles.displayName}>
      <Image
       src={matchHeader.homeTeam.logo}
       alt={'logo'}
       width={20}
       height={20}
      />
      <strong className={styles.name}>{matchHeader.homeTeam.name}</strong>
      <strong className={styles.score}>
       {matchHeader.homeTeam.score}
      </strong>
      <strong className={styles.abbreviation}>
       {matchHeader.homeTeam.abbreviation}
       <span>{matchHeader.homeTeam.score}</span>
      </strong>
     </div>
     <span
      className={styles.canBet}
      onClick={() =>
       addToBetStore({
        value: {
         odds: '-115',
         label: String((isHomeFavorite ? '-' : '+') + odds.spread),
         team: matchHeader.homeTeam.name,
         type: 'Spread',
        },
       },
        'home'
       )
      }>
      {isHomeFavorite ? '-' : '+'}{odds.spread}
     </span>
     <span className={styles.canBet} onClick={() =>
      addToBetStore({
       value: {
        odds: odds.overOdds.toString(),
        label: `o ${odds.overUnder}`,
        team: matchHeader.homeTeam.name,
        type: 'Total',
       },
      },
       'home'
      )
     }>
      o{odds.overUnder}
     </span>
     <span className={styles.canBet} onClick={() =>
      addToBetStore({
       value: {
        odds: odds.homeTeamOdds.moneyLine.toString(),
        label: odds.homeTeamOdds.moneyLine,
        team: matchHeader.homeTeam.name,
        type: 'To win',
       },
      },
       'home'
      )
     }>
      {odds.homeTeamOdds.moneyLine}
     </span>
    </div>
    <div className={styles.row}>
     <div className={styles.displayName}>
      <Image
       src={matchHeader.awayTeam.logo}
       alt={'logo'}
       width={20}
       height={20}
      />
      <strong className={styles.name}>{matchHeader.awayTeam.name}</strong>
      <strong className={styles.score}>
       {matchHeader.awayTeam.score}
      </strong>
      <strong className={styles.abbreviation}>
       {matchHeader.awayTeam.abbreviation}
       <span>{matchHeader.awayTeam.score}</span>
      </strong>
     </div>
     <span className={styles.canBet}
      onClick={() =>
       addToBetStore({
        value: {
         odds: '-115',
         label: String((isHomeFavorite ? '+' : '-') + odds.spread),
         team: matchHeader.awayTeam.name,
         type: 'Spread',
        },
       },
        'away'
       )
      }>
      {isHomeFavorite ? '+' : '-'}{odds.spread}
     </span>
     <span className={styles.canBet} onClick={() =>
      addToBetStore({
       value: {
        odds: odds.underOdds.toString(),
        label: `u ${odds.overUnder}`,
        team: matchHeader.awayTeam.name,
        type: 'Total',
       },
      },
       'away'
      )
     }>
      u{odds.overUnder}
     </span>
     <span className={styles.canBet} onClick={() =>
      addToBetStore({
       value: {
        odds: odds.awayTeamOdds.moneyLine.toString(),
        label: odds.awayTeamOdds.moneyLine,
        team: matchHeader.awayTeam.name,
        type: 'To win',
       },
      },
       'away'
      )
     }>
      {odds.awayTeamOdds.moneyLine}
     </span>
    </div>
   </div>
  </div>
 );
};

export default Odds;
