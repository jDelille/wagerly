'use client';

import { useEffect, useState } from 'react';
import matchStore from '@/app/store/matchStore';
import { Chance, OddsType } from '@/app/types/Match';
import { getMatchInfo, getMatchSummary, getOdds, getTeam } from '@/app/api/sportsbookData';
import Header from './match-header/MatchHeader';
import { observer } from 'mobx-react';
import Loader from '../../loader/Loader';
import { Team } from '@/app/types/Team';
import Odds from './odds/Odds';

import styles from './MatchDetails.module.scss';
import ChanceToWin from './chance-to-win/ChanceToWin';
import LastFiveGames from './last-five-games/LastFiveGames';



type Props = {
	matchId: string;
};


const MatchDetails: React.FC<Props> = observer(({ matchId }) => {
	const [isLoading, setIsLoading] = useState(false);

	const [odds, setOdds] = useState<OddsType>();
	const [chance, setChance] = useState<any>()
	const [error, setError] = useState('')
	const [homeTeam, setHomeTeam] = useState<Team>()
	const [awayTeam, setAwayTeam] = useState<Team>()
	const [matchInfo, setMatchInfo] = useState<any>()
	const [matchSummary, setMatchSummary] = useState<any>()

	const league = matchStore.league;
	const sport = matchStore.sport

	const homeId = matchStore.homeTeamId || (typeof localStorage !== 'undefined' && localStorage.getItem('homeTeamId'));

	const awayId = matchStore.awayTeamId || (typeof localStorage !== 'undefined' && localStorage.getItem('awayTeamId'));


	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true);
				const delay = 0;
				setTimeout(async () => {

					const homeTeam = await getTeam(homeId as string, league, sport);
					setHomeTeam(homeTeam)
					const awayTeam = await getTeam(awayId as string, league, sport);
					setAwayTeam(awayTeam)

					const matchInfo = await getMatchInfo(sport, league, matchId)
					setMatchInfo(matchInfo)

					const matchSummary = await getMatchSummary(sport, league, matchId);
					setMatchSummary(matchSummary)

					const odds = await getOdds(matchId, league, sport);
					setOdds(odds.items[0]);
					setChance(odds.items[8])

					setIsLoading(false);
				}, delay);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}


		fetchData();
	}, [awayId, homeId, league, matchId, sport]);

	const formattedDate = new Date(matchInfo?.date as string).toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric" });

	const matchHeader = {
		homeTeam: {
			name: homeTeam?.name,
			abbreviation: homeTeam?.abbreviation,
			logo: homeTeam?.logos[0].href
		},
		awayTeam: {
			name: awayTeam?.name,
			abbreviation: awayTeam?.abbreviation,
			logo: awayTeam?.logos[0].href
		},
		venue: matchInfo?.competitions[0].venue.fullName,
		city: matchInfo?.competitions[0].venue.address.city,
		state: matchInfo?.competitions[0].venue.address.state
	}

	return isLoading ? (
		<div className={styles.loaderWrapper}>
			<Loader />
		</div>
	) : (
		<div className={styles.matchup}>
			<Header
				matchHeader={matchHeader}
				formattedDate={formattedDate}
			/>

			{odds && (
				<>
					<Odds
						odds={odds}
						leftName={matchHeader?.homeTeam.name as string}
						rightName={matchHeader?.awayTeam.name as string}
						formattedDate={formattedDate}
						matchHeader={matchHeader}
						matchId={matchInfo.id}
					/>
				</>
			)}

			<ChanceToWin
				homeName={matchHeader.homeTeam.name as string}
				awayName={matchHeader.awayTeam.name as string}
				homeChance={matchSummary?.predictor.homeTeam.gameProjection}
				awayChance={matchSummary?.predictor.awayTeam.gameProjection}
			/>

			{/* <LastFiveGames
				lastFiveGames={matchSummary?.lastFiveGames}
			/> */}

		</div>
	);
});

export default MatchDetails;
