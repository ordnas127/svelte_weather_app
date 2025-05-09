<script lang="ts">
  export let city: string;
  export let temp: number;
  export let icon: string;
</script>

<a href={`/city/${encodeURIComponent(city)}`} class="block transform transition duration-200 hover:scale-105">
  <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg flex items-center gap-4">
    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon" class="w-16 h-16" />
    <div>
      <h2 class="text-xl font-semibold">{city}</h2>
      <p class="text-gray-600 dark:text-gray-300">{Math.round(temp)}°C</p>
    </div>
  </div>
</a>