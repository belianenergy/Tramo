# 👑 CEO Review v2 — EnergyOS

## Data: 2026-05-06
## Modo: SELECTIVE EXPANSION + DESIGN CORRECTION

---

## 📋 RESUMO EXECUTIVO

EnergyOS ten un scope técnico sólido pero **desalineación estratéxica entre funcións e mercado**. As 4 funcións core están ben definidas, pero o deseño actual (Stitch v1) é demasiado "IA" — frío, complexo, pouco amigable para xestores inmobiliarios españois. O MVP necesita corrección de rumbo en UX antes de seguir construíndo.

---

## 1. REVISIÓN DE FUNCIÓNS

### 1.1 ¿Son correctas as 4 funcións core?

**Funcións actuais:**
1. **Dashboard** — Métricas agregadas e estado global
2. **AI Advisor (Asesor)** — Recomendación de tarifas con cálculo exacto
3. **Arbitraxe** — Simulador de baterías con datos OMIE
4. **Property Management** — CRUD de propiedades (implicado nos plans)

**Veredicto: ✅ CORRECTAS, pero con matiz**

As 4 funcións responden a necesidades reais:
- **Dashboard** → Visión global para xestores con múltiples propiedades
- **AI Advisor** → Diferenciador clave (ningunha competencia fai cálculo exacto de tarifas con CSV)
- **Arbitraxe** → Oportunidade de mercado (baterías están despegando en España)
- **Properties** — Necesario como base de datos

**PERO:** Falta unha función de **Fincas/Comunidades** separada de Apartamentos. No mercado español, a xestión de comunidades (reparto de gastos, coeficientes, zonas comúns) é un caso de uso completamente distinto ao de apartamentos turísticos. Mesturar ambos crea confusión.

### 1.2 ¿Falta algo crítico para o mercado español?

**SÍ. Funcións que faltan (por prioridade):**

#### 🔴 HIGH — Crítico para vender en España

| Función | Por que é crítica | Impacto MVP |
|---------|-------------------|-------------|
| **Xestión de CUPS** | Cada propiedade ten un CUPS único. Sen gestionalo, non hai trazabilidade. | Alto — engade 1-2 días |
| **Upload/OCR de facturas** | Os xestores reciben facturas en PDF. Facilitar o input é clave para adopción. | Medio — pode ser manual inicialmente |
| **Cálculo completo (con impostos)** | En España: enerxía + potencia + peaxes + impostos + alquiler equipo. Só enerxía non vale. | Alto — core do Advisor |
| **Alertas por email/telegram** | Notificar ao inquilino ou propietario cando hai consumo anómalo. | Medio — notificacións no MVP |

#### 🟡 MEDIUM — Mellora a proposta de valor

| Función | Por que importa | Cando implementar |
|---------|-----------------|-------------------|
| **Comparativa de fornecedores** | Non só recomendar tarifa, pero tamén compañía (Endesa, Iberdrola, etc.) | Post-MVP |
| **Informes PDF para propietarios** | O xestor necesita "xustificar" a súa comisión. Informes mensuais automatizados. | Fase 4 |
| **Multi-zona (Calefacción/Aire)** | En fincas, diferenciar consumo de calefacción central vs eléctrico | Post-MVP |
| **Predición de consumo** | Usar datos históricos + meteo para prever consumo do próximo mes | Post-MVP |

#### 🟢 LOW — Nice to have

- Integración con APIs de fornecedores (Endesa, etc.) — complexo, poucos teñen API pública
- Automatización de cambios de tarifa — requiere integración con contratos
- App móbil nativa — PWA é suficiente para MVP

### 1.3 ¿Están ben priorizadas as fases?

**Fases actuais (PLAN.md):**
1. Foundation (días 1-3)
2. Dashboard Core (días 4-6)
3. AI Advisor (días 7-10)
4. Arbitrage (días 11-14)
5. Polish & Deploy (días 15-17)

**Veredicto: ⚠️ NECESITA AXUSTE**

**Problemas:**
1. **Property Management non está nunha fase propia** — está implícito no Dashboard pero non explícito
2. **Non hai fase para "Fincas vs Apartamentos"** — requiere modelado de datos diferente
3. **17 días é agresivo** para 4 funcións + rebuild de UI

**Fases recomendadas (realista):**

