<script lang="ts">
	import { user, gun } from '$lib/gun';
	import { goto } from '$app/navigation';
	const Logout = () => {
		$user.leave();
		goto('/login');
	};
	const ClearDB = async () => {
		// $gun.get('chat').map((data, index) => {
		// $gun.get('chat').get(index).put(null);
		// console.log(data);
		// data = null;
		// data.put(null);
		// });
		$gun.get('chat').put(null);
		localStorage.clear();
		console.log($gun.get('chat'));
	};
</script>

<div class="container">
	<div><h1>GunChat</h1></div>

	{#if $user.is}
		<div class="menu">
			<a href="/settings/profile">{$user.is.alias}</a>
			<a href="/chat">Chat</a>
			<a href="/dm">DM</a>
			<a href="/notes">Notes</a>
			<button on:click={ClearDB}>Clear</button>
			<button on:click={Logout}><span class="material-icons" title="Log Out">logout</span></button>
		</div>
	{/if}
	<div class="body">
		<slot />
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-rows: auto auto 1fr;
		height: 100vh;
		width: 100vw;
		max-height: 100vh;
		max-width: 100vw;
		/* overflow: hidden; */
	}
	.body {
		height: 100%;
		width: 100%;
		max-height: 100%;
		max-width: 100%;
		overflow: auto;
		/* box-sizing: border-box; */
	}
</style>
