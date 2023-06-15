import { AiFillLike } from 'react-icons/ai';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { FaBell, FaHashtag, FaUserCircle } from 'react-icons/fa';
import { RiMoneyDollarBoxFill } from 'react-icons/ri';

export const NavLinks = Object.freeze({
	navLinks: [
		{
			id: 1,
			label: 'Explore',
			icon: FaHashtag,
			href: '/',
		},
		{
			id: 2,
			label: 'Sportsbook',
			icon: RiMoneyDollarBoxFill,
			href: '/sportsbook',
		},
		{
			id: 3,
			label: 'Post',
			icon: RiMoneyDollarBoxFill,
			href: '/create-post',
		},
		// {
		// 	id: 3,
		// 	label: 'Profile',
		// 	icon: FaUserCircle,
		// 	href: (currentUsername: string) => `/user/${currentUsername}`,
		// },
		{
			id: 4,
			label: 'Notifications',
			icon: FaBell,
			href: '/',
		},
		{
			id: 5,
			label: 'Bookmarks',
			icon: BsFillBookmarkFill,
			href: '/bookmarks',
		},
		{
			id: 6,
			label: 'Likes',
			icon: AiFillLike,
			href: '/likes',
		},
	],
});
