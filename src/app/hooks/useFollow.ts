import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

const useFollow = (
	userId: string,
	username: string,
	currentUserId: string,
	setIsMenuOpen?: (value: boolean) => void
) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleFollow = useCallback(() => {
		setIsLoading(true);

		if (!currentUserId) {
			return;
		}

		try {
			axios
				.post(`/api/follow/${userId}`)
				.then(() => {
					router.refresh();
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setIsLoading(false);
					if (setIsMenuOpen) {
						setIsMenuOpen(false);
					}
				});
		} catch (error) {
			setIsLoading(false);
			router.refresh();
		}
	}, [currentUserId, router, setIsMenuOpen, userId]);

	const handleUnfollow = useCallback(() => {
		setIsLoading(true);

		if (!currentUserId) {
			return;
		}

		try {
			axios
				.delete(`/api/follow/${userId}`)
				.then(() => {
					router.refresh();
				})
				.catch(() => {})
				.finally(() => {
					if (setIsMenuOpen) {
						setIsMenuOpen(false);
					}
				});
		} catch (error) {
			setIsLoading(false);
			router.refresh();
		}
	}, [currentUserId, router, setIsMenuOpen, userId]);

	return { handleFollow, handleUnfollow, isLoading };
};

export default useFollow;
