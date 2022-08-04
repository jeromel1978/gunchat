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

<div class="container">
	<div class="login">
		<div class="inputs">
			<div class="label">User ID</div>
			<div class="input"><input type="text" class="" bind:value={alias} /></div>
			<div class="label">Password</div>
			<div class="input"><input type="password" class="" bind:value={pass} /></div>
		</div>
		<button on:click={Login}>Login<span class="material-icons">login</span></button>
		<button on:click={Create}>Create</button>
		<div class="error">{error}</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.inputs {
		display: grid !important;
		grid-template-columns: auto auto;
	}
	.login {
		width: fit-content;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
