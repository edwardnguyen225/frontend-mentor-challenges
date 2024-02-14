<script lang="ts">
	import { getItems, handlePlayerInput } from '$lib/store';

	const items = getItems();

	const translateTriangle = [
		{ x: 0, y: '100%' },
		{ x: '-100%', y: '-100%' },
		{ x: '100%', y: '-100%' }
	];
	const calculateTrianglePosition = (index: number) => {
		return translateTriangle[index];
	};
</script>

<div class="board-container relative flex justify-center items-center">
	<img src="images/bg-triangle.svg" alt="" class="absolute w-3/4 z-[-1]" />
	{#each items as item, index}
		<button
			class="btn w-[30%] h-[30%] bg-white flex justify-center items-center rounded-full border-[1em] absolute"
			style="border-color: {item.colorLayer1}; transform: translate({calculateTrianglePosition(
				index
			).x}, {calculateTrianglePosition(index)
				.y}); box-shadow: 0 0.5em {item.colorLayer0}, inset 0 0.5em var(--inset-shadow);"
			on:click={() => handlePlayerInput(item)}
		>
			<img src={item.image} alt={item.name} class="w-1/2" />
		</button>
	{/each}
</div>

<style>
	.board-container {
		margin: 0 auto;
		--width-length: calc(100vw - 32px * 2);
		--max-width: 500px;
		width: var(--width-length);
		height: var(--width-length);

		max-width: var(--max-width);
		max-height: var(--max-width);
	}

	.btn::before {
		--btn-width: calc(100% + 2em); /* 100% + 2 * border-width */
		content: '';
		position: absolute;
		width: var(--btn-width);
		height: var(--btn-width);
		border-radius: 50%;
		background: linear-gradient(rgba(255, 255, 255, 0.0966), rgba(255, 255, 255, 0.0001));
		z-index: -1;
	}
</style>
