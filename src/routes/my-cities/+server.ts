import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies, locals }) => {
	const formData = await request.formData();
	const newCity = formData.get('city')?.toString().trim();

	const username = locals.session?.user;
	if (!username || !newCity) {
		return new Response('Unauthorized or missing city', { status: 400 });
	}

	const cookieKey = `myCities_${username}`;
	let cityList: string[] = [];

	const existing = cookies.get(cookieKey);
	if (existing) {
		try {
			cityList = JSON.parse(existing);
		} catch {
			cityList = [];
		}
	}

	if (!cityList.includes(newCity)) {
		cityList.push(newCity);
	}

	cookies.set(cookieKey, JSON.stringify(cityList), {
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
