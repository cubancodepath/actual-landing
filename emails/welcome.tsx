import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Link,
  Hr,
  Preview,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeProps {
  locale?: 'en' | 'es';
  testflightUrl?: string;
  unsubscribeUrl?: string;
}

const copy = {
  en: {
    subject: "You're in — here's your early access",
    preview: "Your TestFlight access is ready — tap to install the beta.",
    heading: "You're in. Here's your early access.",
    intro: "You just joined a small group of people who care about owning their financial data — not renting access to it. I'm building the native iOS app for Actual Budget, and you're one of the first to try it.",
    testflightHeading: 'Install the beta',
    testflightButton: 'Install the Beta',
    testflightBody: "TestFlight is Apple's official way to try apps before they hit the App Store. Tap the button above to install Actual Budget Mobile and start budgeting with real data.",
    testflightNote: "You'll need the TestFlight app on your iPhone. If you don't have it, the link will prompt you to download it first.",
    expectHeading: 'What to expect',
    expectBody: "This is an early beta — you'll find rough edges. That's exactly why you're here. If something feels off, broken, or confusing, let me know. No spam, no newsletter — just this email and future build updates via TestFlight.",
    closing: "Your feedback shapes what gets built — I read every message.",
    signature: '— Barbaro',
    contact: 'Questions? Just reply to this email.',
    unsubscribe: 'You signed up at actual.cubancodepath.com.',
    unsubscribeLink: 'Unsubscribe',
  },
  es: {
    subject: "Ya estás dentro — tu acceso anticipado",
    preview: "Tu acceso a TestFlight está listo — toca para instalar la beta.",
    heading: "Ya estás dentro. Aquí está tu acceso anticipado.",
    intro: "Acabas de unirte a un grupo pequeño de personas que quieren controlar su dinero de verdad, sin depender de ninguna empresa para eso. Estoy construyendo la app nativa de iOS para Actual Budget, y eres de las primeras personas en probarla.",
    testflightHeading: 'Instala la beta',
    testflightButton: 'Instalar la Beta',
    testflightBody: "TestFlight es la forma oficial de Apple para probar apps antes de que lleguen al App Store. Toca el botón de arriba para instalar Actual Budget Mobile y empieza a presupuestar con datos reales.",
    testflightNote: "Necesitas tener la app TestFlight en tu iPhone. Si no la tienes, el enlace te pedirá descargarla primero.",
    expectHeading: 'Qué esperar',
    expectBody: "Esto es una beta temprana — vas a encontrar cosas sin pulir. Para eso estás aquí. Si algo se siente raro, roto, o confuso, dímelo. Sin spam, sin newsletter — solo este email y futuras actualizaciones por TestFlight.",
    closing: "Tu opinión da forma a lo que se construye — leo cada mensaje.",
    signature: '— Barbaro',
    contact: '¿Preguntas? Solo responde a este email.',
    unsubscribe: 'Te registraste en actual.cubancodepath.com.',
    unsubscribeLink: 'Cancelar suscripcion',
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

export default function Welcome({ locale = 'en', testflightUrl = '', unsubscribeUrl = '' }: WelcomeProps) {
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

            <Hr style={divider} />

            {/* TestFlight — CTA first, then explanation */}
            <Text style={subheading}>{t.testflightHeading}</Text>
            <Section style={buttonContainer}>
              <Button style={button} href={testflightUrl}>
                {t.testflightButton}
              </Button>
            </Section>
            <Text style={paragraph}>{t.testflightBody}</Text>
            <Text style={note}>{t.testflightNote}</Text>

            <Hr style={divider} />

            {/* What to expect */}
            <Text style={subheading}>{t.expectHeading}</Text>
            <Text style={paragraph}>{t.expectBody}</Text>

            {/* Closing — no divider, flows naturally */}
            <Text style={closingText}>{t.closing}</Text>
            <Text style={signature}>{t.signature}</Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>{t.contact}</Text>
            <Text style={footerTextSmall}>
              {t.unsubscribe}{' '}
              <Link href={unsubscribeUrl} style={unsubscribeLink}>
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

const note: React.CSSProperties = {
  fontSize: '13px',
  lineHeight: '20px',
  color: colors.textMuted,
  margin: '8px 0 0 0',
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

const buttonContainer: React.CSSProperties = {
  textAlign: 'center' as const,
  margin: '8px 0 24px 0',
};

const button: React.CSSProperties = {
  backgroundColor: colors.primary,
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  padding: '14px 36px',
  borderRadius: '8px',
  textDecoration: 'none',
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

const unsubscribeLink: React.CSSProperties = {
  color: colors.textMuted,
  textDecoration: 'underline',
};
