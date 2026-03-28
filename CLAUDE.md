# CLAUDE.md — Alva Sorrisos Landing Page
> Regras derivadas das 4 skills externas lidas e verificadas.

## Skills Aplicadas (Fontes Externas Lidas)

| Skill | URL | Regras Aplicadas |
|-------|-----|-----------------|
| planning-with-files | OthmanAdi/planning-with-files | Criar task_plan.md + findings.md antes de qualquer tarefa complexa |
| frontend-design | anthropics/skills/.../SKILL.md | Tipografia com caráter, grain texture, assimetria, sombras dramáticas |
| web-quality-skills | addyosmani/web-quality-skills | JSON-LD, LCP ≤ 2.5s, JS < 300KB, Accessibility 100, SEO ≥ 95 |
| code-simplifier | anthropics/claude-plugins-official/... | function declarations, tipos explícitos, sem nested ternaries |

---

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript estrito (`strict: true`)
- **Estilização:** Tailwind CSS v3 com design tokens customizados
- **Deploy:** Vercel

---

## Identidade Visual

| Token        | Valor     | Uso                             |
|--------------|-----------|---------------------------------|
| `navy-900`   | `#0A1628` | Fundo principal e footer        |
| `navy-800`   | `#162038` | Cards e seções alternadas       |
| `navy-700`   | `#1E2D4A` | Bordas e hovers                 |
| `orange-500` | `#FF6B2B` | CTAs primários, destaques       |
| `orange-600` | `#E85D1F` | Hover dos CTAs                  |
| `cream-50`   | `#FAF8F4` | Fundo de seções claras          |

### Tipografia — REGRA OBRIGATÓRIA (frontend-design skill)

> ⛔ Inter, Roboto e Arial são **banidas** como fontes genéricas (listadas explicitamente na skill #2).

- **Display/Headlines:** `Cormorant Garamond` — elegante, premium, caráter único
- **Body/UI:** `Plus Jakarta Sans` — moderno, polido, distintivo

### Visual Atmosphere (frontend-design skill)

- Grain/noise texture no Hero via CSS pseudo-element (sem asset externo)
- Elemento diagonal no corte entre seções
- Sombras dramáticas (`shadow-2xl` + `shadow-orange-500/20`)
- Hover states com `scale`, `translate` e `shadow` combinados — não apenas cor
- Transparências em camadas no fundo do Hero

---

## Qualidade Web — Orçamentos (web-quality-skills)

| Recurso | Limite | Status |
|---------|--------|--------|
| JS total first load | < 300 KB | Monitorar com `next build` |
| CSS | < 100 KB | Tailwind purge obrigatório |
| Fontes | < 100 KB | Subset latin + `display: swap` |
| Imagens above-fold | < 500 KB | `next/image` + AVIF/WebP |

### Metas Lighthouse

| Categoria | Alvo |
|-----------|------|
| Performance | ≥ 90 |
| Accessibility | **100** |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |

### Core Web Vitals

| Métrica | Meta |
|---------|------|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |

### SEO Obrigatório

- JSON-LD com `@type: "Dentist"` no `layout.tsx`
- Exatamente 1 `<h1>` por página
- `<h2>` por seção, `<h3>` nos cards
- Meta description < 160 chars
- Title < 60 chars

---

## Padrões de Código (code-simplifier skill)

```ts
// ✅ CORRETO — function declaration com tipo explícito
function Header({ onOpenModal }: HeaderProps): JSX.Element { ... }

// ❌ ERRADO — arrow function component
const Header = ({ onOpenModal }: HeaderProps) => { ... }

// ✅ CORRETO — Props interface explícita
interface HeaderProps {
  onOpenModal: (unit: 'centro' | 'boa_vista') => void
}

// ❌ ERRADO — nested ternary
const x = a ? b ? c : d : e  // → usar if/else ou switch

// ❌ ERRADO — comentário óbvio
// Retorna JSX
return <div>...</div>
```

### Regras Adicionais

- Importações ordenadas: Node built-ins → third-party → `@/` aliases → relativos
- Sem `any` implícito
- `noUnusedLocals` e `noUnusedParameters` ativos
- Componentes `'use client'` apenas quando há interação real

---

## Segurança (Zero Trust)

- Validação de formulários **sempre no backend** (`/api/leads`)
- Sanitizar inputs: `trim()` + verificação contra lista canônica
- Headers de segurança configurados em `next.config.ts`
- `.env.local` nunca commitado (`.gitignore` inclui)

---

## Analytics

- Utilitário centralizado em `src/lib/analytics.ts`
- `trackEvent()` chamado em **todos** os CTAs
- GTM e Meta Pixel injetados condicionalmente via `process.env.NEXT_PUBLIC_*`
- Eventos mapeados: `click_cta_hero_*`, `modal_open`, `lead_captured`, `whatsapp_redirect`
