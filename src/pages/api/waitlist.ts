import type { APIRoute } from 'astro';

export const prerender = false;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();
    const locale = body.locale || 'en';
    const turnstileToken = body.turnstileToken || '';
    const utm_source = body.utm_source || null;
    const utm_medium = body.utm_medium || null;
    const utm_campaign = body.utm_campaign || null;
    const utm_content = body.utm_content || null;

    if (!email || !EMAIL_REGEX.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Access Cloudflare env
    const { env } = await import('cloudflare:workers');

    // Verify Turnstile token (skip in dev if secret not available)
    const turnstileSecret = (env as any).TURNSTILE_SECRET;
    if (turnstileSecret) {
      const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      });
      const turnstileData = await turnstileRes.json() as { success: boolean };
      if (!turnstileData.success) {
        return new Response(
          JSON.stringify({ error: 'Verification failed. Please try again.' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } },
        );
      }
    }
    const db = env.DB;

    try {
      await db
        .prepare('INSERT INTO waitlist (email, locale, utm_source, utm_medium, utm_campaign, utm_content) VALUES (?, ?, ?, ?, ?, ?)')
        .bind(email, locale, utm_source, utm_medium, utm_campaign, utm_content)
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