| Fase | Duración | Obxectivo |
|------|----------|-----------|
| 1. Foundation + Design | 3-4 días | Setup + UI kit + navegación corrixida |
| 2. Properties Core | 2-3 días | CRUD propiedades, CUPS, clasificación por tipo |
| 3. Dashboard | 2 días | Métricas con datos reais (ou mock) |
| 4. AI Advisor | 3-4 días | Upload CSV + cálculo de tarifas COMPLETO |
| 5. Arbitrage | 3 días | Simulador con datos OMIE |
| 6. Polish & Deploy | 2-3 días | Responsive, animacións, Vercel |
| **Total** | **15-19 días** | Máis realista que 17 |

### 1.4 ¿O scope é axeitado para un MVP?

**Veredicto: ✅ SI, pero con condición**

O scope é axeitado se:
- **AI Advisor calcula TODOS os conceptos** (non só enerxía)
- **Arbitrage usa datos OMIE reais** (non mock)
- **Properties distingue Fincas vs Apartamentos**
- **Non se gasta tempo en features "nice to have"**

**Risco principal:** O cálculo de tarifas en España é complexo. Se o Advisor só calcula o termo de enerxía, o aforro mostrado será irreale e perderemos credibilidade.

---

## 2. ANÁLISE DE DESEÑO

### 2.1 ¿Que plataformas deberiamos referenciar máis?

Da análise de competencia, as referencias máis relevantes para EnergyOS son:

#### 🟢 MUST REFERENCE (incorporar patróns)

