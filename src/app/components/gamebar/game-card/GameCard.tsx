'use client';

import matchStore from '@/app/store/matchStore';
import { Game } from '@/app/types/Game';
import Image from 'next/image';
import Link from 'next/link';

import styles from './GameCard.module.scss';

type Props = {
	match: Game;
};

const GameCard: React.FC<Props> = ({ match }) => {
	// const isScheduled = match.eventStatus === 2;

	const formattedTime = new Date(match.date).toLocaleTimeString([], {
		hour: 'numeric',
		minute: 'numeric',
	});

	const league = matchStore.league

	const isNFL = league === 'nfl'

	const tvStation = match.competitions[0].geoBroadcasts[0]?.media.shortName;

	const lowerTeam = {
		name: match.competitions[0].competitors[0].team.name,
		longName: match.competitions[0].competitors[0].team.name,
		record: match.competitions[0].competitors[0].records?.[0].summary,
		score: match.competitions[0].competitors[0].score,
		imageAltText: 'logo',
		logoUrl: match.competitions[0].competitors[0].team.logo,
		id: match.competitions[0].competitors[0].team.id,
		abbrv: match.competitions[0].competitors[0].team.abbreviation,
	};

	const upperTeam = {
		name: match.competitions[0].competitors[1].team.name,
		longName: match.competitions[0].competitors[1].team.name,
		record: match.competitions[0].competitors[1].records?.[0].summary,
		score: match.competitions[0].competitors[1].score,
		imageAltText: 'logo',
		logoUrl: match.competitions[0].competitors[1].team.logo,
		id: match.competitions[0].competitors[1].team.id,
		abbrv: match.competitions[0].competitors[1].team.abbreviation,
	};

	const nflPreviewOdds = isNFL ? match.competitions[0].odds[0].details : null

	const inProgress = match.status.type.state === 'in';
	const isScheduled = match.status.type.state === 'pre';
	const hasEnded = match.status.type.state === 'post';

	const statusLine = match.status.type.shortDetail;

	const awaySpreadOdds =
		match.competitions[0].odds?.[1]?.awayTeamOdds.spreadOdds || null;
	const homeSpreadOdds =
		match.competitions[0].odds?.[1]?.homeTeamOdds.spreadOdds || null;

	const setMatchStoreData = () => {
		matchStore.setHomeTeamId(lowerTeam.id);
		matchStore.setAwayTeamId(upperTeam.id);
	};

	return (
		<Link
			href={`/sportsbook/${match.id}`}
			onClick={setMatchStoreData}
			className={styles.gameCard}>
			<div className={styles.league}>
				<span>{league.toUpperCase()}</span>
			</div>
			<div className={styles.content}>
				<div className={styles.displayName}>
					<div className={styles.upper}>
						<Image
							src={upperTeam.logoUrl}
							alt={upperTeam.imageAltText}
							width={20}
							height={20}
						/>
						<strong>{upperTeam.abbrv}</strong>
					</div>
					<div className={styles.lower}>
						<Image
							src={lowerTeam.logoUrl}
							alt={lowerTeam.imageAltText}
							width={20}
							height={20}
						/>
						<strong>{lowerTeam.abbrv}</strong>
					</div>
				</div>
				<div className={styles.info}>
					{isScheduled ? (
						<>
							<span>{formattedTime}</span>
							<span className={styles.station}>{tvStation || 'MLBN'}</span>
						</>
					) : (
						<>
							<strong className={styles.score}>{upperTeam.score || 0}</strong>
							<strong className={styles.score}>{lowerTeam.score || 0}</strong>
						</>
					)}
				</div>
			</div>

			<div className={styles.status}>
				{isScheduled && !isNFL ? (
					<>
						<div className={styles.preStatus}>
							<span>
								{upperTeam.abbrv} {awaySpreadOdds}
							</span>
							<span>
								{lowerTeam.abbrv} {homeSpreadOdds}
							</span>
						</div>
					</>
				) : (
					<span className={styles.statusLine}>{statusLine}</span>
				)}
			</div>
		</Link>
	);
};

export default GameCard;
