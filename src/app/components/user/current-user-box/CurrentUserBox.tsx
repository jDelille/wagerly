'use client';

import { SafeUser } from '@/app/types/SafeUser';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Avatar from '../Avatar/Avatar';
import { useState } from 'react';

import styles from './CurrentUserBox.module.scss';
import CurrentUserMenu from './CurrentUserMenu';

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
			<div className={styles.displayName}>
				<strong>{currentUser?.name}</strong>
				<span>{currentUser?.username}</span>
			</div>
			<BsThreeDotsVertical
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				className={styles.menuButton}
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
