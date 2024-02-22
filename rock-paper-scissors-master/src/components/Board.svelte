<script lang="ts">
	import { gamePlayType, getItems, handlePlayerInput } from '$lib/store';
	import type { Item } from '$lib/store/type';
	import { fade } from 'svelte/transition';
	import ItemButton from './ItemButton.svelte';
	import { onDestroy } from 'svelte';

	let isNormalGame: boolean;
	let items = getItems();

	const unsubscribe = gamePlayType.subscribe((value) => {
		isNormalGame = value === 'normal';
		items = getItems();
	});
	onDestroy(unsubscribe);

	$: imgSrc = isNormalGame ? 'images/bg-triangle.svg' : 'images/bg-pentagon.svg';

	let selectedItem: Item | null = null;
	let computerItem: Item | null = null;
	let resultToShow = 'You lose';

	$: isPlaying = selectedItem !== null;
	$: shouldShowResult = false;
	$: doesUserWin = false;

	const onPlayerInput = async (item: Item) => {
		selectedItem = item;
		const { computerInput, result } = await handlePlayerInput(item);
		console.log(computerInput);
		computerItem = computerInput;
		resultToShow = result === 'draw' ? 'draw' : 'You ' + result;
		doesUserWin = result === 'win';

		setTimeout(() => {
			shouldShowResult = true;
		}, 300);
	};

	const onClickPlayAgain = () => {
		selectedItem = null;
		computerItem = null;
		shouldShowResult = false;
	};
</script>

<div class="flex flex-col flex-1 w-full items-center">
	<div
		class="board-container relative flex justify-center items-center shrink-0 overflow-visible"
		class:has-picked={isPlaying}
		class:user-win={shouldShowResult && doesUserWin}
		class:computer-win={shouldShowResult && !doesUserWin}
		class:is-advanced={!isNormalGame}
	>
		{#if selectedItem === null}
			<img
				in:fade={{ duration: 200, delay: 300 }}
				out:fade={{ duration: 200 }}
				src={imgSrc}
				alt=""
				class="board-bg"
			/>
		{/if}
		{#each items as item}
			<ItemButton
				{item}
				{selectedItem}
				{onPlayerInput}
				shouldShowPlaceholder={false}
				isComputer={false}
				isWinner={shouldShowResult && doesUserWin}
			/>
		{/each}

		{#if selectedItem !== null}
			<ItemButton
				item={computerItem}
				{selectedItem}
				{onPlayerInput}
				shouldShowPlaceholder={true}
				isComputer={true}
				isWinner={shouldShowResult && !doesUserWin}
			/>
		{/if}
	</div>
</div>

{#if shouldShowResult}
	<div
		class="w-[220px] flex flex-col grow-0 items-center gap-4 xl:absolute"
		transition:fade={{ duration: 200, delay: 0 }}
	>
		<p class="text-[56px] font-bold uppercase">{resultToShow}</p>
		<button
			class="w-full h-12 bg-white rounded-lg text-[#3B4262] uppercase font-semibold text-base tracking-[2.5px] hover:text-[#DB2E4D]"
			on:click={onClickPlayAgain}>play again</button
		>
	</div>
{/if}

<style>
	.board-container {
		margin: 0 auto;
		width: 311px;
		height: 281px;
	}

	.board-bg {
		position: absolute;
		top: 27.5%;
		scale: 1.2;
		width: 70%;
	}

	@media screen and (min-width: 1366px) {
		.board-container {
			width: 476px;
			height: 430px;
		}

		.board-bg {
			top: 20%;
		}
	}
</style>
