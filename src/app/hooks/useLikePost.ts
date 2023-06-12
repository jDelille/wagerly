import { useCallback, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const useLikePost = (postId: string) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleLikePost = useCallback(() => {
		if (isLoading) {
			return;
		}

		setIsLoading(true);

		try {
			axios.post(`/api/like-post/${postId}`).then(() => {
				router.refresh();
			});
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}

		setIsLoading(false);
	}, [postId, router, isLoading]);

	const handleUnLikePost = useCallback(() => {
		if (isLoading) {
			return;
		}

		setIsLoading(true);

		// if (!currentUserId) {
		// 	return;
		// }

		try {
			axios
				.delete(`/api/like-post/${postId}`)
				.then(() => {
					router.refresh();
				})
				.catch(() => {});
		} catch (error) {
			setIsLoading(false);
			router.refresh();
		}
	}, [isLoading, postId, router]);

	return { handleLikePost, handleUnLikePost, isLoading };
};

export default useLikePost;
