<script lang="ts">
	import { gun, user } from '$lib/gun';
	export let id: string;
	export let author: string;
	export let title: string;
	export let content: string;
	export let created: number;
	export let updated: number;

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
	const UpdatePost = () => {
		$user.get('notes').get(id).put({
			author: author,
			title: title,
			content: content,
			created: created,
			updated: new Date().toISOString()
		});
	};
	const DeletePost = () => {
		$user.get('notes').get(id).put(null);
	};
	const ShowHide = () => {
		TAContent.style.height = TAContent.style.height.length === 0 ? '0px' : TAContent?.style?.height;
		if (TAContent?.style?.height === '0px') {
			TAContent.style.height = `${TAContent.scrollHeight}px`;
			// TAContent.style.height = 'min-content';
			TAContent.style.opacity = '1';
			// TAContent.style.padding = ``;
		} else {
			TAContent.style.height = '0px';
			TAContent.style.opacity = '0';
			// TAContent.style.padding = `0px`;
		}
	};
	const Resize = () => {
		TAContent.style.height = `${TAContent.scrollHeight}px`;
		UpdatePost();
	};
	let TAContent: HTMLTextAreaElement;
</script>

<div class="note">
	<div class="title">
		<input type="text" bind:value={title} on:input={UpdatePost} placeholder="Title" />
		<button on:click={DeletePost}>Delete</button>
	</div>
	<div class="meta">
		<div><button on:click={ShowHide}>Show/Hide</button></div>
		<div class="author">{author}</div>
		<div class="created">{created}</div>
		<div class="updated">{updated}</div>
	</div>
	<div class="content">
		<textarea bind:value={content} bind:this={TAContent} on:input={Resize} placeholder="Content" />
	</div>
</div>

<style>
	/* .hide {
		display: none;
	} */
	.note {
		display: grid;
		grid-template-rows: auto auto 1fr;
	}
	.meta {
		display: flex;
		flex-direction: row;
	}
	.content {
		width: 100%;
	}
	.content textarea {
		box-sizing: border-box;
		width: 100%;
		/* height: 7rem; */
		height: 0px;
		opacity: 0;
		transition: all 0.5s ease-in-out;
	}
	/* .message {
		display: flex;
		gap: 0.5rem;
	}
	.whoicon {
		display: flex;
		align-items: center;
	}
	.whoicon > img {
		height: 2rem;
		width: 2rem;
		border-radius: 50%;
	}
	.inbound {
		flex-direction: row;
	}
	.outbound {
		flex-direction: row-reverse;
	}
	.who {
		font-size: 0.75rem;
	}
	.what {
		padding: 0.5rem;
		background-color: hsla(0, 0%, 50%, 0.5);
	}
	.inbound .who,
	.inbound .what {
		display: flex;
		justify-content: left;
	}
	.inbound .what {
		border-radius: 0.5rem 0.5rem 0.5rem 0;
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
	} */
</style>
