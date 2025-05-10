<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount, tick } from 'svelte';

	export let data: {
		forecast: any;
		city: string;
	};

	const entries = data.forecast?.list ?? [];
	const allowedHours = ['00:00:00', '06:00:00', '12:00:00', '18:00:00'];

	// Grouped forecast per day
	const grouped = new Map<string, any[]>();

	for (const entry of entries) {
		const [day, time] = entry.dt_txt.split(' ');
		if (!allowedHours.includes(time)) continue;
		if (!grouped.has(day)) grouped.set(day, []);
		grouped.get(day)?.push(entry);
	}

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en', {
			weekday: 'long',
			day: 'numeric',
			month: 'short'
		});
	}

	function formatTime(timeStr: string) {
		const date = new Date(timeStr);
		return date.toLocaleTimeString(undefined, {
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	let showFlags: boolean[] = [];
	let flatList: { day: string; entry: any }[] = [];

	// Flatten grouped entries
	for (const [day, entries] of grouped) {
		for (const entry of entries) {
			flatList.push({ day, entry });
		}
	}

	onMount(async () => {
		showFlags = Array(flatList.length).fill(false);
		for (let i = 0; i < flatList.length; i++) {
			showFlags[i] = true;
			await tick();
			await new Promise((r) => setTimeout(r, 150));
		}
	});
</script>

<h1 class="text-2xl font-bold mb-6">📅 5-Day Forecast: {data.city}</h1>

{#if flatList.length > 0}
	<!-- Grouped by day titles / but entries / animated individually -->
	{#each Array.from(grouped.entries()) as [day, dayEntries]}
		<h2 class="text-xl font-semibold mt-6 mb-2">{formatDate(day)}</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pb-8">
			{#each dayEntries as entry, i (entry.dt_txt)}
				{#if showFlags.find(f => f && entry.dt_txt.includes(entry.dt_txt.split(' ')[1]))}
					<div in:fade class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
						<p class="text-sm font-semibold mb-1">{formatTime(entry.dt_txt)}</p>
						<img
							src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
							alt={entry.weather[0].description}
							class="w-12 h-12 mx-auto"
						/>
						<p class="text-lg font-bold">{Math.round(entry.main.temp)}°C</p>
						<p class="text-sm text-gray-600 dark:text-gray-300">{entry.weather[0].main}</p>
					</div>
				{/if}
			{/each}
		</div>
	{/each}
{:else}
	<p class="text-red-500">❌ Failed to load forecast data.</p>
{/if}
