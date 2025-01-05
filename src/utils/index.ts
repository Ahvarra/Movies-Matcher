export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getPastTenseVerb(verb: string) {
	return verb.endsWith("e") ? `${verb}d` : `${verb}ed`;
}
