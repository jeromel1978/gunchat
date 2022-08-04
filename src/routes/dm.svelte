<script language="ts">
	import { gun, user, SendMessage, messages, key, match } from '$lib/gun';
	$: listing = $user.get('chat');
	const Check = () => {
		$gun.get('~@ScarlettJohansson').once((data, key) => {
			console.log(data, key);
		});
		console.log(listing);
	};
</script>

DM's
<button on:click={Check}>Check</button>
