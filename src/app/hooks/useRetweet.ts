import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

const useRetweet = (postData: any) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleRetweet = useCallback(() => {
		if (isLoading) {
			return;
		}

		setIsLoading(true);

		try {
			axios.post(`/api/retweet/${postData.id}`, postData).then(() => {
				router.refresh();
			});
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}

		setIsLoading(false);
	}, [router, isLoading, postData]);

	return { handleRetweet, isLoading };
};

export default useRetweet;
