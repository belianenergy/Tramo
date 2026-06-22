# AutoPlan: Tramo (EnergyOS) — Análise Estratéxica de Produto

**Data:** 2026-05-30 22:00 CET
**Solicitante:** Mauro
**Pipeline:** CEO → Design → Eng → DX
**Versión do produto:** MVP post-redeseño Dia Browser

---

## Phase 0: Intake + Restore Point

### Fontes lidas
- AGENTS.md (xenérico de workspace, non específico do produto)
- DESIGN.md (obsoleto — Emerald Green system, 2026-05-11)
- git log -15 (7 commits recentes do redeseño Dia)
- Árbore de ficheiros: 45 ficheiros .tsx/.ts activos

### Detectado
- **UI scope:** Landing (953 liñas), Dashboard (160 liñas), 6 páxinas app thin (68-114 liñas cada unha)
- **DX scope:** 11 rutas API, Frontman middleware, OTel instrumentation
- **Problema estrutural:** Compoñentes duplicados en 3 directorios:
  - `app/app/components/` (activo, actualizado a Dia)
  - `app/app/dashboard/components/` (copia desactualizada)
  - `app/components/` (terceira copia, estado descoñecido)

### Estado actual do produto
| Capa | Estado |
|------|--------|
| Landing page | ✅ Redeseñada (Dia Browser, 953 liñas) |
| Dashboard | ✅ Migrado a Dia light + Recharts |
| Páxinas app | 🟡 Esqueleto (68-114 liñas, sen funcionalidade real) |
| DESIGN.md | 🔴 Obsoleto — describe Emerald Green, non Dia Spectrum |
| API routes | 🟡 Definidas pero con datos sintéticos |
| Integracións reais | 🔴 Ningunha (Shelly, Datadis, PMS non conectados) |
| Pricing | 🟡 4 tiers definidos pero sen validación de mercado |
| Adquisición | 🔴 Sen pipeline (formulario de leads sen backend real) |

---

## Phase 1: CEO Review — Estratexia & Alcance

### 0A. Premise Challenge: É este o problema correcto?

**Premisa actual:** As xestoras de apartamentos turísticos en España non saben quen consume a enerxía nin canto pagan de máis.

**Análise:** A premisa é sólida pero estreita. O mercado obxectivo (xestoras con 5-100+ apartamentos) ten 3 dores reais:
1. **Atribución** — non saben que consumo é de cada reserva
2. **Optimización tarifaria** — pagan de máis por potencia contratada
3. **Reporting a propietarios** — informes manuais en Excel que non escalan

**Veredicto:** ✅ Premisa correcta. O framing actual ("atribución por reserva") é o diferenciador clave.

### 0B. Existing Code Leverage

| Sub-problema | Código existente | Estado |
|-------------|-----------------|--------|
| Dashboard KPIs | `app/app/dashboard/page.tsx` | ✅ Listo |
| Táboa de unidades | `app/app/dashboard/page.tsx` | ✅ Listo |
| Review diario | `app/app/dashboard/page.tsx` | ✅ Listo |
| Páxina de operacións | `app/app/operations/page.tsx` | 🟡 Esqueleto (75 liñas) |
| Páxina de apartamentos | `app/app/apartments/page.tsx` | 🟡 Esqueleto (78 liñas) |
| Arbitraxe | `app/app/arbitrage/page.tsx` | 🟡 Esqueleto (114 liñas) |
| Asesor tarifario | `app/app/advisor/page.tsx` | 🟡 Esqueleto (111 liñas) |
| Informes propietario | `app/app/informe/page.tsx` | 🟡 Esqueleto (107 liñas) |
| Leads CRM | `app/app/leads/page.tsx` | 🟡 Esqueleto (68 liñas) |
| API dashboard | `app/api/dashboard/route.ts` | 🟡 Datos mock |
| API leads | `app/api/leads/route.ts` | 🟡 Sen backend real |
| Landing GSAP | `app/page.tsx` | ✅ Completo |

**Key finding:** O 60% do produto son páxinas baleiras. Só landing e dashboard teñen contido real.

### 0C. Dream State

