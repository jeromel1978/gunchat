<script lang="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import GUN from 'gun/gun.js';
	import SEA from 'gun/sea.js';
	import { gun, user, SendMessage, messages, key, match } from '$lib/gun';
	import type { Message } from '$lib/gun';
	import MessageTemplate from '$lib/message.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let Inbound: HTMLDivElement;
	let SendButton: HTMLButtonElement;
	let NewMessageText = 'New Message';
	let NewMessageIndicator = NewMessageText;
	let Message = '';
	const ScrollCheckInterval = 2000;
	let items: Message[] = [];

	onMount(async () => {
		if (!$user.is) goto('/login');
		GetInitialMessages();
	});

	messages.subscribe((message) => {
		console.log(message);
	});
	const ReadMessages = async () => {
		items = [...$messages];
	};
	const Send = async () => {
		SendMessage(Message);
		Message = '';
	};

	const GetMessage = async (data: any, id: any) => {
		let message: Message | undefined = undefined;
		const state: any = GUN.state;
		if (data) {
			message = {
				who: `${await $gun.user(data).get('alias')}`,
				what: `${await SEA.decrypt(data.what, key)}`,
				when: state.is(data, 'what')
			};
		}
		if (message?.what) {
			items = [...items.slice(-100), message].sort((a, b) => a.when - b.when);
		}
		if (!Inbound) return;
		console.debug(Inbound?.scrollTop, maxScroll, AutoScroll);
		if (AutoScroll) {
			setTimeout(ScrollToBottom, 500);
		} else {
			NewMessageIndicator = NewMessageText;
		}
	};

	export const GetInitialMessages = () => {
		$gun.get('chat').map(match).once(GetMessage);
	};

	const CheckInput = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && Message) Send();
	};
	const ScrollToBottom = () => {
		// console.log('Scrolling to Bottom');
		// if (!AutoScroll) return;
		// Inbound.scrollTop = Inbound?.scrollHeight ?? Inbound?.scrollTop ?? 0;
		Inbound.scrollTop = Inbound?.scrollHeight;
		NewMessageIndicator = '';
		AutoScroll = true;
	};
	let maxScroll = 0;
	const ScrollHandler = () => {
		if (Inbound?.scrollTop === maxScroll) {
			AutoScroll = true;
			maxScroll = 0;
		} else {
			maxScroll = Inbound?.scrollTop > maxScroll ? Inbound?.scrollTop : maxScroll;
			AutoScroll = Inbound?.scrollTop >= maxScroll;
		}
	};
	// $: AutoScroll = Inbound?.scrollTop >= maxScroll;
	let AutoScroll: boolean = true;
	$: Hidden = NewMessageIndicator || !AutoScroll ? '' : 'hidden';
</script>

{#if $user.is}
	<div class="chatcontainer">
		<div class="inbound" bind:this={Inbound} on:scroll={ScrollHandler}>
			{#each items as item}
				<MessageTemplate {...item} />
			{/each}
		</div>
		<div class="newbar {Hidden}" on:click={ScrollToBottom}>
			<div />
			<div>
				{NewMessageIndicator}
			</div>
			<div>
				<span class="material-icons"> keyboard_double_arrow_down </span>
			</div>
		</div>
		<!-- <form method="post"> -->
		<div class="messagebar">
			<input
				id="message"
				name="message"
				type="text"
				class="message"
				bind:value={Message}
				on:keypress={CheckInput}
			/>
			<button on:click={Send} bind:this={SendButton} title="Send"
				><span class="material-icons"> send </span></button
			>
		</div>
	</div>
{/if}

<style>
	.newbar {
		@apply flex flex-row select-none justify-between cursor-pointer;
		/* grid-template-columns: 1fr auto; */
		background: linear-gradient(
			180deg,
			rgba(128, 128, 128, 0) 0%,
			rgba(128, 128, 128, 0) 20%,
			rgba(128, 128, 128, 0.2) 60%,
			rgba(128, 128, 128, 0.5) 100%
		);
	}
	.hidden {
		@apply h-0;
	}
	.chatcontainer {
		@apply grid box-border overflow-hidden;
		grid-template-rows: 1fr auto auto;
	}
	.messagebar {
		@apply grid box-border;
		grid-template-columns: 1fr auto;
	}
	.inbound {
		@apply flex flex-col gap-2 mx-2 overflow-y-auto scroll-smooth;
	}
</style>
