// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	declare namespace App {
		interface Locals {
		  session: {
			user: string;
		  } | null;
		}
	  
		interface PageData {
		  session?: {
			user: string;
		  } | null;
		}
	  }
	}	  

export {};
