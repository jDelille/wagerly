import { useEffect, useState } from 'react';

const useInputLengthValidator = (
	inputLength: number,
	maxLength: number
): boolean => {
	const [error, setError] = useState(false);

	useEffect(() => {
		setError(inputLength > maxLength);
	}, [inputLength, maxLength]);

	return error;
};

export default useInputLengthValidator;
