'use client';

import { useEffect, useState } from 'react';
import { Odds } from '@/app/types/Odds';
import matchStore from '@/app/store/matchStore';

import styles from './MatchDetails.module.scss';
import { Team } from '@/app/types/Team';
import Image from 'next/image';

type Props = {
 matchId: string;
}

const MatchDetails: React.FC<Props> = ({ matchId }) => {
 const [odds, setOdds] = useState<Odds | null>();
 const [homeData, setHomeData] = useState<Team | null>()
 const [awayData, setAwayData] = useState<Team | null>()
 const [predictor, setPredictor] = useState(null)

 const sport = matchStore.sport
 const league = matchStore.league
 const homeTeamId = matchStore.homeTeamId
 const awayTeamId = matchStore.awayTeamId

 useEffect(() => {
  async function getOddsData() {
   try {
    const res = await fetch(
     `https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events/${matchId}/competitions/${matchId}/odds`
    );

    if (!res.ok) {
     throw new Error('Failed to fetch matches');
    }

    const data = await res.json();
    setOdds(data.items[0]);
   } catch (error) {
    console.log(error);
   }
  }

  getOddsData();
 }, [matchId, league, sport]);

 useEffect(() => {
  async function getTeamData() {
   try {
    const res = await fetch(
     `http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/${homeTeamId}`
    );

    if (!res.ok) {
     throw new Error('Failed to fetch matches');
    }

    const data = await res.json();

    setHomeData(data.team);
   } catch (error) {
    console.log(error);
   }
  }

  getTeamData();
 }, [homeTeamId]);

 useEffect(() => {
  async function getTeamData() {
   try {
    const res = await fetch(
     `http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/${awayTeamId}`
    );

    if (!res.ok) {
     throw new Error('Failed to fetch matches');
    }

    const data = await res.json();

    setAwayData(data.team);
   } catch (error) {
    console.log(error);
   }
  }

  getTeamData();
 }, [awayTeamId]);


 useEffect(() => {
  async function getPrediction() {
   try {
    const res = await fetch(
     `https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events/${matchId}/competitions/${matchId}/probabilities?limit=1`
    );

    if (!res.ok) {
     throw new Error('Failed to fetch matches');
    }

    const data = await res.json();

    console.log(data)

    setPredictor(data);
   } catch (error) {
    console.log(error);
   }
  }

  getPrediction();
 }, [league, matchId, sport]);

 console.log(odds)


 return (
  <div>
   <div className={styles.matchHeader}>
    <div className={styles.league}>
     <p>{league.toUpperCase()}</p>
    </div>
    <div className={styles.teams}>
     <div className={styles.away}>
      <div className={styles.name}>
       <strong>{awayData?.abbreviation} {awayData?.shortDisplayName}</strong>
       <span>{awayData?.record.items[0].summary}</span>
      </div>

      <Image src={awayData?.logos[0].href as string} width={45} height={45} alt="logo" />
     </div>
     <strong className={styles.at}>AT</strong>
     <div className={styles.home}>
      <Image src={homeData?.logos[0].href as string} width={45} height={45} alt="logo" />
      <div className={styles.name}>
       <strong>{homeData?.abbreviation} {homeData?.shortDisplayName}</strong>
       <span>{homeData?.record.items[0].summary}</span>
      </div>
     </div>

    </div>
    <div className={styles.predictor}>
     yoooooooooooo
    </div>

    <div className={styles.odds}>
     <div className={styles.away}>
      <div className={styles.name}>
       <strong>{awayData?.displayName}</strong>
      </div>
      <div className={styles.values}>
       <div className={styles.spread}>
        <span>{odds?.spread}</span>
        <strong>{odds?.awayTeamOdds.spreadOdds || -115} </strong>
       </div>
       <div className={styles.total}>
        <span>U {odds?.overUnder}</span>
        <strong>{odds?.underOdds}</strong>
       </div>
       <div className={styles.moneyline}>
        <strong>{odds?.awayTeamOdds.moneyLine} </strong>
       </div>
      </div>
     </div>

    </div>
    <div className={styles.odds}>
     <div className={styles.home}>
      <div className={styles.name}>
       <strong>{homeData?.displayName}</strong>
      </div>
      <div className={styles.values}>
       <div className={styles.spread}>
        <span>{odds?.spread}</span>
        <strong>{odds?.homeTeamOdds.spreadOdds || -115} </strong>
       </div>
       <div className={styles.total}>
        <span>O {odds?.overUnder}</span>
        <strong>{odds?.overOdds} </strong>
       </div>
       <div className={styles.spread}>
        <strong>{odds?.homeTeamOdds.moneyLine} </strong>
       </div>
      </div>
     </div>
    </div>

   </div>
  </div>
 );
}

export default MatchDetails;