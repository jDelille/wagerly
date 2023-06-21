import { useCallback, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const useBlockUser = (userId: string) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleBlockUser = useCallback(() => {
		setIsLoading(true);

		try {
			axios.post(`/api/block/${userId}`).then(() => router.refresh());
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}

		setIsLoading(false);
	}, [router, userId]);

	const handleUnblockUser = useCallback(() => {
		setIsLoading(true);

		try {
			axios.delete(`/api/block/${userId}`).then(() => router.refresh());
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}

		setIsLoading(false);
	}, [router, userId]);

	return { handleBlockUser, handleUnblockUser };
};

export default useBlockUser;
