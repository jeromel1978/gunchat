<script lang="ts">
	import '../app.css';
	import { user, gun } from '$lib/gun';
	import { goto } from '$app/navigation';
	import Header from '$lib/components/header.svelte';
	import Menu from '$lib/components/menu.svelte';
</script>

<div class="main">
	<Header />
	{#if $user.is}<Menu />{/if}
	<slot />
</div>

<style>
	.main {
		@apply h-full grid;
		grid-template-rows: auto auto 1fr;
	}
</style>
