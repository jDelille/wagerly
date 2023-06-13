'use client';

import { useEffect, useState } from 'react';
import matchStore from '@/app/store/matchStore';
import Image from 'next/image';
import { MatchHeader, MatchOdds, Breakdown } from '@/app/types/Match';
import { getMatch, getOdds } from '@/app/api/sportsbookData';

import styles from './MatchDetails.module.scss';
import useBetSlipModal from '@/app/hooks/useBetSlipModal';
import betSlipStore from '@/app/store/betSlipStore';

type Props = {
	matchId: string;
};

const MatchDetails: React.FC<Props> = ({ matchId }) => {
	const [isLoading, setIsLoading] = useState(false);

	const [header, setHeader] = useState<MatchHeader>();
	const [odds, setOdds] = useState<MatchOdds>();
	const [spreadBreakdown, setSpreadBreakdown] = useState<Breakdown>();
	const [totalBreakdown, setTotalBreakdown] = useState<Breakdown>();
	const [winnerBreakdown, setWinnerBreakdown] = useState<Breakdown>();

	const league = matchStore.league;

	const betSlipModal = useBetSlipModal();

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true);
				const delay = 0;
				setTimeout(async () => {
					const header = await getMatch(matchId, league);
					const odds = await getOdds(matchId, league);
					setHeader(header.header);
					if (odds) {
						setOdds(odds.sectionList[0].modules[0].model);
					}
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

	console.log(header)

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

	const leftSpreadWidth =
		breakdown.leftTeam.spreadPercent &&
		`${(breakdown.leftTeam.spreadPercent * 100).toFixed(0)}%`;

	const leftTotalWidth =
		breakdown.leftTeam.totalPercent &&
		`${(breakdown.leftTeam.totalPercent * 100).toFixed(0)}%`;

	const leftWinnerWidth =
		breakdown.leftTeam.winnerPercent &&
		`${(breakdown.leftTeam.winnerPercent * 100).toFixed(0)}%`;

	const rightSpreadWidth =
		breakdown.rightTeam.spreadPercent &&
		`${(breakdown.rightTeam.spreadPercent * 100).toFixed(0)}%`;

	const rightTotalWidth =
		breakdown.rightTeam.totalPercent &&
		`${(breakdown.rightTeam.totalPercent * 100).toFixed(0)}%`;

	const rightWinnerWidth =
		breakdown.rightTeam.winnerPercent &&
		`${(breakdown.rightTeam.winnerPercent * 100).toFixed(0)}%`;

	// betslip store stuff

	const addToBetStore = (index: number, value?: any, team?: string) => {
		if (odds) {
			betSlipModal.onOpen();
			betSlipStore.setDate(odds.eventTime);
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

	return isLoading || !odds ? (
		<div className={styles.loading}>Loading...</div>
	) : (
		<div className={styles.matchup}>
			<div className={styles.header}>
				<div className={styles.matchup}>
					<strong>{matchHeader.leftTeam.longName} vs {matchHeader.rightTeam.longName}</strong>
					<div className={styles.logos}>
						<Image
							src={matchHeader.leftTeam.logo as string}
							alt={matchHeader.leftTeam.imageAltText as string}
							width={50}
							height={50}
						/>
						<Image
							src={matchHeader.rightTeam.logo as string}
							alt={matchHeader.rightTeam.imageAltText as string}
							width={50}
							height={50}
						/>
					</div>
				</div>
				<div className={styles.date}>
					<span>{formattedDate}</span>
				</div>

				<div className={styles.matchInfo}>
					<Image
						src={header?.sportLogoUrl as string}
						alt='sport logo url'
						width={30}
						height={30}
					/>
					<div className={styles.venue}>
						<span>{header?.venueName} {header?.venueLocation}</span>
					</div>
				</div>
			</div>

			{odds ? (
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
								<strong className={styles.abbreviation}>{header?.leftTeam.name}</strong>
							</div>
							{odds?.odds.rows[0].values?.map((value, i) => {
								if (i <= 2) {
									return (
										<span
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
								<strong className={styles.abbreviation}>{header?.rightTeam.name}</strong>
							</div>

							{odds?.odds.rows[1].values?.map((value, i) => {
								if (i <= 2) {
									return (
										<span
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
			) : (
				<strong className={styles.noOddsMessage}>
					{' '}
					- Odds Not Yet Available -
				</strong>
			)}

			{spreadBreakdown && (
				<div className={styles.breakdown}>
					<strong>{breakdown.spreadBreakdownTitle}</strong>
					{breakdown.spreadBreakdownDescription && (
						<div className={styles.description}>
							{breakdown.spreadBreakdownDescription}
						</div>
					)}

					<div className={styles.chart}>
						<div className={styles.leftTeamBreakdown}>
							<strong>{breakdown.leftTeam.name}</strong>
							<span>{breakdown.leftTeam.spreadDisplayValue}</span>
						</div>
						<div className={styles.bar}>
							<div
								className={styles.leftPercent}
								style={{ width: leftSpreadWidth }}></div>
							<div
								className={styles.rightPercent}
								style={{ width: rightSpreadWidth }}></div>
						</div>
						<div className={styles.rightTeamBreakdown}>
							<strong>{breakdown.rightTeam.name}</strong>
							<span>{breakdown.rightTeam.spreadDisplayValue}</span>
						</div>
					</div>
				</div>
			)}

			{totalBreakdown && (
				<div className={styles.breakdown}>
					<strong>{breakdown.totalBreakdownTitle}</strong>
					<div className={styles.description}>
						{breakdown.totalBreakdownDescription}
					</div>
					<div className={styles.chart}>
						<div className={styles.leftTeamBreakdown}>
							<strong>{breakdown.leftTeam.name}</strong>
							<span>{breakdown.leftTeam.totalDisplayValue}</span>
						</div>
						<div className={styles.bar}>
							<div
								className={styles.leftPercent}
								style={{ width: leftTotalWidth }}></div>
							<div
								className={styles.rightPercent}
								style={{ width: rightTotalWidth }}></div>
						</div>
						<div className={styles.rightTeamBreakdown}>
							<strong>{breakdown.rightTeam.name}</strong>
							<span>{breakdown.rightTeam.totalDisplayValue}</span>
						</div>
					</div>
				</div>
			)}

			{winnerBreakdown && (
				<div className={styles.breakdown}>
					<strong>{breakdown.winnerBreakdownTitle}</strong>
					<div className={styles.description}>
						{breakdown.winnerBreakdownDescription}
					</div>
					<div className={styles.chart}>
						<div className={styles.leftTeamBreakdown}>
							<strong>{breakdown.leftTeam.name}</strong>
							<span>{breakdown.leftTeam.winnerDisplayValue}</span>
						</div>
						<div className={styles.bar}>
							<div
								className={styles.leftPercent}
								style={{ width: leftWinnerWidth }}></div>
							<div
								className={styles.rightPercent}
								style={{ width: rightWinnerWidth }}></div>
						</div>
						<div className={styles.rightTeamBreakdown}>
							<strong>{breakdown.rightTeam.name}</strong>
							<span>{breakdown.rightTeam.winnerDisplayValue}</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MatchDetails;
