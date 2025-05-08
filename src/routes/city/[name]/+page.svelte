<script lang="ts">
    export let data: {
      forecast: any;
      city: string;
    };
  
    const entries = data.forecast?.list ?? [];
  
    const MAX_ENTRIES_PER_DAY = 4;
    const grouped = new Map<string, typeof entries>();

    const allowedHours = ['00:00:00', '06:00:00', '12:00:00', '18:00:00'];

    for (const entry of entries) {
        const [day, time] = entry.dt_txt.split(' ');

        if (!allowedHours.includes(time)) continue;

        if (!grouped.has(day)) {
            grouped.set(day, []);
        }

        grouped.get(day)?.push(entry);
    }
    
    function formatDate(dateStr: string) {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en", {
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
  </script>
  
  <h1 class="text-2xl font-bold mb-6">📅 5-Day Forecast: {data.city}</h1>
  
  {#if entries.length > 0}
    {#each Array.from(grouped.entries()) as [day, dayEntries]}
      <h2 class="text-xl font-semibold mt-6 mb-2">{formatDate(day)}</h2>
      <div class="flex overflow-x-auto gap-4 pb-4">
        {#each dayEntries as entry}
        <div class="w-full md:w-[280px] bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
            <p class="text-sm font-semibold mb-1">{formatTime(entry.dt_txt)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
              alt={entry.weather[0].description}
              class="w-12 h-12 mx-auto"
            />
            <p class="text-lg font-bold">{entry.main.temp}°C</p>
            <p class="text-sm text-gray-600 dark:text-gray-300">{entry.weather[0].main}</p>
          </div>
        {/each}
      </div>
    {/each}
  {:else}
    <p class="text-red-500">❌ Failed to load forecast data.</p>
  {/if}
  