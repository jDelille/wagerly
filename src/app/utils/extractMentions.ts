const extractMentions = (text: string) => {
	const mentionRegex = /@(\w+)/g;
	const mentions = [];
	let match;

	while ((match = mentionRegex.exec(text))) {
		const username = match[1];
		mentions.push(username);
	}

	return mentions;
};

export default extractMentions;
