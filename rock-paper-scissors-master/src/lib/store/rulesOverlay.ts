import { writable } from 'svelte/store';

const isRulesOverlayOpen = writable(false);

function openRulesOverlay() {
	isRulesOverlayOpen.set(true);
}

function closeRulesOverlay() {
	isRulesOverlayOpen.set(false);
}

export { isRulesOverlayOpen, openRulesOverlay, closeRulesOverlay };
