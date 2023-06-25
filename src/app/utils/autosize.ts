const autosize = (textAreaRef: React.RefObject<HTMLTextAreaElement>): void => {
	if (textAreaRef.current) {
		const el = textAreaRef.current;
		setTimeout(() => {
			el.style.cssText = 'height:auto; padding:0';
			el.style.cssText = `height:${el.scrollHeight}px`;
		}, 0);
	}
};

export default autosize;
