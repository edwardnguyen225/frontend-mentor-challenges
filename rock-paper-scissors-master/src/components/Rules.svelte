<script lang="ts">
	import { fly } from 'svelte/transition';
	import { rulesOverlay, gamePlayType } from '$lib/store';
	import { onDestroy } from 'svelte';

	let isNormalGame;
	const unsubscribe = gamePlayType.subscribe((value) => {
		isNormalGame = value === 'normal';
	});

	const imageSrc = isNormalGame ? 'images/image-rules.svg' : 'images/image-rules-bonus.svg';

	onDestroy(unsubscribe);
</script>

{#if $rulesOverlay}
	<div
		transition:fly={{ y: '-100vh', duration: 500 }}
		class={'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'}
	>
		<div class="bg-white p-8 pt-24 rounded-lg w-screen h-screen flex flex-col items-center gap-28">
			<h2 class="text-[32px] leading-8 font-semibold text-[var(--dark-text)] uppercase">Rules</h2>

			<img src={imageSrc} alt="Rules" />

			<button
				class="close-rules-btn w-12 h-12 flex justify-center items-center rounded-full"
				on:click={rulesOverlay.close}
			>
				<img src="images/icon-close.svg" alt="Close" />
			</button>
		</div>
	</div>
{/if}
