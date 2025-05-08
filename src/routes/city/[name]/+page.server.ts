import type { PageServerLoad } from './$types';
import { OWM_KEY } from '$env/static/private';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const city = params.name;

  const geocodeRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OWM_KEY}`);
  if (!geocodeRes.ok) return { forecast: null, city };

  const { coord } = await geocodeRes.json();

  const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${OWM_KEY}`);
  if (!res.ok) return { forecast: null, city };

  const forecast = await res.json();
  return { forecast, city };
};
