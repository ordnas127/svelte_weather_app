import type { PageServerLoad } from './$types';
import type { WeatherData } from '$lib/types/weather';

const defaultCities = ['Los Angeles', 'New York', 'Berlin', 'London', 'Dubai', 'Tokyo'];

export const load: PageServerLoad = async ({ fetch, cookies, locals }) => {
	const session = locals.session;
	const username = session?.user;

	// Load default cities
	const fixedCities = await Promise.all(
		defaultCities.map(async (city) => {
			const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
			if (!res.ok) return { city, weather: null };
			const weather: WeatherData = await res.json();
			return { city, weather };
		})
	);

	// Load user-saved cities from cookie (e.g., myCities_admin)
	let savedCities: string[] = [];
	if (username) {
		const cookieKey = `myCities_${username}`;
		const cookieValue = cookies.get(cookieKey);
		if (cookieValue) {
			try {
				savedCities = JSON.parse(cookieValue);
			} catch {
				savedCities = [];
			}
		}
	}

	const myCities = await Promise.all(
		savedCities.map(async (city) => {
			const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
			if (!res.ok) return { city, weather: null };
			const weather: WeatherData = await res.json();
			return { city, weather };
		})
	);

	return {
		fixedCities,
		myCities,
		username
	};
};
