import GUN from 'gun/gun.js';
import SEA from 'gun/sea.js';
import type { IGunInstance, IGunUserInstance, IGunChain, GunCallbackMap } from 'gun';
import { readable, writable } from 'svelte/store';

export interface Message {
	who: string;
	what: string;
	when: number;
}

export const key = '2b0e5dfc-0b19-42fc-8b95-9f06db5d8195';
// const key = '#foo';
// const HostName = '192.68.1.4';
const HostName = '192.168.1.106';
const Port = 8765;
// const g = GUN([
// 	`http://localhost:${Port}/gun`,
// 	'https://gun-manhattan.herokuapp.com/gun'
// ]) as IGunInstance;
const g = GUN([`http://${HostName}:${Port}/gun`]) as IGunInstance;
const u: any = g.user().recall({ sessionStorage: true });
export let m: Message[] = [];
let ur: boolean = true;
let CurrentRoom: IGunChain<any, IGunInstance<any>, IGunInstance<any>, 'chat'> = g.get('chat');

export const match: any = {
	'.': {
		'>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString()
	},
	'-': 1
};

const GetMessage = async (data: any, id: any) => {
	let message: Message | undefined = undefined;
	if (data) {
		const state: any = GUN.state;
		message = {
			who: `${g.user(data).get('alias')}`,
			what: `${SEA.decrypt(data.what, key)}`,
			when: state.is(data, 'what')
		};
	}
	if (message?.what) {
		const m2 = [...m.slice(-100), message].sort((a, b) => a.when - b.when);
		m = [...m2];
	}
	// messages = readable(m as Message[]);
};

export const GetInitialMessages = () => {
	CurrentRoom.map(match).on(GetMessage);
};

export const SendMessage = async (Message: string, Key: string = key) => {
	const secret = await SEA.encrypt(Message, Key);
	const message = u.get('all').set({ what: secret });
	const index = new Date().toISOString();
	CurrentRoom.get(index).put(message);
};

if (u?.is) {
	const user: any = g.user(u.is.pub);
	user.on((x: any) => (u.is.alias = x.alias));
}

// GetInitialMessages();
export const gun = readable(g);
export const user = writable(u);
export const pub = writable(undefined);
export let messages = writable(m as Message[]);
export const unread = writable(ur);
