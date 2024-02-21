<script lang="ts">
	import { getItems, handlePlayerInput } from '$lib/store';
	import type { Item } from '$lib/store/type';
	import { fade } from 'svelte/transition';
	import ItemButton from './ItemButton.svelte';

	const items = getItems();
	let selectedItem: Item | null = items[0];

	const onPlayerInput = (item: Item) => {
		if (selectedItem) {
			selectedItem = null;
			return;
		}

		selectedItem = item;
		handlePlayerInput(item);
	};
</script>

<div class="board-container relative flex justify-center items-center">
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
		<ItemButton bind:item {selectedItem} {onPlayerInput} />
	{/each}
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
