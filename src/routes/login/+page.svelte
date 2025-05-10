<script lang="ts">
    import { invalidate } from '$app/navigation';
    import { goto } from '$app/navigation';
  
    let username = '';
    let password = '';
    let error = '';
  
    async function handleLogin() {
      const res = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (res.ok) {
        window.location.href = '/';
      } else {
        error = 'Invalid username or password.';
      }
    }
  </script>
  
  <div class="max-w-md mx-auto mt-10 space-y-6">
    <h1 class="text-2xl font-bold text-center">Login</h1>
  
    {#if error}
      <p class="text-red-600 text-center">{error}</p>
    {/if}
  
    <form on:submit|preventDefault={handleLogin} class="space-y-4">
      <input type="text" bind:value={username} placeholder="Username"
        class="w-full px-4 py-2 border rounded text-black bg-white" required />
      <input type="password" bind:value={password} placeholder="Password"
        class="w-full px-4 py-2 border rounded text-black bg-white" required />
      <button type="submit" class="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
        Login
      </button>
    </form>
  </div>
  