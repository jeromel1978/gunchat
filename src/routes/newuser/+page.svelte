<script lang="ts">
	import { gun, user, pub } from '$lib/gun';
	import { navigating, page } from '$app/stores';
	import { goto } from '$app/navigation';
	interface AuthResultGood {
		ok: number;
		pub: string;
	}
	interface AuthResultBad {
		err: string;
	}
	let alias: string;
	let pass: string;
	let pass2: string;
	const Login = () => {
		$user.auth(alias, pass, (res: any) => {
			if (res.err) return (error = res.err);
			$pub = res.pub;
			goto('/chat');
		});
	};
	const Create = () => {
		if (pass !== pass2) return (error = 'Passwords MUST Match');
		$user.create(alias, pass, (res: any) => {
			if (res.err) return (error = res.err);
			Login();
		});
	};
	const Cancel = () => {
		goto('/login');
	};
	let error = '';
</script>

<div class="container">
	<div class="login">
		<div class="inputs">
			<div class="label">User ID</div>
			<div class="input"><input type="text" class="" bind:value={alias} /></div>
			<div class="label">New Password</div>
			<div class="input"><input type="password" class="" bind:value={pass} /></div>
			<div class="label">Repeat Password</div>
			<div class="input"><input type="password" class="" bind:value={pass2} /></div>
		</div>
		<button on:click={Create}>Create</button>
		<button on:click={Cancel}>Cancel</button>
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
