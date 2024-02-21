<script lang="ts">
	import { getItems, handlePlayerInput } from '$lib/store';
	import type { Item } from '$lib/store/type';
	import { fade } from 'svelte/transition';
	import ItemButton from './ItemButton.svelte';

	const items = getItems();
	let selectedItem: Item | null = items[0];
	let computerItem: Item | null = items[1];
	let resultToShow = 'You win';

	$: isPlaying = selectedItem !== null;
	$: shouldShowResult = true;

	const onPlayerInput = async (item: Item) => {
		selectedItem = item;
		const { computerInput, result } = await handlePlayerInput(item);
		console.log(computerInput);
		computerItem = computerInput;
		resultToShow = result === 'draw' ? 'draw' : 'You ' + result;
		setTimeout(() => {
			shouldShowResult = true;
		}, 1000);
	};

	const onClickPlayAgain = () => {
		selectedItem = null;
		computerItem = null;
		shouldShowResult = false;
	};
</script>

<div class="flex flex-col flex-1 w-full items-center">
	<div
		class="board-container relative flex justify-center items-center"
		class:has-picked={isPlaying}
	>
		{#if selectedItem === null}
			<img
				in:fade={{ duration: 200, delay: 300 }}
				out:fade={{ duration: 200 }}
				src="images/bg-triangle.svg"
				alt=""
				class="board-bg"
			/>
		{/if}
		{#each items as item}
			<ItemButton
				bind:item
				{selectedItem}
				{onPlayerInput}
				shouldShowPlaceholder={false}
				isComputer={false}
			/>
		{/each}

		{#if selectedItem !== null}
			<ItemButton
				bind:item={computerItem}
				{selectedItem}
				{onPlayerInput}
				shouldShowPlaceholder={true}
				isComputer={true}
			/>
		{/if}
	</div>

	{#if shouldShowResult}
		<div class="-mt-10 w-[220px] flex flex-col items-center gap-4" transition:fade>
			<p class="text-[56px] font-bold uppercase">{resultToShow}</p>
			<button
				class="w-full h-12 bg-white rounded-lg text-[#3B4262] uppercase font-semibold text-base tracking-[2.5px] hover:text-[#DB2E4D]"
				on:click={onClickPlayAgain}>play again</button
			>
		</div>
	{/if}
</div>

<style>
	.board-container {
		margin: 0 auto;
		width: 311px;
		height: 281px;

		@media screen and (min-width: 768px) {
			width: 476px;
			height: 430px;
		}
	}

	.board-bg {
		position: absolute;
		top: 27.5%;
		scale: 1.2;
		width: 70%;

		@media screen and (min-width: 768px) {
			top: 20%;
		}
	}
</style>
