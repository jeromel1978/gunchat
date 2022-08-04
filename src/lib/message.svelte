<script lang="ts">
	import { gun, user } from '$lib/gun';
	export let who: string;
	export let what: string;
	export let when: number;

	$: io = $user?.is?.alias !== who ? 'inbound' : 'outbound';

	const SameDay = (first: Date, second: Date) =>
		first.getFullYear() === second.getFullYear() &&
		first.getMonth() === second.getMonth() &&
		first.getDate() === second.getDate();

	const FormatDate = (ISODate: number) => {
		const d0: Date = new Date();
		const d1: Date = new Date(ISODate);
		if (SameDay(d0, d1)) return d1.toLocaleTimeString();
		return d1.toLocaleDateString();
	};
	const AddDM = (data: any, key: string) => {
		console.log(data);
		data.get('chat').once(console.log);
	};
	const NameClicked = () => {
		let u = $gun.get(`~@${who}`).once((data, key) => {
			// console.log($user);
			// console.log(data, key);
			// data.get(key).put('Test');
			let pub = Object.keys(data)[1];
			pub = pub.substring(1, pub.length);
			const user: any = $gun.user(pub);
			user.once(AddDM);
		});
		console.log(u);
	};
	$: ShortTime = FormatDate(when);
</script>

<div class="message {io}">
	<div class="whoicon">
		<img src="https://avatars.dicebear.com/api/initials/{who}.svg" alt={who} />
	</div>
	<div class="details">
		<div class="who">
			<div on:click={NameClicked}>{who}</div>
			<div>{ShortTime}</div>
		</div>
		<div class="what">{what}</div>
	</div>
</div>

<style>
	.whoicon,
	.who {
		cursor: pointer;
		user-select: none;
	}
	.details {
		display: flex;
		flex-direction: column;
	}
	.outbound .details {
		align-items: flex-end;
	}
	.message {
		display: flex;
		gap: 0.5rem;
	}
	.whoicon {
		display: flex;
		align-items: end;
	}
	.whoicon > img {
		height: var(--size-fluid-4);
		width: var(--size-fluid-4);
		aspect-ratio: 1;
		border-radius: 50%;
	}
	.inbound {
		flex-direction: row;
	}
	.outbound {
		flex-direction: row-reverse;
	}
	.who {
		font-size: var(--font-size-fluid-0);
		color: var(--brand1);
		gap: var(--size-1);
	}
	.what {
		padding: 0.5rem;
		background-color: hsla(0, 0%, 50%, 0.5);
		width: fit-content;
		color: var(--text1);
	}
	.inbound .who,
	.inbound .what {
		display: flex;
		justify-content: left;
	}
	.inbound .what {
		border-radius: 0 0.5rem 0.5rem 0.5rem;
	}
	.outbound {
		flex-direction: row-reverse;
	}
	.outbound .who,
	.outbound .what {
		display: flex;
		justify-content: right;
	}
	.outbound .what {
		border-radius: 0.5rem 0 0.5rem 0.5rem;
	}
</style>
