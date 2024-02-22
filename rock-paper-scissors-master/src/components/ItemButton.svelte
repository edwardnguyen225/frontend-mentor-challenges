<script lang="ts">
	import { fade, fly, scale } from 'svelte/transition';
	import type { Item } from '$lib/store/type';

	export let item: Item | null;
	export let selectedItem: Item | null;
	export let shouldShowPlaceholder: boolean;
	export let isComputer: boolean;
	export let isWinner: boolean;

	export let onPlayerInput: (item: Item) => void;

	$: isSelected = !!selectedItem && selectedItem.name === item?.name && !isComputer;
	$: shouldShow = isSelected || !selectedItem || isComputer;

	$: itemInTransition = isComputer ? scale : fade;
	$: itemInDelay = isComputer ? 0 : 300;
</script>

{#if shouldShow && item}
	<button
		disabled={!!selectedItem}
		in:itemInTransition={{ duration: 200, delay: itemInDelay }}
		out:fade={{ duration: 200 }}
		class="btn btn-{item.name} relative"
		class:is-selected={isSelected}
		class:is-computer={isComputer}
		style="border-color: {item.colorLayer1};  box-shadow: 0 0.5em {item.colorLayer0}, inset 0 0.5em var(--inset-shadow);"
		on:click={() => item && onPlayerInput(item)}
		{...$$restProps}
	>
		<img src={item.image} alt={item.name} class="w-1/2" />
	</button>
{:else if shouldShowPlaceholder}
	<div class="btn-placeholder" class:is-computer={isComputer} />
{/if}

{#if isWinner}
	<div class="winner-bg" in:scale>
		<div class="winner-bg-layer winner-bg-layer-0" />
		<div class="winner-bg-layer winner-bg-layer-1" />
		<div class="winner-bg-layer winner-bg-layer-2" />
	</div>
{/if}

{#if isSelected || isComputer}
	<div
		in:fly={{ y: '-2rem', duration: 500, delay: 300 }}
		out:fly={{ y: '-2rem', duration: 500 }}
		class="selected-text"
		class:is-computer={isComputer}
	>
		{isComputer ? 'The house picked' : 'You picked'}
	</div>
{/if}

<style>
	:global(.board-container) {
		--selected-item-scale: 1.1;

		--item-width: 30%;
		--item-min-width: 130px;
		--item-max-width: 200px;
		--item--border-width: 1em;

		--item-hover-width: 160%;

		--translate-top: -58%;
		--translate-left: -70%;
		--translate-bottom: 58%;
	}

	.btn {
		position: absolute;
		width: var(--item-width);
		height: var(--item-width);
		min-width: calc(var(--item-min-width));
		min-height: calc(var(--item-min-width));
		max-width: var(--item-max-width);
		max-height: var(--item-max-width);

		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
		border-width: var(--item--border-width);

		transition:
			transform 0.5s ease-in-out,
			scale 0.5s ease-in-out;
	}

	.btn.btn-rock {
		transform: translate(0, var(--translate-bottom));
	}

	.btn.btn-paper {
		transform: translate(var(--translate-left), var(--translate-top));
	}

	.btn.btn-scissors {
		transform: translate(calc(-1 * var(--translate-left)), var(--translate-top));
	}

	:global(.board-container.is-advanced) {
		--translate-first-row-x: 0;
		--translate-first-row-y: -70%;

		--translate-second-row-x: -110%;
		--translate-second-row-y: 0;

		--translate-third-row-x: -65%;
		--translate-third-row-y: 125%;
	}

	/* First row */
	:global(.board-container.is-advanced) .btn.btn-scissors {
		transform: translate(var(--translate-first-row-x), var(--translate-first-row-y));
	}

	/* Second row */
	:global(.board-container.is-advanced) .btn.btn-spock {
		transform: translate(var(--translate-second-row-x), var(--translate-second-row-y));
	}
	:global(.board-container.is-advanced) .btn.btn-paper {
		transform: translate(calc(-1 * var(--translate-second-row-x)), var(--translate-second-row-y));
	}

	/* Third row */
	:global(.board-container.is-advanced) .btn.btn-lizard {
		transform: translate(var(--translate-third-row-x), var(--translate-third-row-y));
	}
	:global(.board-container.is-advanced) .btn.btn-rock {
		transform: translate(calc(-1 * var(--translate-third-row-x)), var(--translate-third-row-y));
	}

	.btn::before {
		--btn-width: calc(100% + 2 * var(--item--border-width));
		content: '';
		position: absolute;
		width: var(--btn-width);
		height: var(--btn-width);
		border-radius: 50%;
		background: linear-gradient(rgba(255, 255, 255, 0.0966), rgba(255, 255, 255, 0.0001));
		z-index: -1;
	}

	.btn:hover::after {
		content: '';
		position: absolute;
		width: var(--item-hover-width);
		height: var(--item-hover-width);
		border-radius: 50%;
		background: white;
		opacity: 0.1;
		z-index: -100;
	}

	:global(.has-picked) .btn:hover::after {
		opacity: 0;
	}

	.btn.is-computer {
		scale: var(--selected-item-scale);
		transform: translate(
			calc(-1 * var(--translate-left) - 0.5em),
			/* Minus 0.5em as it is scaled up */ var(--translate-top)
		) !important;
	}

	.btn.is-selected {
		scale: var(--selected-item-scale);
		transform: translate(calc(var(--translate-left) + 0.5em), var(--translate-top)) !important;
	}

	.selected-text {
		width: 133px;
		text-align: center;

		position: absolute;

		left: -0.2rem;
		margin-top: 5rem;

		font-size: 15px;
		font-weight: 700;
		line-height: 32px;
		letter-spacing: 1.88px;
		text-transform: uppercase;
	}

	.selected-text.is-computer {
		width: fit-content;
		position: absolute;
		right: -10px;
		left: auto;
	}

	.btn-placeholder {
		position: absolute;
		width: var(--item-width);
		height: var(--item-width);
		min-width: calc(var(--item-min-width));
		min-height: calc(var(--item-min-width));
		max-width: var(--item-max-width);
		max-height: var(--item-max-width);

		border-radius: 100%;

		background-color: black;
		opacity: 0.1;
	}

	.btn-placeholder.is-computer {
		--translate-top: -58%;
		--translate-left: -60%;
		transform: translate(calc((-1 * var(--translate-left)) + 0.75em), var(--translate-top));
	}

	:global(.user-win) {
		--winner-bg-translate-top: -30%;
		--winner-bg-translate-left: -33%;
	}

	:global(.computer-win) {
		--winner-bg-translate-top: -30%;
		--winner-bg-translate-left: 33%;
	}

	.winner-bg {
		width: calc(var(--item-width) * 3);
		height: calc(var(--item-width) * 3.2);
		min-width: calc(var(--item-min-width));
		min-height: calc(var(--item-min-width));

		position: absolute;
		transform: translate(var(--winner-bg-translate-left), var(--winner-bg-translate-top));

		z-index: -1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.winner-bg .winner-bg-layer {
		--base-width: 75%;
		--width-step: 30%;

		--base-opacity: 0.03;
		--opacity-step: 0.003;

		--base-index: -1;
		--index-step: -1;

		position: absolute;
		border-radius: 100%;
		background-color: white;
	}

	.winner-bg .winner-bg-layer-0 {
		width: var(--base-width);
		height: var(--base-width);
		opacity: var(--base-opacity);
		z-index: var(--base-index);
	}

	.winner-bg .winner-bg-layer-1 {
		width: calc(var(--base-width) + var(--width-step));
		height: calc(var(--base-width) + var(--width-step));
		opacity: calc(var(--base-opacity) - var(--opacity-step));
		z-index: -2;
	}

	.winner-bg .winner-bg-layer-2 {
		width: calc(var(--base-width) + 2 * var(--width-step));
		height: calc(var(--base-width) + 2 * var(--width-step));
		opacity: calc(var(--base-opacity) - 2 * var(--opacity-step));
		z-index: -3;
	}

	@media (min-width: 1366px) {
		:global(.board-container) {
			--selected-item-scale: 1.5;
		}

		:global(.board-container.has-picked) {
			--translate-top: 2rem;
		}

		:global(.board-container.computer-win),
		:global(.board-container.user-win) {
			--translate-left: -120%;
		}

		:global(.board-container.computer-win) .btn.is-computer,
		:global(.board-container.user-win) .btn.is-computer {
			--translate-left: -120%;
		}

		.btn {
			width: 198px;
			height: 203px;
			border-width: 1.5em;
		}

		.selected-text {
			font-size: 24px;
			top: -15%;
			left: -22.5%;
			width: 293px;
			transition: 0.5s ease-in-out;
		}

		:global(.board-container.user-win) .selected-text,
		:global(.board-container.computer-win) .selected-text {
			left: -52.5%;
		}

		.selected-text.is-computer {
			left: unset;
			width: 293px;
			right: -27.5%;
		}

		:global(.board-container.computer-win) .selected-text.is-computer,
		:global(.board-container.user-win) .selected-text.is-computer {
			left: unset;
			right: -52.5%;
		}

		.btn-placeholder {
			width: 300px;
			height: 300px;
			max-width: unset;
			max-height: unset;
		}

		.btn-placeholder.is-computer {
			--translate-top: 3rem;
			--translate-left: -75%;
		}

		:global(.user-win) {
			--winner-bg-translate-top: 3.1rem;
			--winner-bg-translate-left: -60%;
		}

		:global(.computer-win) {
			--winner-bg-translate-top: 3.1rem;
			--winner-bg-translate-left: 60%;
		}

		.winner-bg {
			width: calc(var(--item-width) * 4);
			height: calc(var(--item-width) * 4.3);
		}
	}
</style>
