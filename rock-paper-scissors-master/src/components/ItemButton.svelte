<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import type { Item } from '$lib/store/type';

	export let item: Item | null;
	export let selectedItem: Item | null;
	export let shouldShowPlaceholder: boolean;
	export let isComputer: boolean;

	export let onPlayerInput: (item: Item) => void;

	$: isSelected = !!selectedItem && selectedItem.name === item?.name && !isComputer;
	$: shouldShow = isSelected || !selectedItem || isComputer;
</script>

{#if shouldShow && item}
	<button
		disabled={!!selectedItem}
		in:fade={{ duration: 200, delay: 300 }}
		out:fade={{ duration: 200 }}
		class="btn btn-{item.name}"
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
	.btn {
		position: absolute;
		width: 30%;
		height: 30%;
		min-width: 130px;
		min-height: 130px;
		max-width: 200px;
		max-height: 200px;

		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
		border-width: 1em;

		transition:
			transform 0.5s ease-in-out,
			scale 0.5s ease-in-out;

		--translate-top: -58%;
		--translate-left: -70%;
		--translate-bottom: 58%;

		&.btn-rock {
			transform: translate(0, var(--translate-bottom));
		}

		&.btn-paper {
			transform: translate(var(--translate-left), var(--translate-top));
		}

		&.btn-scissors {
			transform: translate(calc(-1 * var(--translate-left)), var(--translate-top));
		}
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

	:not(.has-clicked) .btn:hover::after {
		--btn-hover-width: 160%;
		content: '';
		position: absolute;
		width: var(--btn-hover-width);
		height: var(--btn-hover-width);
		border-radius: 50%;
		background: white;
		opacity: 0.1;
		z-index: -100;
	}

	.btn.is-computer {
		transform: translate(calc(-1 * var(--translate-left)), var(--translate-top));
	}

	@media (min-width: 433px) {
		.btn {
			width: 198px;
			height: 203px;
			border-width: 1.5em;
		}

		.btn.is-computer {
			scale: 1.1;
			--translate-left: -80%;
		}
	}

	.btn.is-selected {
		scale: 1.1;
		transform: translate(calc(var(--translate-left) + 0.5em), var(--translate-top));
	}

	.selected-text {
		width: 133px;
		text-align: center;

		position: absolute;

		left: 0;
		margin-top: 5rem;

		font-size: 15px;
		font-weight: 700;
		line-height: 32px;
		letter-spacing: 1.88px;
		text-transform: uppercase;

		@media (min-width: 433px) {
			width: 198px;
		}

		&.is-computer {
			width: fit-content;
			position: absolute;
			right: -10px;
			left: auto;
		}
	}

	.btn-placeholder {
		position: absolute;
		width: 30%;
		height: 30%;
		min-width: 130px;
		min-height: 130px;
		max-width: 200px;
		max-height: 200px;

		border-radius: 100%;

		background-color: black;
		opacity: 0.1;
	}

	.btn-placeholder.is-computer {
		--translate-top: -58%;
		--translate-left: -70%;
		transform: translate(calc(-1 * var(--translate-left)), var(--translate-top));

		@media (min-width: 433px) {
			--translate-left: -87.5%;
			width: 198px;
			height: 203px;
		}
	}
</style>
