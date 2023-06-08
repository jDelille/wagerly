import { formatDistanceToNowStrict } from 'date-fns';

export function createdAtFormatter(
	postCreatedAt: string | undefined
): string | null {
	if (!postCreatedAt) {
		return null;
	}

	return formatDistanceToNowStrict(new Date(postCreatedAt), {})
		.replace(' seconds', 's')
		.replace(' second', 's')
		.replace(' minutes', 'm')
		.replace(' minute', 'm')
		.replace(' hours', 'h')
		.replace(' days', 'd')
		.replace(' day', 'd')
		.replace(' hour', 'h');
}
