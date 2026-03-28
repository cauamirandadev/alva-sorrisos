# Findings — Alva Sorrisos Refactor
> Gerado por: planning-with-files skill

## Skill #1 — planning-with-files
- Padrão 3-arquivo: task_plan.md + findings.md + progress.md
- Salvar descobertas a cada 2 operações de navegação/pesquisa
- Regra: nunca repetir erros já logados

## Skill #2 — frontend-design (CRÍTICO)
- **Inter está banida** como fonte genérica — substituir por Cormorant Garamond + Plus Jakarta Sans
- Grain/noise texture é obrigatória para "visual atmosphere"
- Elementos assimétricos e grid-breaking no layout
- Hover states que "surpreendem" — não apenas color change
- Sombras dramáticas e transparências em camadas
- CSS-only OU Motion library (não keyframes ad-hoc misturados)
- Paleta navy/orange é OK — clichê é purple gradients, não orange

## Skill #3 — web-quality-skills
- JSON-LD obrigatório: @type "Dentist" (subtype de LocalBusiness)
- LCP image deve ter `priority` e `fetchPriority="high"` + preload
- Heading hierarchy: exatamente 1 h1, h2 por seção, h3 nos cards
- JS Budget: < 300KB (primeira carga) — framer-motion adiciona ~50KB gzipped, OK
- Fonts Budget: < 100KB — usar font-display: swap + subset latin
- Contraste mínimo: 4.5:1 para texto normal, 3:1 para texto grande
- Meta description < 160 chars, title < 60 chars

## Skill #4 — code-simplifier
- `function Header()` não `const Header = () =>`
- Tipo de retorno: `function Header(): JSX.Element`
- Props: `interface HeaderProps { ... }` declarado explicitamente
- Sem nested ternaries: `condition ? a ? b : c : d` → usar early returns
- Remover comentários que apenas descrevem o óbvio
- Preferir `switch` ou `if/else` chains sobre ternários encadeados