```
CURRENT (MVP)              →  THIS PLAN           →  12-MONTH IDEAL
────────────────────────────────────────────────────────────────────
Landing Dia Browser        →  Landing optimizada   →  Landing multi-idioma
Dashboard con mock data    →  Dashboard con datos  →  Dashboard real-time
                              reais (Shelly API)
6 páxinas baleiras         →  2 páxinas completas  →  6 módulos completos
                              (Operacións + Informes)
0 clientes                 →  Piloto con 1 xestora →  50+ xestoras activas
0 integracións             →  Shelly API + Datadis →  Multi-PMS, OMIE, batería
Pricing teórico            →  Pricing validado     →  Pricing optimizado
```

### 0C-bis. Implementation Alternatives

| Approach | Esforzo | Risco | Pros | Cons |
|----------|---------|-------|------|------|
| **A: Completar módulos core** (Operacións + Informes) | 2-3 semanas | Baixo | Entrega valor rápido, valida co piloto | Deixa pricing e integracións para despois |
| **B: Integracións primeiro** (Shelly + Datadis) | 3-4 semanas | Medio | Datos reais = demo creíble | Sen UI completa, difícil de vender |
| **C: Sales-first** (Landing + demo + outbound) | 1-2 semanas | Baixo | Valida mercado sen construír máis | Sen produto real detrás, risco de sobreprometer |
| **D: Full platform** (todos os módulos) | 8-12 semanas | Alto | Produto completo | Moito tempo sen feedback de mercado |

**Recomendación:** **A + C en paralelo** — completar Operacións e Informes (2-3 sem) mentres se fai outbound a 5-10 xestoras para o piloto.

### 0D. Mode-Specific Analysis

**Modo recomendado: SELECTIVE EXPANSION**

| Área | Acción | Xustificación |
|------|--------|---------------|
| Operacións | ✅ Expandir | Páxina máis próxima a completar, diferenciador clave |
| Informes propietario | ✅ Expandir | Valor directo para o cliente final |
| Apartamentos | 🟡 Hold | Depende de integracións reais |
| Arbitraxe | 🔴 Reducir | Moi cedo — require OMIE + batería real |
| Asesor tarifario | 🟡 Hold | Pode esperar a ter datos reais |
| Leads CRM | 🟡 Hold | O formulario da landing xa captura leads |
| API real | ✅ Expandir | Necesario para o piloto |

### 0E. Temporal Interrogation

**HORA 1:** Un developer abre o repo e atopa:
- DESIGN.md obsoleto (Emerald Green) vs código actual (Dia Spectrum)
- Compoñentes duplicados en 3 directorios
- Páxinas baleiras que compilan pero non fan nada
- Sen tests

**HORA 6+:** O developer necesita:
- Saber que API endpoints teñen datos reais vs mock
- Entender a arquitectura de compoñentes (cal é a fonte de verdade?)
- Ter un plan claro de que completar primeiro

**Accións inmediatas para HORA 1:**
1. Actualizar DESIGN.md ao sistema Dia actual
2. Eliminar directorios de compoñentes duplicados
3. Marcar páxinas baleiras con `// TODO: Implementar`

### 0F. Mode Selection

| Modo | Descrición |
|------|-----------|
| **SCOPE EXPANSION** | Construír todos os módulos xa |
| **SELECTIVE EXPANSION** ⭐ | Completar Operacións + Informes, hold resto |
| **HOLD** | Non construír máis, só refinar o existente |
| **REDUCTION** | Eliminar módulos non esenciais |

**Recomendación:** ⭐ **SELECTIVE EXPANSION**

### 11-Section Review

#### 1. Architecture
- ✅ Next.js App Router ben configurado
- 🔴 Compoñentes duplicados en 3 localizacións
- 🟡 API routes sen lóxica de negocio real
- 🟡 Sen capa de servizos (toda a lóxica nos compoñentes)

#### 2. Error & Rescue
- 🔴 Sen error boundaries
- 🔴 Sen retry lóxica en API calls
- 🟡 O formulario de leads ten estados idle/sending/sent/error (ben)

#### 3. Security
- 🟡 Middleware Frontman engadido
- 🔴 Sen autenticación (non necesario en MVP interno)
- 🟡 API routes sen rate limiting

#### 4. Data Flow
- 🔴 Datos mock en todas as API routes
- 🔴 Sen capa de persistencia real (SQLite configurado pero non usado)
- 🟡 `platform-data.ts` centraliza mock data (bo patrón)

#### 5. Code Quality
- 🟡 TypeScript compila limpo
- 🔴 Compoñentes duplicados violan DRY
- 🔴 DESIGN.md desactualizado crea confusión
- ✅ Commits recentes ben organizados (7 atómicos)

