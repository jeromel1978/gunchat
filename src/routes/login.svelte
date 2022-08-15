<script lang="ts">
	import { gun, user } from '$lib/gun';
	import { navigating, page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	interface AuthResultGood {
		ok: number;
		pub: string;
	}
	interface AuthResultBad {
		err: string;
	}
	let alias: string;
	let pass: string;
	const Login = () => {
		$user.auth(alias, pass, (res: any) => {
			if (res.err) return (error = res.err);
			goto('/chat');
		});
	};
	const Create = () => {
		goto('/newuser');
		// $user.create(alias, pass, (res: any) => {
		// 	if (res.err) return (error = res.err);
		// });
	};
	onMount(async () => {
		if ($user.is) goto('/chat');
	});
	let error = '';
</script>

<div class="flex flex-col items-center justify-center gap-3">
	<!-- <div class="login"> -->
	<div class="inputs gap-3">
		<label for="username">User ID</label>
		<input id="username" type="text" class="" bind:value={alias} />
		<label for="password">Password</label>
		<input id="password" type="password" class="" bind:value={pass} />
	</div>
	<button on:click|preventDefault={Login} type="submit"
		>Login<span class="material-icons">login</span></button
	>
	<button on:click={Create}>Create</button>
	<div class="error">{error}</div>
	<!-- </div> -->
</div>

<style>
	.inputs {
		display: grid !important;
		grid-template-columns: auto auto;
	}
</style>
