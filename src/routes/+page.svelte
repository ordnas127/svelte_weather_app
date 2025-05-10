<script lang="ts">
	import WeatherCard from '$lib/components/WeatherCard.svelte';
	import type { WeatherData } from '$lib/types/weather';
	import { fade } from 'svelte/transition';
	import { tick } from 'svelte';

	export let data: {
		fixedCities: { city: string; weather: WeatherData | null }[];
		myCities: { city: string; weather: WeatherData | null }[];
		username: string | null;
	};

	let newCity = '';
	let visibleFixed = 0;
	let visibleSaved = 0;
	let showFixed = [];

	// Animated standard cities --> one by one -> WeatherCard dislikes in:fade directly applied
	async function animateFixed() {
		showFixed = Array(data.fixedCities.length).fill(false);
		for (let i = 0; i < data.fixedCities.length; i++) {
			showFixed[i] = true;
			await tick();
			await new Promise((r) => setTimeout(r, 150));
		}
	}

	let showSaved = [];

	async function animateSaved() {
		showSaved = Array(data.myCities.length).fill(false);
		for (let i = 0; i < data.myCities.length; i++) {
			showSaved[i] = true;
			await tick();
			await new Promise((r) => setTimeout(r, 150));
		}
	}

	$: data.fixedCities, animateFixed();
	$: data.myCities, data.username, data.username && animateSaved();
</script>

<h1 class="text-2xl font-bold mb-6">🌍 Global Weather</h1>

<div class="grid md:grid-cols-3 gap-6 mb-10">
	{#each data.fixedCities as cityData, i (cityData.city)}
		{#if showFixed[i] && cityData.weather}
			<div in:fade>
				<WeatherCard
					city={cityData.weather.name}
					temp={cityData.weather.main.temp}
					icon={cityData.weather.weather[0].icon}
				/>
			</div>
		{/if}
	{/each}
</div>

{#if data.username}
	<h2 class="text-xl font-semibold mb-4">📌 My Cities</h2>

	<form method="POST" action="/my-cities" class="mb-6 flex gap-2">
		<input
			name="city"
			bind:value={newCity}
			placeholder="Add a city..."
			class="flex-1 px-4 py-2 border rounded text-black bg-white"
			required
		/>
		<button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
			Add to watchlist
		</button>
	</form>

	<div class="grid md:grid-cols-3 gap-6">
		{#each data.myCities as cityData, i (cityData.city)}
			{#if showSaved[i] && cityData.weather}
				<div in:fade class="relative group transition duration-200 transform hover:scale-105">
					<form method="POST" action="/my-cities/remove" class="absolute top-2 right-2 z-10">
						<input type="hidden" name="city" value={cityData.city} class="text-black bg-white" />
						<button
							type="submit"
							title="Remove city"
							class="text-red-600 hover:text-red-800 bg-white dark:bg-gray-800 rounded-full p-1 shadow 
								transition duration-200 transform group-hover:scale-110"
						>
							🗑️
						</button>
					</form>

					<WeatherCard
						city={cityData.weather.name}
						temp={cityData.weather.main.temp}
						icon={cityData.weather.weather[0].icon}
					/>
				</div>
			{:else if showSaved[i]}
				<div class="p-4 bg-red-100 text-red-600 rounded shadow">❌ Failed to load weather for {cityData.city}</div>
			{/if}
		{/each}
	</div>
{/if}
