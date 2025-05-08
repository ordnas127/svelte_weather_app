import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies, locals }) => {
	const formData = await request.formData();
	const cityToRemove = formData.get('city')?.toString();

	const username = locals.session?.user;
	if (!username || !cityToRemove) {
		return new Response('Unauthorized or invalid data', { status: 400 });
	}

	const cookieKey = `myCities_${username}`;
	const existing = cookies.get(cookieKey);
	let cities: string[] = [];

	if (existing) {
		try {
			cities = JSON.parse(existing);
		} catch {
			cities = [];
		}
	}

	const updated = cities.filter((city) => city.toLowerCase() !== cityToRemove.toLowerCase());

	cookies.set(cookieKey, JSON.stringify(updated), {
		path: '/',
		httpOnly: false,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 30
	});

	return new Response(null, {
		status: 303,
		headers: {
			location: '/'
		}
	});
};
