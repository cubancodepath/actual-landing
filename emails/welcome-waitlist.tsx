import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Preview,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeWaitlistProps {
  locale?: 'en' | 'es';
  unsubscribeUrl?: string;
}

const copy = {
  en: {
    subject: "You're on the waitlist — here's what we're building",
    preview: "A native iOS budgeting app, currently in beta. When a spot opens up, you'll get access.",
    heading: "You're on the waitlist.",
    intro: "Thanks for signing up. You just joined a small group of people who care about owning their financial data — not renting access to it.",
    introDetail: "I'm building Actual Budget Mobile: a native iOS app for zero-based budgeting that puts you in full control. No subscriptions, no data mining, no cloud required. Here's what that actually looks like.",
    buildingHeading: 'What we\'re building',
    buildingBody: "A native iOS budgeting app with offline-first architecture, CRDT-based sync (the same conflict-free replication that powers tools like Figma), and end-to-end encryption. It's fully open source and connects to any Actual Budget server — or runs entirely on your device.",
    stayTunedHeading: 'What happens next',
    stayTunedBody: "The beta is live on TestFlight with a limited number of spots. I'm opening access in batches — when a spot opens up for you, I'll send you an email with a direct link to join. No drip campaigns, no \"weekly tips\" — just access when it's your turn.",
    closing: "If you want to follow the build, the source is public on GitHub. And if you have questions, just hit reply.",
    signature: '— Barbaro',
    contact: 'Questions? Just reply to this email.',
    unsubscribe: 'You signed up at actual.cubancodepath.com.',
    unsubscribeLink: 'Unsubscribe',
  },
  es: {
    subject: "Estás en la lista de espera — esto es lo que estamos construyendo",
    preview: "Una app nativa de presupuesto para iOS, actualmente en beta. Cuando haya un lugar disponible, te damos acceso.",
    heading: "Estás en la lista de espera.",
    intro: "Gracias por registrarte. Acabas de unirte a un grupo pequeño de personas que quieren controlar su dinero de verdad, sin depender de ninguna empresa para eso.",
    introDetail: "Estoy construyendo Actual Budget Mobile: una app nativa de iOS para presupuesto base cero que te pone en control total. Sin suscripciones, sin rastreo de datos, sin nube. Esto es lo que eso significa en la práctica.",
    buildingHeading: 'Lo que estamos construyendo',
    buildingBody: "Una app nativa de iOS con arquitectura offline-first, sincronización basada en CRDTs (la misma replicación sin conflictos que usan herramientas como Figma), y cifrado de extremo a extremo. Es completamente de código abierto y se conecta a cualquier servidor Actual Budget — o funciona solo en tu dispositivo.",
    stayTunedHeading: 'Qué pasa después',
    stayTunedBody: "La beta ya está activa en TestFlight con un número limitado de lugares. Voy abriendo el acceso en grupos — cuando haya un lugar para ti, te mando un correo con el enlace directo para unirte. Sin campañas de goteo, sin \"tips semanales\" — solo acceso cuando llegue tu turno.",
    closing: "Si quieres seguir la construcción, el código es público en GitHub. Y si tienes preguntas, solo responde a este correo.",
    signature: '— Barbaro',
    contact: '¿Preguntas? Solo responde a este correo.',
    unsubscribe: 'Te registraste en actual.cubancodepath.com.',
    unsubscribeLink: 'Cancelar suscripción',
  },
};

export { copy };

const colors = {
  primary: '#8719E0',
  background: '#f9f9f9',
  cardBackground: '#ffffff',
  text: '#1a1a1a',
  textMuted: '#6b7280',
  border: '#e5e7eb',
};

export default function WelcomeWaitlist({ locale = 'en', unsubscribeUrl = '' }: WelcomeWaitlistProps) {
  const t = copy[locale] || copy.en;

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>Actual Budget</Text>
          </Section>

          {/* Main content */}
          <Section style={content}>
            <Text style={heading}>{t.heading}</Text>
            <Text style={paragraph}>{t.intro}</Text>
            <Text style={paragraph}>{t.introDetail}</Text>

            <Hr style={divider} />

            {/* What we're building */}
            <Text style={subheading}>{t.buildingHeading}</Text>
            <Text style={paragraph}>{t.buildingBody}</Text>

            <Hr style={divider} />

            {/* What happens next */}
            <Text style={subheading}>{t.stayTunedHeading}</Text>
            <Text style={paragraph}>{t.stayTunedBody}</Text>

            {/* Closing */}
            <Text style={closingText}>{t.closing}</Text>
            <Text style={signature}>{t.signature}</Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>{t.contact}</Text>
            <Text style={footerTextSmall}>
              {t.unsubscribe}{' '}
              <Link href={unsubscribeUrl} style={unsubscribeLinkStyle}>
                {t.unsubscribeLink}
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main: React.CSSProperties = {
  backgroundColor: colors.background,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '40px 20px',
};

const header: React.CSSProperties = {
  textAlign: 'center' as const,
  paddingBottom: '24px',
};

const logoText: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: '700',
  color: colors.primary,
  letterSpacing: '0.5px',
  margin: '0',
};

const content: React.CSSProperties = {
  backgroundColor: colors.cardBackground,
  borderRadius: '12px',
  padding: '32px',
  border: `1px solid ${colors.border}`,
};

const heading: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: '700',
  color: colors.text,
  margin: '0 0 16px 0',
};

const subheading: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '600',
  color: colors.text,
  margin: '0 0 12px 0',
};

const paragraph: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '24px',
  color: colors.text,
  margin: '0 0 16px 0',
};

const closingText: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '24px',
  color: colors.text,
  margin: '16px 0 8px 0',
};

const signature: React.CSSProperties = {
  fontSize: '15px',
  color: colors.textMuted,
  fontStyle: 'italic',
  margin: '0',
};

const divider: React.CSSProperties = {
  borderTop: `1px solid ${colors.border}`,
  margin: '24px 0',
};

const footer: React.CSSProperties = {
  textAlign: 'center' as const,
  paddingTop: '24px',
};

const footerText: React.CSSProperties = {
  fontSize: '13px',
  color: colors.textMuted,
  margin: '0 0 8px 0',
};

const footerTextSmall: React.CSSProperties = {
  fontSize: '12px',
  color: colors.textMuted,
  margin: '0',
};

const unsubscribeLinkStyle: React.CSSProperties = {
  color: colors.textMuted,
  textDecoration: 'underline',
};
