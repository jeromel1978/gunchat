<script lang="ts">
	// import './styles/tailwind-output.css';
	export let name: string;
	// import 'open-props';
	// import { page } from '$app/stores'
	// const email = $page.url.searchParams('email')
</script>

<main class="w-full h-full bg-white dark:bg-black">
	<h1>Hello {name}!</h1>
	<p>
		Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte
		apps.
	</p>
</main>

<!-- <style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style> -->
<!-- <style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style> -->
