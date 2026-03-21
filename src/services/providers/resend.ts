import { Resend } from 'resend';
import type { EmailProvider } from '../email';

const FROM = 'Actual Budget <hello@actual.cubancodepath.com>';

export class ResendProvider implements EmailProvider {
  private client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async send({ to, subject, html, unsubscribeUrl }: {
    to: string;
    subject: string;
    html: string;
    unsubscribeUrl?: string;
  }): Promise<void> {
    const headers: Record<string, string> = {};
    if (unsubscribeUrl) {
      headers['List-Unsubscribe'] = `<${unsubscribeUrl}>`;
      headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click';
    }

    const { error } = await this.client.emails.send({
      from: FROM, to, subject, html, headers,
    });
    if (error) {
      throw new Error(`Resend error: ${error.message}`);
    }
  }
}
