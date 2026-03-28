import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          700: '#1E2D4A',
          800: '#162038',
          900: '#0A1628',
        },
        orange: {
          500: '#FF6B2B',
          600: '#E85D1F',
        },
        cream: {
          50: '#FAF8F4',
        },
      },
      fontFamily: {
        // frontend-design skill: fontes com caráter — não Inter
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
        editorial: '-0.02em',
      },
      lineHeight: {
        editorial: '1.08',
        'body-loose': '1.85',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'cta-glow': 'ctaGlow 2.8s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        ctaGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 107, 43, 0.35)' },
          '50%': { boxShadow: '0 0 0 10px rgba(255, 107, 43, 0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
