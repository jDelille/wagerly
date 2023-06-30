import {
	faBaseballBatBall,
	faBell,
	faBookmark,
	faHashtag,
	faPenToSquare,
	faRankingStar,
	faUser,
} from '@fortawesome/free-solid-svg-icons';

export const getNavLinks = (currentUsername: string) => {
	return [
		{
			id: 1,
			label: 'Explore',
			icon: faHashtag,
			href: '/',
		},
		{
			id: 2,
			label: 'Sportsbook',
			icon: faBaseballBatBall,
			href: '/sportsbook',
		},
		{
			id: 3,
			label: 'Post',
			icon: faPenToSquare,
			href: '/create-post',
		},
		{
			id: 4,
			label: 'Profile',
			icon: faUser,
			href: `/user/${currentUsername}`,
		},
		{
			id: 5,
			label: 'Leaderboard',
			icon: faRankingStar,
			href: '/leaderboard',
		},
		{
			id: 6,
			label: 'Bookmarks',
			icon: faBookmark,
			href: `/bookmarks/${currentUsername}`,
		},
	];
};
