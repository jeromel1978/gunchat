<script language="ts">
	import { user, gun } from '$lib/gun';
	import { goto } from '$app/navigation';
	const Logout = () => {
		$user.leave();
		goto('/login');
	};
	const ClearDB = async () => {
		$gun.get('chat').put(null);
		localStorage.clear();
		console.log($gun.get('chat'));
	};
</script>

<div class="flex justify-left w-full gap-2">
	<a href="/settings/profile"
		><button
			class="px-3 py-1 text-white text-base bg-red-500 rounded-md border-none hover:bg-red-400"
			>{$user.is.alias}</button
		></a
	>
	<a href="/chat"
		><button
			class="px-3 py-1 text-white text-base bg-red-500 rounded-md border-none hover:bg-red-400"
			>Chat</button
		></a
	>
	<a href="/dm"
		><button
			class="px-3 py-1 text-white text-base bg-red-500 rounded-md border-none hover:bg-red-400"
			>DM</button
		></a
	>
	<a href="/notes"
		><button
			class="px-3 py-1 text-white text-base bg-red-500 rounded-md border-none hover:bg-red-400"
			>Notes</button
		></a
	>
	<button
		on:click={ClearDB}
		class="px-3 py-1 text-white text-base bg-red-500 rounded-md border-none hover:bg-red-400"
		>Clear</button
	>
	<button
		on:click={Logout}
		class="px-3 py-1 text-white text-base bg-red-500 rounded-md border-none hover:bg-red-400 "
		><span class="material-icons" title="Log Out">logout</span></button
	>
</div>

<style>
</style>
