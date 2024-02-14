<script>
	import Header from '../components/Header.svelte';
	import Board from '../components/Board.svelte';
	import RulesButton from '../components/RulesButton.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<Header />
<main class="flex flex-col flex-1 justify-between pb-14">
	<div class="flex flex-1 justify-center items-center">
		<Board />
	</div>
	<RulesButton />
</main>
<Footer />
