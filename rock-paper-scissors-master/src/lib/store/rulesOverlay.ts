import { writable } from 'svelte/store';

const createRulesOverlay = () => {
	const { subscribe, set } = writable(false);
	return {
		subscribe,
		open: () => set(true),
		close: () => set(false)
	};
};

const rulesOverlay = createRulesOverlay();
export { rulesOverlay };
