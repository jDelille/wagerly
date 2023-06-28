import {
	faBaseballBatBall,
	faBell,
	faBookmark,
	faHashtag,
	faPenToSquare,
	faUser,
} from '@fortawesome/free-solid-svg-icons';

export const NavLinks = Object.freeze({
	navLinks: [
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
		// {
		// 	id: 4,
		// 	label: 'Notifications',
		// 	icon: faBell,
		// 	href: `/notifications/${currentUsername}`,
		// 	hasNotification: hasNotification,
		// },
		// {
		// 	id: 5,
		// 	label: 'Bookmarks',
		// 	icon: faBookmark,
		// 	href: `/bookmarks/${currentUsername}`,
		// },
	],
});
