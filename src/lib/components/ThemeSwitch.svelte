<script lang="ts">
	import { onMount } from 'svelte';

	let darkMode = false;

	onMount(() => {
		const cookieTheme = getCookie('theme');
		if (cookieTheme === 'dark') {
			darkMode = true;
			document.documentElement.classList.add('dark');
		} else {
			darkMode = false;
			document.documentElement.classList.remove('dark');
		}
	});

	function handleSwitchDarkMode() {
		darkMode = !darkMode;

		if (darkMode) {
			document.documentElement.classList.add('dark');
			document.cookie = `theme=dark; path=/; max-age=31536000`;
		} else {
			document.documentElement.classList.remove('dark');
			document.cookie = `theme=light; path=/; max-age=31536000`;
		}
	}

	function getCookie(name: string): string | undefined {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop()?.split(';')[0];
	}
</script>

<div>
	<input
		checked={darkMode}
		on:click={handleSwitchDarkMode}
		type="checkbox"
		id="theme-toggle"
	/>
	<label for="theme-toggle" class="theme-toggle-label" title="Toggle Theme"></label>
</div>

<style>
	#theme-toggle {
		display: none;
	}

	.theme-toggle-label {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		width: 2rem;
		height: 2rem;
		margin-right: 1rem;
		border-radius: 9999px;
		background-color: #fbbf24;
		transition: all 0.3s ease;
	}

	#theme-toggle:checked + .theme-toggle-label {
		background-color: transparent;
		box-shadow: inset -12px -10px 1px 1px #ddd;
	}
</style>
