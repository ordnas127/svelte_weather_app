<script lang="ts">
	import { onMount } from 'svelte';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
	import '../app.css';

	export let data;
	let isOpen = false;

	const username = data?.session?.user;
	const isLoggedIn = !!username;

	function toggleDropdown() {
		isOpen = !isOpen;
	}
</script>

<header class="bg-white dark:bg-gray-800 shadow">
	<nav class="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
		<a href="/" class="text-2xl font-bold">weather.io</a>

		<!-- Right-side controls: Theme + Login -->
		<div class="flex items-center gap-2 relative">
			<ThemeSwitch />

			<!-- Login/Profile Button -->
			<div class="relative">
				<button
					on:click={toggleDropdown}
					class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5.121 17.804A4 4 0 0112 20a4 4 0 016.879-2.196M15 10a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					<span>{isLoggedIn ? username : 'Login'}</span>
				</button>

				{#if isOpen}
					<div class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-10">
						{#if isLoggedIn}
							<a href="/logout" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Logout</a>
						{:else}
							<a href="/login" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Login</a>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</nav>
</header>

<main class="flex-grow max-w-4xl mx-auto px-4 py-8">
	<slot />
</main>

<footer class="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
	© {new Date().getFullYear()} weather.io
</footer>
