import { AiFillLike } from 'react-icons/ai';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { FaBell, FaHashtag, FaUserCircle, FaPenSquare } from 'react-icons/fa';
import { MdSportsBasketball } from 'react-icons/md';
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
			icon: MdSportsBasketball,
			href: '/sportsbook',
		},
		{
			id: 3,
			label: 'Post',
			icon: FaPenSquare,
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
