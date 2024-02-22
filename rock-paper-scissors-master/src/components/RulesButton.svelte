<script>
	import { Button } from '$lib/ui';
	import { rulesOverlay } from '$lib/store';
</script>

<Button on:click={rulesOverlay.open}>Rules</Button>
