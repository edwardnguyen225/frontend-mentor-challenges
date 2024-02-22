<script lang="ts">
	import { browser } from '$app/environment';

	import { fly, fade } from 'svelte/transition';
	import { rulesOverlay, gamePlayType } from '$lib/store';
	import { onDestroy, onMount } from 'svelte';

	let imageSrc: string;
	let isNormalGame;
	const unsubscribe = gamePlayType.subscribe((value) => {
		isNormalGame = value === 'normal';
		imageSrc = isNormalGame ? 'images/image-rules.svg' : 'images/image-rules-bonus.svg';
	});

	onDestroy(unsubscribe);

	const onEscapeKeyPressed = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			rulesOverlay.close();
		}
	};

	if (browser) {
		document.addEventListener('keydown', onEscapeKeyPressed);

		onDestroy(() => {
			document.removeEventListener('keydown', onEscapeKeyPressed);
		});
	}
</script>

{#if $rulesOverlay}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
		on:click={rulesOverlay.close}
	>
		<div
			in:fly={{ y: '-100vh', duration: 500 }}
			class="bg-white p-8 pt-24 rounded-lg w-screen h-screen flex flex-col items-center justify-between xl:w-[400px] xl:h-[unset] xl:pt-8"
		>
			<div class="flex w-full justify-center items-center xl:justify-between">
				<h2 class="text-[32px] leading-8 font-semibold text-[var(--dark-text)] uppercase">Rules</h2>

				<button
					class="hidden w-12 h-12 justify-center items-center rounded-full xl:flex"
					tabindex="0"
					on:click={rulesOverlay.close}
				>
					<img src="images/icon-close.svg" alt="Close" />
				</button>
			</div>

			<img src={imageSrc} alt="Rules" />

			<button
				class="close-rules-btn w-12 h-12 flex justify-center items-center rounded-full xl:hidden"
				on:click={rulesOverlay.close}
			>
				<img src="images/icon-close.svg" alt="Close" />
			</button>
		</div>
	</div>
{/if}
