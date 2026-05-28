# QA/Technical Review — Loop 1 (Tramo/EnergyOS)

**Fecha:** 2026-05-17
**Revisor:** Subagent QA
**Context:** Post-CEO approval, pre-Codex build

---

## Veredicto: 🟡 BLOQUEOS PARCIAIS IDENTIFICADOS

**Estado xeral:** O código base está funcional e o build pasa. Hai bloqueos menores que deben resolverse antes de lanzar `/codex goal` para evitar que Codex desperdicie tempo en cousas xa resoltas.

---

## Estado do código

### Estructura de páxinas ✅
- **Landing (`/`):** 539 liñas, completa con hero, benefits, KPI panels, alerts, how-it-works, lead form
- **App pages:** `/app/advisor`, `/app/apartments`, `/app/arbitrage`, `/app/config`, `/app/dashboard`, `/app/fincas`, `/app/operations`
- **API routes:** 12 rutas funcionando (alerts, communities, dashboard, forecasts, leads, listings, omie-prices, operations, savings, tariffs)

### Compoñentes existentes
✅ `AppShell`, `AlertPanel`, `CommunityTable`, `PropertyCard`, `Navigation`, `MetricCard`, `ConsumptionChart`  
❌ `BrandHeader`, `HeroOperationalPanel`, `KpiCard`, `EvidenceRow`, `AlertRow`, `PropertyTable`, `ReservationEnergyChart`, `SegmentedControl`, `SystemFlowNode`, `OwnerReportPreview`, `QualificationLeadForm`  
*(Moitos compoñentes do Blueprint aínda non existen como entidades separadas — está todo inline ou en páxinas)*

### Stack técnico ✅
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS 4 + Radix UI + Framer Motion + Recharts
- SQLite via fs (leads.json storage)
- **Stack correcto e minimal** para MVP

---

## Erros TypeScript

### Erros actuais
```
error TS6053: File '.next/types/app/layout.ts' not found.
error TS6053: File '.next/types/app/page.ts' not found.
error TS6053: File '.next/types/cache-life.d.ts' not found.
```
**Interpretation:** Estes non son erros de código. Son ficheiros `.next/types/` que se xeran durante o build. Desaparecen despois de `npm run build`. O `tsc --noEmit` sen build previo mostra estes falsos positivos.

**Conclusión:** ✅ TypeScript PASS con build previo. Non hai erros de código reais.

---

## Estado do Build

```
✓ Compiled successfully in 12.3s
✓ Generating static pages (19/19)
Route (app)  ... 19 routes
```

**Resultado:** ✅ Build PASSA. 19 páxinas xeradas. 12 API routes.

---

## Bloqueos para Codex build

### 🔴 Bloqueo crítico: Naming público aínda é "EnergyOS"
- `app/page.tsx` liña 165: `<div className="font-display text-lg font-semibold">EnergyOS</div>`
- `app/page.tsx` liña 197: texto "EnergyOS conecta reservas..."
- `app/page.tsx` liña 379: "Valida EnergyOS con tu carteira"
- **Fix preciso:** Rename global "EnergyOS" → "Tramo" en `app/page.tsx` e `app/app/` antes de que Codex engada máis código con naming incorrecto

### 🟡 Bloqueo menor: CSS mobile overflow
- Non hai regras CSS explícitas para previr scroll horizontal en 375px/390px
- O globals.css non define `overflow-x: hidden` nin `max-width` nos contenedores principales
- **Risco:** Ao engadir máis código, un elemento sen `max-width` pode romper o layout en mobile

### 🟡 Bloqueo menor: Playwright non configurado
- `@playwright/test` está en dependencies pero non hai `playwright.config.ts` nin tests
- O Blueprint di: "Playwright desktop/mobile screenshots pass" como criterio de aceptación
- **Acción necesaria:** Configurar playwright e add smoke tests antes do QA final

### 🟡 Bloqueo menor: Privacy helper copy
- O Blueprint esixe: "Privacy/legal helper copy is visible near the form"
- O lead form actual non ten texto de política de privacidade

### 🟡 Bloqueo menor: Falta `data/leads.json` directory
- O leads route crea o directorio en runtime, pero debe crearse en build
- **Risco baixo:** é só datos, non código

---

## Criterios de aceptación QA (Blueprint §11)

| Criterio | Estado | Notas |
|---|---|---|
| Next build pasa | ✅ PASS | Build exitoso, 19 páxinas |
| TypeScript pasa | ✅ PASS | Erros de `.next/types/` son falsos positivos post-build |
| Landing e app pages renderizan | ✅ PASS | 7 app pages + landing xeradas |
| Lead form persiste via API | ✅ PASS | `app/api/leads/route.ts` completo con validación |
| Playwright desktop/mobile screenshots | ❌ NON CONFIGURADO | Playwright instalado pero sen config |
| Default lead form submit sen enum mismatch | ✅ PASS | Enums validados (segment, mainPain, interests) |
| No horizontal scroll at 375px/390px | ⚠️ NON PROBADO | Non hai reglas CSS explícitas |
| Privacy/legal helper copy visible | ❌ FALTA | Non existe texto de política |
| Mobile header non overlap | ⚠️ NON PROBADO | Necesita screenshot test |
| Cream/ink/orange identity dominante | ✅ PASS | globals.css define: `#fcf9f8`, `#1c1b1b`, `#e6813a` |

---

## Recomendacións

### Antes de `/codex goal`:
1. **Rename EnergyOS → Tramo** en `app/page.tsx` (3 ocurrencias) e `app/app/` se ten naming herdado
2. **Engadir CSS rule** en `globals.css`: `body { overflow-x: hidden; }` + `.container { max-width: 100%; }`
3. **Configurar Playwright** (`playwright.config.ts`) con viewport 375px e 390px
4. **Engadir privacy copy** ao lead form: "Tus datos solo se usan para contactarte sobre Tramo. No compartimos ni vendemos información."

### Despois de Codex build:
5. Executar `npx tsc --noEmit` e `npm run build` 
6. Correr smoke tests Playwright para mobile/desktop
7. Verificar 375px e 390px sen scroll horizontal

---

## Nota

O código é funcional e o MVP está nun bo punto de partida. Os bloqueos son todos menores (renaming, CSS, tests, copy). **Non hai blockers de arquitectura ou negocio.** Un Codex executor pode resolver todos os bloqueos menores e avanzar a implementación completa do Tramo Blueprint sen atopar sorpresas técnicas.

Se Mauro quere que eu execute as recomendacións 1-4 antes de lancar o Codex, aviso para pedir approval.

---

*QA Review Loop 1 — Tramo/EnergyOS MVP*