#### 6. Test Review
- 🔴 0 tests
- 🔴 Sen CI/CD
- 🔴 Sen lint-staged nin pre-commit hooks

#### 7. Observability
- ✅ OTel SDK engadido
- ✅ Frontman middleware
- 🟡 Sen dashboards de observabilidade configurados

#### 8. Database
- 🟡 SQLite configurado en `data/`
- 🔴 Sen migracións
- 🔴 Sen schema definido

#### 9. API Design
- 🟡 11 endpoints REST definidos
- 🔴 Todos devolven datos mock
- 🟡 Naming consistente (`/api/dashboard`, `/api/leads`, etc.)

#### 10. Performance
- ✅ Next.js con SSR/SSG potencial
- 🟡 GSAP animations ben illadas con `useGSAP`
- 🔴 Sen lazy loading de páxinas app

#### 11. Design & UX
- ✅ Landing page Dia Browser pulida
- ✅ Dashboard Dia light + Recharts
- 🔴 Inconsistencia: DESIGN.md vs código real
- 🔴 Páxinas app baleiras sen UX
- 🟡 Responsive só verificado en landing

---

## Phase 2: Design Review

### Information Hierarchy
| Prioridade | Elemento | Estado |
|-----------|---------|--------|
| 1º | Hero: proposta de valor clara | ✅ |
| 2º | Problemas que resolve | ✅ |
| 3º | Como funciona (loop operativo) | ✅ |
| 4º | Módulos do produto | ✅ |
| 5º | Prezos | 🟡 (non validados) |
| 6º | Confianza (compliance) | ✅ |
| 7º | CTA (diagnóstico) | ✅ |

### Missing States
- 🔴 **Loading states:** Non implementados nas páxinas app
- 🔴 **Empty states:** Que ve o usuario cando non hai datos?
- 🟡 **Error states:** Só no formulario de leads
- 🔴 **Success states:** Sen feedback post-acción no dashboard

### User Journey
1. Landing → Entende o valor → ✅
2. Landing → Solicita diagnóstico → ✅ (formulario funciona)
3. Dashboard → Ve métricas → ✅
4. Dashboard → Revisa alertas → ✅
5. Dashboard → Accede a Operacións → 🔴 (páxina baleira)
6. Dashboard → Ve informe propietario → 🔴 (páxina baleira)

**Rotura:** O journey rompe no paso 5. O usuario chega ao dashboard, ve datos, pero non pode profundar.

### Responsive
- 🟡 Landing testada a 1280px
- 🔴 Non verificada a 375px (móbil pequeno)
- 🔴 Táboa de unidades posiblemente rota en móbil

### Accessibility
- 🔴 Sen focus states visibles
- 🔴 Sen contraste verificado
- 🔴 Sen keyboard navigation
- 🟡 Texto alternativo en mockup do dashboard

---

## Phase 3: Eng Review

### Architecture Issues

**🔴 CRÍTICO: Compoñentes duplicados**
```
app/components/           ← Copia A (estado descoñecido)
app/app/components/       ← Copia B (actualizada a Dia)
app/app/dashboard/components/ ← Copia C (desactualizada)
```

**Solución:** Eliminar `app/components/` e `app/app/dashboard/components/`. Manter só `app/app/components/` como fonte de verdade.

**🔴 CRÍTICO: DESIGN.md desactualizado**
O sistema de deseño documentado (Emerald Green, Plus Jakarta Sans) non coincide co implementado (Dia Spectrum, Inter Light).

**Solución:** Reescribir DESIGN.md co sistema Dia actual.

### Edge Cases
- Que pasa se non hai datos de Shelly? → Fallback non implementado
- Que pasa se a API de Datadis falla? → Sen retry
- Que pasa con 100+ apartamentos? → A táboa actual non pagina
- Que pasa se o PMS non ten API? → Non contemplado

### What breaks at 2am Friday?
1. A API de leads falla → o formulario mostra erro xenérico (esto xa está)
2. O dashboard carga sen datos → mostraría 0 en todas as métricas (aceptable)
3. GSAP non carga → a landing perde animacións pero o contido segue visible (✅ graceful degradation)

### Trust Boundaries
- 🟡 API routes sen auth (aceptable para MVP interno)
- 🔴 Datos mock expoñen estructura pero non datos reais
- 🟡 Middleware Frontman engade capa de observabilidade

---

## Phase 3.5: DX Review

**Skip** — o produto non ten API pública, CLI, nin SDK. É unha app web B2B interna.

