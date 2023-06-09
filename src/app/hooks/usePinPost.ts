import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

const usePinPost = (
	postId: string,
	currentUserId: string,
	setIsMenuOpen: (value: boolean) => void
) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handlePinPost = useCallback(() => {
		setIsLoading(true);

		// if (!currentUserId) {
		// 	return;
		// }

		try {
			axios
				.post(`/api/pin/${postId}`)
				.then(() => {
					router.refresh();
				})
				.catch(() => {})
				.finally(() => {
					setIsMenuOpen(false);
				});
		} catch (error) {}
	}, [postId, router, setIsMenuOpen]);

	const handleUnPinPost = useCallback(() => {
		setIsLoading(true);

		// if (!currentUserId) {
		// 	return;
		// }

		try {
			axios
				.delete(`/api/pin/${postId}`)
				.then(() => {
					router.refresh();
				})
				.catch(() => {})
				.finally(() => {
					setIsMenuOpen(false);
				});
		} catch (error) {
			setIsLoading(false);
			router.refresh();
		}
	}, [postId, router, setIsMenuOpen]);

	return { handlePinPost, handleUnPinPost, isLoading };
};

export default usePinPost;
