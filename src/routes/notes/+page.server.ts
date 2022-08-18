import { gun, user, SendMessage, messages, key, match } from '$lib/gun';
/** @type {import('./__types/notes').RequestHandler} */
export async function GET() {
	// const items = await db.list();
	const items = undefined;

	return {
		body: { items }
	};
}
/** @type {import('./__types/notes').RequestHandler} */
export async function POST({ request }) {
	const [errors, item] = await db.create(request);
	user.put('note');
	if (errors) {
		// return validation errors
		return {
			status: 400,
			body: { errors }
		};
	}

	// redirect to the newly created item
	return {
		status: 303,
		headers: {
			location: `/items/${item.id}`
		}
	};
}
