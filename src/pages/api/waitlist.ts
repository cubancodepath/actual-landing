import type { APIRoute } from 'astro';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();
    const locale = body.locale || 'en';

    if (!email || !EMAIL_REGEX.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Access D1 binding via Cloudflare env
    const { env } = await import('cloudflare:workers');
    const db = env.DB;

    try {
      await db
        .prepare('INSERT INTO waitlist (email, locale) VALUES (?, ?)')
        .bind(email, locale)
        .run();
    } catch (e: any) {
      // UNIQUE constraint = already on list
      if (e?.message?.includes('UNIQUE')) {
        return new Response(
          JSON.stringify({ error: 'You\'re already on the list!' }),
          { status: 409, headers: { 'Content-Type': 'application/json' } },
        );
      }
      throw e;
    }

    return new Response(
      JSON.stringify({ success: true, message: 'You\'re on the list!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('[waitlist]', err);
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
