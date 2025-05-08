import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session');
  if (session) {
    try {
      event.locals.session = JSON.parse(session);
    } catch {
      event.locals.session = null;
    }
  } else {
    event.locals.session = null;
  }

  return resolve(event);
};
