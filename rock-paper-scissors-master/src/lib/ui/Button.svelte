<button
	class="w-32 h-10 place-self-center border rounded-lg font-semibold tracking-[2.5px] uppercase hover:bg-white hover:text-[var(--dark-text)]"
	{...$$restProps}
	on:click
	on:change
	on:keydown
	on:keyup
	on:touchstart|passive
	on:touchend
	on:touchcancel
	on:mouseenter
	on:mouseleave
>
	<slot />
</button>
