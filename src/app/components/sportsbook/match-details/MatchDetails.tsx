'use client';

import { useEffect, useState } from 'react';
import matchStore from '@/app/store/matchStore';
import { MatchHeader, MatchOdds, Breakdown, Chance } from '@/app/types/Match';
import { getMatch, getOdds } from '@/app/api/sportsbookData';
import ChanceToWin from './chance-to-win/ChanceToWin';
import BreakdownRow from './breakdown/Breakdown';
import Odds from './odds/Odds';
import Header from './match-header/MatchHeader';

import styles from './MatchDetails.module.scss';
import { observer } from 'mobx-react';

type Props = {
	matchId: string;
};

const MatchDetails: React.FC<Props> = observer(({ matchId }) => {
	const [isLoading, setIsLoading] = useState(false);

	const [header, setHeader] = useState<MatchHeader>();
	const [odds, setOdds] = useState<MatchOdds>();
	const [spreadBreakdown, setSpreadBreakdown] = useState<Breakdown>();
	const [totalBreakdown, setTotalBreakdown] = useState<Breakdown>();
	const [winnerBreakdown, setWinnerBreakdown] = useState<Breakdown>();
	const [chance, setChance] = useState<Chance>()

	const league = matchStore.league;

	console.log(league.length)

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true);
				const delay = 0;
				setTimeout(async () => {
					const header = await getMatch(matchId, league, league.length);
					const odds = await getOdds(matchId, league, league.length);
					setHeader(header.header);
					if (odds) {
						setOdds(odds.sectionList[0].modules[0].model);
					}
					setChance(odds.sectionList[0].modules[1].model)
					setSpreadBreakdown(odds.sectionList[0].modules[3].model);
					setWinnerBreakdown(odds.sectionList[0].modules[5]?.model);
					setTotalBreakdown(
						odds.sectionList[0].modules[7]?.model ||
						odds.sectionList[0].modules[4]?.model
					);
					setIsLoading(false);
				}, delay);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}


		fetchData();
	}, [league, matchId]);

	const formattedDate = new Date(header?.eventTime as string).toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric" });

	const matchHeader = {
		leftTeam: {
			name: header?.leftTeam.name,
			longName: header?.leftTeam.longName,
			logo: header?.leftTeam.logoUrl,
			imageAltText: header?.leftTeam.imageAltText,
			score: header?.leftTeam.score,
			record: header?.leftTeam.record,
			entityName: header?.leftTeam.entityLink.title,
		},
		rightTeam: {
			name: header?.rightTeam.name,
			longName: header?.rightTeam.longName,
			logo: header?.rightTeam.logoUrl,
			imageAltText: header?.rightTeam.imageAltText,
			score: header?.rightTeam.score,
			record: header?.rightTeam.record,
			entityName: header?.rightTeam.entityLink.title,
		},
	};

	const breakdown = {
		spreadBreakdownTitle: spreadBreakdown?.title,
		spreadBreakdownDescription: spreadBreakdown?.description,
		totalBreakdownTitle: totalBreakdown?.title,
		totalBreakdownDescription: totalBreakdown?.description,
		winnerBreakdownTitle: winnerBreakdown?.title,
		winnerBreakdownDescription: winnerBreakdown?.description,
		leftTeam: {
			name: spreadBreakdown?.items?.[0].leftName,
			spreadPercent: spreadBreakdown?.items?.[0].leftValue,
			color: spreadBreakdown?.items?.[0].leftColor,
			spreadDisplayValue: spreadBreakdown?.items?.[0].leftDisplay,
			totalPercent: totalBreakdown?.items?.[0].leftValue,
			totalDisplayValue: totalBreakdown?.items?.[0].leftDisplay,
			winnerDisplayValue: winnerBreakdown?.items?.[0].leftDisplay,
			winnerPercent: winnerBreakdown?.items?.[0].leftValue,
		},
		rightTeam: {
			name: spreadBreakdown?.items?.[0].rightName,
			spreadPercent: spreadBreakdown?.items?.[0].rightValue,
			color: spreadBreakdown?.items?.[0].rightColor,
			spreadDisplayValue: spreadBreakdown?.items?.[0].rightDisplay,
			totalPercent: totalBreakdown?.items?.[0].rightValue,
			totalDisplayValue: totalBreakdown?.items?.[0].rightDisplay,
			winnerDisplayValue: winnerBreakdown?.items?.[0].rightDisplay,
			winnerPercent: winnerBreakdown?.items?.[0].rightValue,
		},
	};

	const colorValue1 = chance && chance.lines[0].color;
	const colorValue2 = chance && chance.lines[0].color2;


	return isLoading || !odds ? (
		<div className={styles.loading}>Loading...</div>
	) : (
		<div className={styles.matchup}>
			<Header
				matchHeader={matchHeader}
				formattedDate={formattedDate}
				header={header as MatchHeader}
			/>

			{/* <FeedToggle /> */}

			{odds ? (
				<Odds
					odds={odds}
					leftName={header?.leftTeam.name as string}
					rightName={header?.rightTeam.name as string}
					formattedDate={formattedDate}
					matchHeader={matchHeader}
				/>
			) : (
				<strong className={styles.noOddsMessage}>
					{' '}
					- Odds Not Yet Available -
				</strong>
			)}

			<ChanceToWin chance={chance as Chance} />

			{spreadBreakdown?.title && (
				<BreakdownRow
					title={breakdown.spreadBreakdownTitle as string}
					description={breakdown.spreadBreakdownDescription as string}
					leftTeamName={breakdown.leftTeam.name as string}
					leftDisplayValue={breakdown.leftTeam.spreadDisplayValue as string}
					leftPercent={breakdown.leftTeam.spreadPercent as number}
					rightTeamName={breakdown.rightTeam.name as string}
					rightDisplayValue={breakdown.rightTeam.spreadDisplayValue as string}
					rightPercent={breakdown.rightTeam.spreadPercent as number}
					colorValue1={colorValue1 as string}
					colorValue2={colorValue2 as string}
				/>
			)}

			{totalBreakdown?.title && (
				<BreakdownRow
					title={breakdown.totalBreakdownTitle as string}
					description={breakdown.totalBreakdownDescription as string}
					leftTeamName={breakdown.leftTeam.name as string}
					leftDisplayValue={breakdown.leftTeam.totalDisplayValue as string}
					leftPercent={breakdown.leftTeam.totalPercent as number}
					rightTeamName={breakdown.rightTeam.name as string}
					rightDisplayValue={breakdown.rightTeam.totalDisplayValue as string}
					rightPercent={breakdown.rightTeam.totalPercent as number}
					colorValue1={colorValue1 as string}
					colorValue2={colorValue2 as string}
				/>
			)}

			{winnerBreakdown?.title && (
				<BreakdownRow
					title={breakdown.winnerBreakdownTitle as string}
					description={breakdown.winnerBreakdownDescription as string}
					leftTeamName={breakdown.leftTeam.name as string}
					leftDisplayValue={breakdown.leftTeam.winnerDisplayValue as string}
					leftPercent={breakdown.leftTeam.winnerPercent as number}
					rightTeamName={breakdown.rightTeam.name as string}
					rightDisplayValue={breakdown.rightTeam.winnerDisplayValue as string}
					rightPercent={breakdown.rightTeam.winnerPercent as number}
					colorValue1={colorValue1 as string}
					colorValue2={colorValue2 as string}
				/>
			)}
		</div>
	);
});

export default MatchDetails;
