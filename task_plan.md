# Task Plan — Refatoração Alva Sorrisos
> Gerado por: planning-with-files skill (OthmanAdi/planning-with-files)

## Objetivo
Refatorar a landing page Alva Sorrisos aplicando estritamente as 4 skills externas lidas.

## Fases

### Fase 1 — Arquitetura e Planejamento ✅
- [x] Ler as 4 URLs de skills
- [x] Documentar findings
- [x] Criar task_plan.md

### Fase 2 — Tipografia e Design System
- [ ] Substituir Inter → Cormorant Garamond (display) + Plus Jakarta Sans (body)
- [ ] Adicionar grain texture via CSS (sem asset externo)
- [ ] Implementar elementos diagonais no Hero
- [ ] Sombras dramáticas e hover states que surpreendem

### Fase 3 — Qualidade Web (web-quality-skills)
- [ ] Adicionar JSON-LD (Dentist schema) no layout.tsx
- [ ] Adicionar preload do LCP image
- [ ] Verificar heading hierarchy (h1→h2→h3)
- [ ] Garantir contraste WCAG 2.2 AA em todos os textos

### Fase 4 — Refatoração de Código (code-simplifier)
- [ ] Converter arrow components → function declarations
- [ ] Adicionar tipos de retorno explícitos (JSX.Element)
- [ ] Adicionar Props interfaces explícitas
- [ ] Eliminar nested ternaries
- [ ] Remover comentários óbvios

### Fase 5 — CLAUDE.md e Validação
- [ ] Atualizar CLAUDE.md com todas as regras das skills
- [ ] npm run build sem erros
- [ ] Confirmar entregas

## Erros a Evitar (Log)
- Inter como fonte → banida pela frontend-design skill
- Arrow function components → preferir function declarations
- Sem JSON-LD → penaliza SEO score no Lighthouse
- Sem task_plan.md → violação da planning-with-files skill
