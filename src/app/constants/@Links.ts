import {
	faBaseballBatBall,
	faBell,
	faBookmark,
	faHashtag,
	faPenToSquare,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { AiFillLike } from 'react-icons/ai';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { FaBell, FaHashtag, FaPenSquare, FaUserCircle } from 'react-icons/fa';
import { MdSportsBasketball } from 'react-icons/md';
import { RiMoneyDollarBoxFill } from 'react-icons/ri';

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
