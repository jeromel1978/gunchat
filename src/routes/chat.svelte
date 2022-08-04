<script lang="ts">
	import GUN from 'gun/gun.js';
	import SEA from 'gun/sea.js';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { gun, user, SendMessage, messages, key, match } from '$lib/gun';
	import type { Message } from '$lib/gun';
	import MessageTemplate from '$lib/message.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let Inbound: HTMLDivElement;
	let SendButton: HTMLButtonElement;
	let Scrolled = true;
	let NewMessageText = 'New Message';
	let NewMessageIndicator = NewMessageText;
	let Message = '';
	const ScrollCheckInterval = 2000;
	let items: Message[] = [];

	onMount(async () => {
		// console.log(alias);
		// console.log($gun);
		// console.log($user);
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
		// SendButton.focus();
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
		if (!Scrolled) {
			setTimeout(ScrollToBottom, 100);
		} else {
			NewMessageIndicator = NewMessageText;
		}
	};

	export const GetInitialMessages = () => {
		// console.log(g.get('chat').map(match));
		$gun.get('chat').map(match).once(GetMessage);
		// ScrollToBottom();
		// setInterval(ScrollToBottom, ScrollCheckInterval);
	};

	const CheckInput = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && Message) Send();
	};
	const ScrollToBottom = () => {
		// if (Scrolled) return;
		console.log('Scrolling to Bottom');
		Inbound.scrollTop = Inbound?.scrollHeight ?? Inbound?.scrollTop ?? 0;
		NewMessageIndicator = '';
		Scrolled = false;
		// Scrolled = true;
	};
	let maxScroll = 0;
	const ManualScroll = () => {
		// clearInterval(timer);
		// timer = setInterval(ScrollToBottom, ScrollCheckInterval);
		if (Inbound?.scrollTop > maxScroll) {
			maxScroll = Inbound?.scrollTop;
			Scrolled = false;
		} else {
			Scrolled = true;
		}
		// console.log(maxScroll, Inbound?.scrollTop);
	};
	$: Hidden = NewMessageIndicator ? '' : 'hidden';
</script>

{#if $user.is}
	<div class="container">
		<div class="inbound" bind:this={Inbound} on:scroll={ManualScroll}>
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
		<div class="messagebar">
			<input type="text" class="message" bind:value={Message} on:keypress={CheckInput} />
			<button on:click={Send} bind:this={SendButton} title="Send"
				><span class="material-icons"> send </span></button
			>
		</div>
	</div>
{/if}

<style>
	.newbar {
		user-select: none;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		cursor: pointer;
		background: linear-gradient(
			180deg,
			rgba(128, 128, 128, 0) 0%,
			rgba(128, 128, 128, 0) 20%,
			rgba(128, 128, 128, 0.2) 60%,
			rgba(128, 128, 128, 0.5) 100%
		);
	}
	.hidden {
		height: 0;
	}
	.container {
		/* display: flex; */
		height: 100%;
		/* width: 100%; */
		display: grid;
		grid-template-rows: 1fr auto auto;
		/* height: minmax(1rem, 50%) !important; */
		/* width: 100%; */
		/* max-height: 100% !important;
		overflow: hidden; */
		box-sizing: border-box;
	}
	.messagebar {
		display: grid;
		grid-template-columns: 1fr auto;
		/* width: 100%; */
		box-sizing: border-box;
	}
	.inbound {
		display: flex;
		flex-direction: column;
		/* width: 100%;
		height: 100%; */
		gap: var(--size-fluid-1);
		margin-left: var(--size-fluid-1);
		margin-right: var(--size-fluid-1);
		/* width: 100%; */
		/* max-height: 100%; */
		overflow-y: auto;
		/* max-width: 100%; */
		/* box-sizing: border-box; */
		scroll-behavior: smooth;
	}
</style>
