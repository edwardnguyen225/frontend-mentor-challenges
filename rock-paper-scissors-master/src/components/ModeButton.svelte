<script lang="ts">
	import { onDestroy } from 'svelte';
	import { gamePlayType, setGamePlayType } from '$lib/store';
	import { Button } from '$lib/ui';

	let isNormalGame: boolean;
	const unsubscribe = gamePlayType.subscribe((value) => {
		isNormalGame = value === 'normal';
	});
	onDestroy(unsubscribe);
</script>

<Button on:click={() => setGamePlayType(isNormalGame ? 'advanced' : 'normal')}>
	{isNormalGame ? 'Go Advanced' : 'Go Normal'}
</Button>
