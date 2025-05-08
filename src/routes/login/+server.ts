import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { username, password } = await request.json();

  if (username === 'admin' && password === 'secret') {
    cookies.set('session', JSON.stringify({ user: username }), {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 60 * 60 * 24
    });

    return new Response(null, { status: 200 });
  }

  return new Response('Unauthorized', { status: 401 });
};
