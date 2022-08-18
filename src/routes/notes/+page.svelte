<script lang="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import GUN from 'gun/gun.js';
	import SEA from 'gun/sea.js';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { gun, user, SendMessage, messages, key, match } from '$lib/gun';
	import type { Message } from '$lib/gun';
	import NoteTemplate from '$lib/note.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	let Message = '';

	interface NoteType {
		id: string;
		author: string;
		title: string;
		content: string;
		created: number;
		updated: number;
	}
	onMount(async () => {
		// console.log(alias);
		// console.log($gun);
		// console.log($user);
		if (!$user.is) goto('/login');
		GetInitialMessages();
	});
	let items: NoteType[] = [];

	messages.subscribe((message) => {
		console.log(message);
	});
	const Send = async () => {
		SendMessage(Message);
	};

	const GetNote = async (data: any, id: any) => {
		let message: NoteType | undefined = undefined;
		if (data) {
			message = {
				id: id,
				author: `${await $gun.user(data).get('alias')}`,
				title: data.title,
				content: data.content,
				created: data.created,
				updated: data.updated
			};
		}
		if (message?.title) {
			items = [...items.slice(-100), message].sort((a, b) => a.created - b.created);
		}
		// messages = readable(m as Message[]);
	};

	export const GetInitialMessages = () => {
		// console.log(g.get('chat').map(match));
		$user.get('notes').map().once(GetNote);
	};
	const Test = async () => {
		// console.log($user);
		// const secret = await SEA.encrypt(Message, $user.epriv);
		// const message = $user.get('all').set({ what: secret });
		const index = new Date().toISOString();
		// const i = new Date().getTime();
		// CurrentRoom.get(index).put(message);
		$user.get('notes').get(index).put({
			author: 'Jerome',
			title: 'Test Note',
			content:
				'Aliqua cupidatat amet qui culpa consectetur ea quis occaecat ex sint nostrud fugiat. Laboris adipisicing minim id velit pariatur officia et mollit non est ipsum. Do elit magna sit commodo ullamco irure est ea ad exercitation commodo nostrud irure. Est laborum mollit consequat laboris irure aliqua veniam labore ipsum nisi. Laboris cillum velit est dolore amet et exercitation aute velit eiusmod et officia.',
			created: index,
			updated: index
		});
	};
</script>

{#if $user.is}
	<div class="container">
		<div class="inbound">
			<VirtualList {items} let:item>
				<NoteTemplate {...item} />
			</VirtualList>
		</div>
	</div>
{/if}

<style>
	.container {
		height: 100%;
		width: 100%;
	}
	/* .messagebar {
		display: grid;
		grid-template-columns: 1fr auto;
		width: 100%;
	} */
	.inbound {
		height: 100%;
		width: 100vw;
	}
</style>
