<script lang="ts">
  export let city: string;
  export let temp: number;
  export let icon: string;
</script>

<div class="p-4 bg-blue-100 text-blue-900 rounded shadow">
  <h2 class="text-lg font-semibold">{city}</h2>
  <p>{temp}°C</p>
  <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon" class="w-12 h-12" />
</div>