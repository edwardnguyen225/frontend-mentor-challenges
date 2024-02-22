<script>
	import Header from '../components/Header.svelte';
	import Board from '../components/Board.svelte';
	import RulesButton from '../components/RulesButton.svelte';
	import Footer from '../components/Footer.svelte';
	import Rules from '../components/Rules.svelte';
	import ModeButton from '../components/ModeButton.svelte';
</script>

<Rules />
<Header />
<main class="flex flex-col flex-1 justify-between pb-14 pt-11 xl:pt-16">
	<div class="min-h-[473px] flex flex-col flex-1 justify-center items-center">
		<Board />
	</div>
	<div class="mt-8 xl:mt-0 px-8 w-full flex justify-center">
		<div class="w-full max-w-[1366px] flex justify-center gap-6 sm:gap-8 md:justify-between">
			<ModeButton />
			<RulesButton />
		</div>
	</div>
</main>
<Footer />
