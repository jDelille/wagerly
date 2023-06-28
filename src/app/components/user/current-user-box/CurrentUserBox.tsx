'use client';

import Avatar from '@/app/components/user/Avatar/Avatar';
import { SafeUser } from '@/app/types/SafeUser';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

import styles from './CurrentUserBox.module.scss';
import CurrentUserMenu from './CurrentUserMenu';
import { faCircleDollarToSlot, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
	currentUser: SafeUser | null;
};

const CurrentUserBox: React.FC<Props> = ({ currentUser }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className={styles.currentUserBox}>
			<Avatar
				photo={currentUser?.photo || '/images/placeholder.png'}
				username={currentUser?.username}
			/>
			<div className={styles.user}>
				<div className={styles.displayName}>
					<strong>{currentUser?.name}</strong>
					&bull;
					<span>@{currentUser?.username}</span>
				</div>
				<div className={styles.balance}>
					<span>Earnings: {currentUser?.earnings || 0}</span>
				</div>
			</div>
			<BsThreeDotsVertical
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				className={styles.menuButton}
				size={20}
			/>
			{isMenuOpen && (
				<CurrentUserMenu
					setIsMenuOpen={setIsMenuOpen}
					currentUser={currentUser}
				/>
			)}
		</div>
	);
};

export default CurrentUserBox;
