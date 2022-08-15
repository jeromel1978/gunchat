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
		@apply cursor-pointer select-none;
	}
	.details {
		@apply flex flex-col;
	}
	.outbound .details {
		@apply items-end;
	}
	.message {
		@apply flex gap-2;
	}
	.whoicon {
		@apply flex items-end;
	}
	.whoicon > img {
		@apply h-14 w-14 aspect-square rounded-full;
	}
	.inbound {
		@apply flex-row;
	}
	.outbound {
		@apply flex-row-reverse;
	}
	.who {
		@apply text-xs text-red-500 gap-1;
	}
	.what {
		@apply px-3 py-1 bg-slate-300 w-fit text-black;
	}
	.inbound .who,
	.inbound .what {
		@apply flex justify-start;
	}
	.inbound .what {
		@apply rounded-r-full rounded-b-full;
	}
	.outbound {
		@apply flex-row-reverse;
	}
	.outbound .who,
	.outbound .what {
		@apply flex justify-end;
	}
	.outbound .what {
		@apply rounded-l-full rounded-b-full;
	}
</style>
