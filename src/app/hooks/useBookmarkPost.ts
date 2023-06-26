import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

const useBookmarkPost = (postId: string) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleBookmarkPost = useCallback(() => {
		setIsLoading(true);
		try {
			axios.post(`/api/bookmark/${postId}`).then(() => {
				router.refresh();
			});
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
		setIsLoading(false);
	}, [postId, router]);

	const handleUnBookmarkPost = useCallback(() => {
		setIsLoading(true);
		try {
			axios.delete(`/api/bookmark/${postId}`).then(() => {
				router.refresh();
			});
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
		setIsLoading(false);
	}, [postId, router]);

	return { handleBookmarkPost, handleUnBookmarkPost, isLoading };
};

export default useBookmarkPost;