---

## Phase 4: Final Approval Gate

### Plan Summary
Tramo é un MVP funcional de xestión enerxética B2B cunha landing page visualmente pulida (Dia Browser) e un dashboard con gráficos Recharts. O 60% das páxinas da app están baleiras. Non hai integracións reais, clientes, nin tests. O DESIGN.md está obsoleto. A arquitectura ten compoñentes duplicados en 3 directorios.

**Recomendación:** Selective Expansion — completar Operacións + Informes, limpar a débeda técnica, e iniciar outbound para o piloto.

### Decisions Made (16 auto-decided, 3 taste, 1 user challenge)

| # | Tipo | Decisión |
|---|------|---------|
| 1 | Mechanical | Actualizar DESIGN.md ao sistema Dia |
| 2 | Mechanical | Eliminar compoñentes duplicados |
| 3 | Mechanical | Completar Operacións antes que Arbitraxe |
| 4 | Mechanical | Hold en Apartamentos ata ter integracións |
| 5 | Mechanical | Non construír tests aínda (MVP pre-piloto) |
| 6 | Mechanical | Manter SQLite como DB (non migrar a Postgres) |
| 7 | Mechanical | Engadir loading/empty/error states ás páxinas app |
| 8 | Mechanical | O foco é B2B xestoras España, non expandir a outros mercados |
| 9 | Mechanical | Pricing queda como está ata validar con piloto |
| 10 | Mechanical | Recharts sobre Nivo/Victory (xa instalado e funcionando) |
| 11 | Mechanical | Inter 300 sobre Geist para consistencia visual |
| 12 | Mechanical | Spectrum gradient como sinatura visual (non volver a emerald) |
| 13 | Mechanical | Un só directorio de compoñentes: `app/app/components/` |
| 14 | Mechanical | Background unificado con 4 blobs (non por sección) |
| 15 | Mechanical | API real para Shelly antes que Datadis (máis impacto) |
| 16 | Mechanical | OTel + Frontman xa configurados, non tocar |
| T1 | Taste | Landing multi-idioma agora ou despois do piloto? → Despois |
| T2 | Taste | Dark mode toggle mantelo ou eliminalo? → Eliminar (Dia é light-only) |
| T3 | Taste | Nome do produto: Tramo vs EnergyOS? → Tramo para landing, EnergyOS interno |
| UC1 | ⚠️ USER | **O pricing (150-1250€/mes) é correcto para o mercado español?** → Validar con 3 xestoras antes de publicar |

### Review Scores

| Fase | Puntuación | Notas |
|------|-----------|-------|
| CEO Review | 6.5/10 | Boa dirección, moito por construír |
| Design Review | 7/10 | Landing pulida, inconsistencia DESIGN.md |
| Eng Review | 5/10 | Débeda técnica (duplicación, sen tests) |
| DX Review | N/A | Sen scope dev-facing |

### Cross-Phase Themes
1. **Débeda de documentación** — DESIGN.md obsoleto é o síntoma principal
2. **Foco vs dispersión** — 6 páxinas baleiras vs 2 que funcionan
3. **MVP real vs mock** — Sen datos reais non se pode validar nada
4. **Velocidade vs calidade** — O redeseño Dia foi rápido pero creou débeda (compoñentes duplicados)

### Implementation Tasks (Prioritized)

| # | Tarefa | Urxencia | Esforzo |
|---|--------|---------|---------|
| 1 | Actualizar DESIGN.md ao sistema Dia | 🔴 P0 | 1h |
| 2 | Eliminar compoñentes duplicados | 🔴 P0 | 2h |
| 3 | Completar páxina de Operacións | 🟡 P1 | 2-3d |
| 4 | Completar páxina de Informes | 🟡 P1 | 2-3d |
| 5 | Integrar Shelly API (datos reais) | 🟡 P1 | 3-5d |
| 6 | Engadir loading/empty/error states | 🟡 P1 | 1d |
| 7 | Eliminar dark mode toggle | 🟢 P2 | 30min |
| 8 | Validar pricing con 3 xestoras | 🟡 P1 | 1sem |
| 9 | Tests básicos (dashboard + API) | 🟢 P2 | 2d |
| 10 | Lazy loading de páxinas app | 🟢 P2 | 1h |

---

**Xerado por:** gstack-autoplan v1.0.0
**Seguinte paso:** Mauro revisa o User Challenge (pricing) e decide se aprobar o plan.
