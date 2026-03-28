import type { JSX } from 'react'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
})

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Alva Sorrisos — Clínica Odontológica Premium',
  description:
    'Implantes, Invisalign, Lentes de Contato e mais em Uberaba. Nota 4,6 no Google. Avaliação gratuita pelo WhatsApp.',
  keywords: [
    'dentista Uberaba',
    'implante dentário Uberaba MG',
    'invisalign Uberaba',
    'lentes de contato dental',
    'clareamento dental',
    'odontopediatria Uberaba',
  ],
  authors: [{ name: 'Alva Sorrisos' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Alva Sorrisos — Tudo o que seu sorriso precisa em um só lugar',
    description:
      'Clínica odontológica premium. Duas unidades em Uberaba. Nota 4,6 no Google.',
    siteName: 'Alva Sorrisos',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A1628',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'Alva Sorrisos',
  description: 'Clínica odontológica premium com duas unidades em Uberaba, MG.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.6',
    reviewCount: '5000',
    bestRating: '5',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Tratamentos Odontológicos',
    itemListElement: [
      'Implantes e Próteses',
      'Invisalign e Ortodontia',
      'Lentes e Facetas',
      'HOF (Botox)',
      'Clareamento',
      'Odontopediatria',
      'Clínico Geral',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  },
  department: [
    {
      '@type': 'Dentist',
      name: 'Alva Sorrisos — Centro, Uberaba',
      employee: { '@type': 'Person', name: 'Dra. Renata F. R. Menezes', identifier: 'CRO MG57107' },
    },
    {
      '@type': 'Dentist',
      name: 'Alva Sorrisos — Boa Vista, Uberaba',
      employee: { '@type': 'Person', name: 'Dra. Luana A. Barreto', identifier: 'CRO MG44478' },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  // NEXT_PUBLIC_* são seguros para o client bundle — são tokens públicos de analytics,
  // não segredos. Segredos reais (DB_URL, API keys) NUNCA devem usar NEXT_PUBLIC_.
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jakartaSans.variable}`}>
      <head>
        {/* LCP image preload — melhora Core Web Vitals (LCP ≤ 2.5s) */}
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1920&q=85"
          fetchPriority="high"
        />

        {/* JSON-LD — structured data para SEO ≥ 95 no Lighthouse */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}

        {/*
          GTM_PLACEHOLDER
          strategy="afterInteractive" — carrega após hidratação, não bloqueia LCP/FCP.
          Substitui o inline dangerouslySetInnerHTML em <head> que bloqueava rendering.
          Para ativar: configure NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX no .env.local
        */}
        {GTM_ID && (
          <>
            <Script
              id="gtm"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          </>
        )}

        {/*
          PIXEL_PLACEHOLDER
          strategy="afterInteractive" — não bloqueia rendering.
          Para ativar: configure NEXT_PUBLIC_META_PIXEL_ID=000000000000 no .env.local
        */}
        {PIXEL_ID && (
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');fbq('track','PageView');`,
            }}
          />
        )}
      </body>
    </html>
  )
}
