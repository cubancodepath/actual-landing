import { ResendProvider } from './providers/resend';

export interface EmailProvider {
  send(options: { to: string; subject: string; html: string; unsubscribeUrl?: string }): Promise<void>;
}

export function createEmailProvider(apiKey: string): EmailProvider {
  return new ResendProvider(apiKey);
}

export class ConsoleEmailProvider implements EmailProvider {
  async send(opts: { to: string; subject: string; html: string; unsubscribeUrl?: string }): Promise<void> {
    console.log('[email] TO:', opts.to);
    console.log('[email] SUBJECT:', opts.subject);
    console.log('[email] HTML length:', opts.html.length, 'chars');
  }
}