| Plataforma | Que incorporar | Por que |
|------------|----------------|---------|
| **Guesty** | Sidebar con iconas outlined + texto, espaciado xeneroso | Estándar SaaS inmobiliario, familiar para xestores |
| **Stripe** | Gráficos con anotacións, métricas financeiras prominentes | Transmite confianza e claridade |
| **Linear** | Modo escuro suave (#0F1117), bordes sutís, velocidade | Premium sen ser agresivo |
| **Enpal** | Cor verde para "ahorro", ton positivo | Enerxía = aforro, non = custo |

#### 🟡 REFERENCE SELECTIVA (adaptar con coidado)

| Plataforma | Que adaptar | Coidado con |
|------------|-------------|-------------|
| **EnergyHub** | Datos densos ben organizados, filtros sticky | Non volverse demasiado técnico |
| **Notion** | Flexibilidade de vistas (tabla/board) | Non confundir con demasiadas opcións |
| **Sense** | Visualización amigable, ton positivo | Non volverse demasiado "consumer" |

#### 🔴 EVITAR (non encaixan no mercado)

| Plataforma | Por que evitar |
|------------|----------------|
| **Buildium/AppFolio** | Deseño legacy, crea impresión de obsolescencia |
| **Vercel (literal)** | Negro puro cansa, demasiado técnico para xestores |
| **Emporia Vue** | Demasiado técnico/tabular para o público obxectivo |

### 2.2 ¿Que patróns de UX funcionan mellor para xestores inmobiliarios en España?

**Insights do mercado español:**

1. **O xestor típico maneja 10-50 propiedades** — necesita "visión de conxunto" primeiro, detalle despois
2. **Facturas eléctricas son un dolor** — calquera simplificación é valor
3. **Comunidades = xestión de conflitos** — transparencia e reparto claro son críticos
4. **Airbnb/Vrbo xestionan moito do workflow** — EnergyOS debe complementar, non substituír
5. **Non son técnicos** — evitar xerga (kWh é aceptable, pero explicar todo)

**Patróns que funcionan:**

| Patrón | Exemplo | Por que funciona |
|--------|---------|------------------|
| **Métricas de aforro primeiro** | "Aforrou 1.247€ este ano" | O xestor vende valor ao propietario |
| **Táboas con accións visibles** | "Ver detalle", "Descargar informe" | Workflow directo |
| **Estados con cores** | Verde = OK, Ámbar = Atención, Vermello = Acción requirida | Xestión rápida de alertas |
| **Sidebar colapsable** | Guesty, Linear | Máis espazo para datos en pantallas pequenas |
| **Empty states con guía** | Stripe | Cando non hai datos, ensinar a importar |
| **Filtros sticky** | EnergyHub | Para 50 propiedades, os filtros son esenciais |

---

## 3. RECOMENDACIÓNS CONCRETAS

### 3.1 Funcións que FALTAN (engadir ao MVP)

#### A. Distinción Fincas vs Apartamentos

**Problema:** O modelo actual trata todas as propiedades igual. Pero:
- **Fincas/Comunidades:** Ténen CUPS comúns, reparto por coeficientes, zonas comúns (ascensor, portal, xardín)
- **Apartamentos:** Ténen CUPS individuais, contratos propios, inquilinos concretos

**Solución:**
```typescript
type PropertyType = 'community' | 'apartment' | 'house';

interface Property {
  id: string;
  name: string;
  type: PropertyType;
  cups?: string[]; // CUPS asociados
  // Para comunidades:
  units?: Unit[]; // Pisos/apartamentos na finca
  commonAreas?: CommonArea[]; // Zonas comúns
  coefficients?: Record<string, number>; // Coeficientes de reparto
  // Para apartamentos:
  tenant?: Tenant;
  contract?: Contract;
}
```

**Impacto:** 1-2 días adicionais no modelado de datos e UI.

#### B. Cálculo completo de tarifas (imprescindible)

**Problema:** O cálculo actual (PLAN.md) só contempla o termo de enerxía:
```
PVPC: Σ(consumo × prezo_horario)
```

**Pero en España a factura é:**
```
Total = Enerxía + Potencia + Peaxes + Impostos + Alquiler equipos
```

**Solución — Cálculo completo:**
```typescript
interface BillCalculation {
  // Termo de enerxía
  energyCost: number; // kWh × precio
  
  // Termo de potencia (€/kW/día × días × kW contratados)
  powerCost: number;
  
  // Peaxes (acceso terciario, etc.)
  tolls: number;
  
  // Impostos (5.11% hidrocarburos, 0.5% xeración, 21% IVA)
  taxes: {
    hydrocarbons: number; // 5.11% sobre (enerxía + potencia)
    generation: number;   // 0.5% sobre enerxía
    vat: number;          // 21% sobre todo
  };
  
  // Alquiler de equipos de medida (contador)
  equipmentRental: number; // ~0.80-1.50€/mes
  
  total: number;
}
```

**Impacto:** 1-2 días adicionais no algoritmo de cálculo. **NON negociable** — sen isto o aforro mostrado é falso.

#### C. Xestión de CUPS

**Problema:** Sen CUPS, non hai trazabilidade nin integración futura con APIs de distribuidoras.

**Solución:**
- Campo obrigatorio en cada propiedade
- Validación de formato (20 caracteres, prefixo ES)
- Mostrar info do distribuidor asociado (detectado por CUPS)
- Link a CNE (Comisión Nacional de Enerxía) para verificación

**Impacto:** 0.5 días.

#### D. Alertas e Notificacións

**Problema:** O sistema debe ser proactivo, non pasivo.

**Solución (MVP):**
- Alerta de consumo anómalo (>30% vs media)
- Alerta de prezo alto no mercado (para arbitraxe)
- Alerta de fin de contrato (próximo a renovación)
- Notificación de oportunidade de aforro detectada

**Implementación:** Toast notifications + badge no sidebar.

**Impacto:** 1 día.

### 3.2 Funcións que SOBRAN (eliminar ou pospor)

| Función | Por que sobra | Acción |
|---------|---------------|--------|
| **OCR automático de facturas** | Complexo, requiere servicio externo (AWS Textract, etc.) | Pospor a Fase 4 |
| **Predición con ML** | Non hai datos suficientes no MVP | Pospor a post-MVP |
| **Integración API fornecedores** | Ningún fornecedor maior español ten API pública para consumo | Pospor indefinidamente |
| **App móbil nativa** | PWA con responsive é suficiente para validar | Non facer no MVP |
| **Modo claro (light mode)** | Dark mode único reduce complexidade | Manter só dark |
| **Multi-idioma (i18n)** | Enfocar en español/galego primeiro | Simplificar |

### 3.3 UX que necesita mellora URXENTE

#### A. Navegación: De 4 a 5 seccións principais

**Actual (implícito):**
- Dashboard
- Advisor
- Arbitrage
- Properties (implícito)

**Recomendado:**
```
📊 Panel (Dashboard)
🏢 Fincas (Communities)
   ├── Panel de fincas
   ├── Reparto de gastos
   └── Zonas comúns
🏠 Apartamentos (Apartments)
   ├── Panel de apartamentos
   ├── Propiedades
   └── Alertas por inquilino
⚡ Arbitraxe
🤖 Asesor
```

**Por que:** Separar Fincas e Apartamentos reduce a complexidade mental. O xestor entra en "modo comunidade" ou "modo Airbnb", non ambos á vez.

#### B. Estilo: De "IA dark" a "Profesional amigable"

**Problemas actuais (según contexto):**
- Estilo demasiado "IA" (dark, frío)
- Sidebar en inglés
- Navegación incompleta

**Correccións concretas:**

| Aspecto | Actual (malo) | Recomendado (bo) |
|---------|---------------|------------------|
| **Tono de cor** | Negro puro #000, frío | #0F1117 azulado, suave |
| **Cor primaria** | Verde agresivo | Esmeralda #10B981, calmado |
| **Tipografía** | Pesada, impactante | Inter 400-500, lixeira |
| **Métricas** | Grandes pero aisladas | Con contexto (trend up/down, vs mes pasado) |
| **Sidebar** | En inglés, iconas pouco claras | En español, iconas de Lucide consistentes |
| **Cards** | Sen bordes, fondos iguais | Bordes 1px #252A3A, fondos estratificados |
| **CTAs** | "Calculate" (inglés) | "Calcular aforro" (español) |
| **Empty states** | "No data" | "Importa tu primera factura para empezar" |
| **Loading** | Spinner xenérico | Skeleton con pulse suave |

#### C. Micro-interaccións que engadir

| Interacción | Onde | Por que |
|-------------|------|---------|
| **CountUp en métricas** | Dashboard | Dá sensación de "resultado" ao cargar |
| **Hover cards** | Todo | translateY(-1px) + border glow suave |
| **Hover filas táboa** | Listados | Fondo #1E2230, transición 150ms |
| **Stagger en carga** | Dashboard | Cards entran secuencialmente (50ms) |
| **Toast notifications** | Accións | Feedback inmediato de éxito/erro |
| **Confetti en aforro** | AI Advisor | Celebrar cando se atopa aforro significativo (>100€/ano) |

#### D. Mobile-first responsive

**Problema:** O actual non está pensado para móbil.

**Solución:**
- **Desktop (>1024px):** Sidebar completo (260px)
- **Tablet (768-1024px):** Sidebar colapsado a iconas (72px)
- **Móbil (<768px):** Bottom navigation (4 iconas) + drawer para sub-menús
- **Métricas en móbil:** Scroll horizontal se non caben 4
- **Gráficos en móbil:** Touch-friendly, zoom con pinch

### 3.4 Estilo: Paleta de cores corrixida

Baseado na análise de competencia e no problema "demasiado IA":

```css
/* Fondos */
--bg-primary: #0F1117;        /* Principal — suave, non puro */
--bg-card: #161922;           /* Tarxetas — ligeiramente máis claro */
--bg-sidebar: #13161F;        /* Sidebar — diferenciado */
--bg-hover: #1E2230;          /* Hover states */

/* Bordes */
--border-default: #252A3A;    /* Bordes visibles pero suaves */
--border-active: #3B4254;     /* Bordes en hover/focus */

/* Texto */
--text-primary: #E8ECF2;      /* Principal — branco suave */
--text-secondary: #8B94A5;    /* Secundario — gris azulado */
--text-muted: #5A6578;        /* Desactivado/placeholder */

/* Acentos por sección */
--accent-energy: #10B981;     /* Esmeralda — aforro, enerxía */
--accent-community: #3B82F6;  /* Azul — fincas, confianza */
--accent-apartment: #F59E0B;  /* Ámbar — apartamentos, calidez */
--accent-arbitrage: #8B5CF6;  /* Violeta — arbitraxe, diferenciación */

/* Estados */
--status-success: #34D399;    /* Éxito — verde claro */
--status-warning: #FBBF24;    /* Alerta — ámbar */
--status-error: #F87171;      /* Erro — vermello suave */
--status-info: #60A5FA;       /* Info — azul claro */
```

**Por que esta paleta funciona:**
- **Non é negro puro** → menos canseira visual
- **Cada sección ten cor propia** → orientación rápida
- **Verde para aforro** → asociación universal
- **Bordes visibles** → estratificación sen sombras agresivas

---

## 4. ROADMAP CORRIXIDO (Realista)

### Fase 1: Foundation + Design System (3-4 días)
- [ ] Setup Next.js 15 + Tailwind 4 + shadcn/ui
- [ ] Implementar paleta de cores corrixida
- [ ] Crear componentes base: Card, Button, Input, Table
- [ ] Navegación: Sidebar en español con 5 seccións
- [ ] Layout responsive (desktop/tablet/mobile)
- [ ] Tipografía: Inter + JetBrains Mono para números

**Entregable:** App base con navegación, layout e sistema de deseño

### Fase 2: Properties Core (2-3 días)
- [ ] Modelo de datos: Property (con type: community|apartment)
- [ ] CRUD de propiedades
- [ ] Campo CUPS con validación
- [ ] Clasificación por tipo (Fincas vs Apartamentos)
- [ ] Listado con filtros e busca
- [ ] Empty states con guía de importación

**Entregable:** Xestión de propiedades funcional

### Fase 3: Dashboard (2 días)
- [ ] 4 métricas principais con trend (vs período anterior)
- [ ] Gráfico de consumo (area chart con gradiente)
- [ ] Lista de propiedades con estado
- [ ] Alertas visuais (badges, cores)
- [ ] Mock data realista (5 propiedades de exemplo)

**Entregable:** Dashboard con datos de exemplo

### Fase 4: AI Advisor (3-4 días)
- [ ] Upload CSV con validación
- [ ] Parser de datos horarios
- [ ] **Cálculo COMPLETO de tarifas (con impostos e peaxes)**
- [ ] Comparativa: PVPC vs Fixa vs Time-of-Use
- [ ] Gráfico de comparación (barras)
- [ ] Aforro exacto anual/mensual
- [ ] Explicación da recomendación
- [ ] Botón "Exportar informe" (simulado)

**Entregable:** Usuario pode subir CSV e recibir recomendación completa

### Fase 5: Arbitrage Simulator (3 días)
- [ ] Datos OMIE (mock realista baseado en históricos)
- [ ] Visualización de prezos (gráfico temporal)
- [ ] Configuración de batería: capacidade, potencia, rendemento
- [ ] Algoritmo de sizing (simple pero razoado)
- [ ] Simulación de ciclos carga/descarga
- [ ] Cálculo de profit con ROI
- [ ] Gráfico de ciclos sobre prezos

**Entregable:** Simulador completo con datos realistas

### Fase 6: Polish & Deploy (2-3 días)
- [ ] Micro-interaccións (hover, loading, stagger)
- [ ] Responsive completo (mobile drawer nav)
- [ ] Toast notifications
- [ ] Testing manual en 3 dispositivos
- [ ] Optimización de performance
- [ ] Deploy en Vercel
- [ ] README con instrucións

**Entregable:** MVP público

**Total estimado: 15-19 días** (vs 17 do plan orixinal, máis realista)

---

## 5. ACCIÓN INMEDIATA RECOMENDADA

### Antes de seguir construíndo:

1. **✅ Aprobar esta revisión** (Mauro)
2. **🔄 Refacer o Design System** con paleta corrixida
3. **🔄 Refacer a Navegación** con 5 seccións en español
4. **🔄 Actualizar STITCH_PROMPT.md** co novo estilo
5. **🗑️ Descartar o dashboard actual de Stitch** (ou refactorizar completo)
6. **📋 Crear tickets/tasks** por cada fase do roadmap corrixido

### Non facer aínda:
- ❌ Non integrar APIs reais (OMIE, REE) — mock suficiente para MVP
- ❌ Non construír backend propio — localStorage + JSON suficiente
- ❌ Non facer tests automáticos — testing manual para MVP
- ❌ Non optimizar para escala — enfocar en funcionalidade

---

## 6. MÉTRICAS DE ÉXITO DO MVP

| Métrica | Obxectivo | Como medir |
|---------|-----------|------------|
| **Tempo para primeira recomendación** | < 5 minutos | Desde login ata ver aforro calculado |
| **Precisión do cálculo** | ±5% vs factura real | Comparar con 5 facturas reais |
| **Comprensión da UI** | 5/5 usuarios entenden sen axuda | Test con 5 xestores |
| **NPS do deseño** | > 7/10 | Encuesta post-uso |
| **Funcionalidade completa** | 4/4 módulos operativos | Checklist de features |

---

*Documento creado por: CEO Review Mode*
*Data: 2026-05-06*
*Versión: 2.0 (Selective Expansion + Design Correction)*
