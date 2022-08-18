import { gun, user, SendMessage, messages, key, match } from '$lib/gun';
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	// const items = await db.list();
	const items = undefined;

	return { items };
}
/** @type {import('./$types').Action} */
export async function POST({ request }) {
	const [errors, item] = await db.create(request);
	user.put('note');
	if (errors) {
		// return validation errors
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
		return {
			status: 400,
			body: { errors }
		};
	}

	// redirect to the newly created item
	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
	return {
		status: 303,
		headers: {
			location: `/items/${item.id}`
		}
	};
}
