import type { APIRoute } from 'astro';

export const prerender = false;

async function generateToken(email: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(email));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32);
}

export { generateToken };

export const GET: APIRoute = async ({ url }) => {
  const email = url.searchParams.get('email')?.toLowerCase().trim();
  const token = url.searchParams.get('token');

  if (!email || !token) {
    return new Response(page('Invalid unsubscribe link.', false), {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  const { env } = await import('cloudflare:workers');
  const secret = (env as any).UNSUBSCRIBE_SECRET || 'dev-secret';
  const expectedToken = await generateToken(email, secret);

  if (token !== expectedToken) {
    return new Response(page('Invalid unsubscribe link.', false), {
      status: 403,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  const db = env.DB;
  await db
    .prepare('UPDATE waitlist SET unsubscribed = 1 WHERE email = ?')
    .bind(email)
    .run();

  return new Response(page("You've been unsubscribed. You won't receive any more emails from us.", true), {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
};

function page(message: string, success: boolean): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Unsubscribe — Actual Budget</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f9f9f9; color: #1a1a1a; }
    .card { background: #fff; border-radius: 12px; padding: 40px; max-width: 400px; text-align: center; border: 1px solid #e5e7eb; }
    .icon { font-size: 48px; margin-bottom: 16px; }
    h1 { font-size: 20px; margin: 0 0 12px 0; }
    p { font-size: 15px; color: #6b7280; margin: 0; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${success ? '&#10003;' : '&#10007;'}</div>
    <h1>${success ? 'Unsubscribed' : 'Error'}</h1>
    <p>${message}</p>
  </div>
</body>
</html>`;
}
