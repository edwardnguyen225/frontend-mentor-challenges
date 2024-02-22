<script lang="ts">
	import { gamePlayType, playerScore } from '$lib/store';

	let isNormalMode: boolean;
	gamePlayType.subscribe((value) => {
		isNormalMode = value === 'normal';
	});

	$: logoSrc = isNormalMode ? '/images/logo.svg' : '/images/logo-bonus.svg';
</script>

<header class="header-wrapper">
	<div class="header-container">
		{#if logoSrc}
			<img src={logoSrc} alt="Game" class="ml-3 max-h-12 md:max-h-24" />
		{/if}
		<div class="header-container__score">
			<p class="header-container__score__title">Score</p>
			<div class="header-container__score__value">{$playerScore}</div>
		</div>
	</div>
</header>

<style>
	.header-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.header-container {
		width: 100%;
		max-width: 700px;

		margin: 32px;
		padding: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 1px solid var(--header-outline);

		/* TODO: Fix radius to match design */
		border-radius: 2px;
	}

	.header-container__score {
		min-width: 80px;
		height: 72px;
		background-color: white;
		border-radius: 4px;
		text-align: center;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.header-container__score__title {
		width: 100%;
		text-align: center;
		margin: 0;
		font-size: 8px;
		text-transform: uppercase;
		line-height: auto;
		font-weight: 600;
		letter-spacing: 1.56px;
		color: var(--score-text);
	}

	.header-container__score__value {
		margin: 0;
		width: 100%;
		font-size: 40px;
		text-transform: uppercase;
		line-height: 40px;
		font-weight: 700;
		letter-spacing: 0;
		color: #565468;
	}

	@media (min-width: 1366px) {
		.header-container {
			margin: 0;
			margin-top: 48px;
			padding: 18px 24px;
		}

		.header-container__score {
			min-width: 150px;
			height: 114px;
			border-radius: 8px;
		}

		.header-container__score__title {
			font-size: 16px;
			line-height: 16px;
			letter-spacing: 3.12px;
		}

		.header-container__score__value {
			font-size: 80px;
			line-height: 80px;
		}
	}
</style>
