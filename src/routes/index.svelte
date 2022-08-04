<script lang="ts">
	import { user } from '$lib/gun';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	onMount(async () => {
		if (!$user.is) goto('/login');
	});
</script>
