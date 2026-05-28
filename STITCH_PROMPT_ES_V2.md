# EnergyOS Dashboard v2 — Prompt para Stitch (ESPAÑOL)

## Contexto do Proxecto

**EnergyOS Pro** é unha plataforma B2B de xestión enerxética para profesionais inmobiliarios en España:

### Dobre mercado:
1. **🏢 Fincas (Comunidades)** — Reparto de gastos, cálculo de coeficientes, monitorización de zonas comúns
2. **🏠 Apartamentos (Alugueres)** — Seguimento por unidade, alertas a inquilinos, xestión multi-contrato

### Funcionalidades compartidas:
3. **⚡ Asesor Enerxético IA** — Recomenda tarifas óptimas, calcula aforros exactos
4. **🔋 Simulador de Arbitraxe de Baterías** — Datos OMIE en tempo real + dimensionamento IA de baterías

---

## Sistema de Deseño v2 (Baseado en Análise de Competencia)

### Paleta de Cores (Modo Escuro Premium)

```css
/* Fondos estratificados */
--bg-primary: #0F1117;        /* Fondo principal - azulado suave */
--bg-sidebar: #13161F;        /* Sidebar ligeiramente diferenciado */
--bg-card: #161922;           /* Tarxetas */
--bg-card-hover: #1A1E2A;     /* Hover en tarxetas */
--bg-input: #1E2230;          /* Inputs e campos */

/* Bordes */
--border-default: #252A3A;    /* Bordes normais */
--border-hover: #3A4055;      /* Hover states */

/* Texto */
--text-primary: #E8ECF2;      /* Texto principal - branco suave */
--text-secondary: #8B94A5;    /* Texto secundario */
--text-muted: #5A6275;        /* Texto desactivado */

/* Acentos */
--accent-primary: #10B981;    /* Esmeralda - enerxía/éxito */
--accent-fincas: #3B82F6;     /* Azul - módulo fincas */
--accent-apts: #F59E0B;       /* Ámbar - módulo apartamentos */
--accent-arbitrage: #8B5CF6;  /* Violeta - arbitraxe */
--accent-success: #34D399;    /* Verde claro */
--accent-warning: #FBBF24;    /* Amarelo */
--accent-error: #F87171;      /* Vermello suave */
```

### Tipografía

- **Principal:** Inter (Google Fonts) — pesos 400, 500, 600, 700
- **Monospace:** JetBrains Mono — exclusivamente para números, prezos e métricas
- **Escala tipográfica:**
  - Hero/Display: 32px, weight 700, line-height 1.2
  - H1: 24px, weight 600, line-height 1.3
  - H2: 18px, weight 600, line-height 1.4
  - Body: 14px, weight 400, line-height 1.5
  - Caption: 12px, weight 500, uppercase, letter-spacing 0.05em
  - Metric Large: 36px, weight 700, JetBrains Mono, line-height 1.1
  - Metric Small: 20px, weight 600, JetBrains Mono

### Espaciado

- Container padding: 24px
- Card padding: 20px
- Card gap: 16px
- Section gap: 24px
- Border radius (cards): 12px
- Border radius (buttons): 8px
- Border radius (badges): 9999px (full)

---

## Estrutura da Interface

### 1. Header (56px de altura)

```
┌─────────────────────────────────────────────────────────────┐
│ [⚡ Logo]  EnergyOS    Fincas | Apartamentos | Arbitraxe | Asesor    [🔍] [🔔] [👤] │
└─────────────────────────────────────────────────────────────┘
```

- **Esquerda:** Logo (icona rayo + "EnergyOS" en 18px weight 700)
- **Centro:** Navegación de módulos con tabs
  - Activo: texto en --accent-primary + underline 2px
  - Inactivo: --text-secondary, hover → --text-primary
- **Dereita:** 
  - Search icon (expandible a input)
  - Notification bell con badge (3px dot en --accent-error)
  - Avatar de usuario (32px, redondeado)

### 2. Sidebar (260px, colapsable a 72px)

**Seccións:**

```
⚡ ENERGYOS
━━━━━━━━━━━━━━━━
📊  Panel
━━━━━━━━━━━━━━━━
🏢  FINCASt
   📊  Panel
   🏘️  Comunidades
   💰  Reparto de Gastos
   📈  Informes
━━━━━━━━━━━━━━━━
🏠  APARTAMENTOS
   📊  Panel
   🏘️  Propiedades
   👥  Inquilinos
   🚨  Alertas
━━━━━━━━━━━━━━━━
⚡  Arbitraxe
🤖  Asesor IA
━━━━━━━━━━━━━━━━
⚙️  Configuración
❓  Centro de Axuda
🚪  Pechar Sesión
```

**Regras de estilo sidebar:**
- Header "ENERGYOS" en caption (12px, uppercase, --text-muted)
- Items: 14px Inter, --text-secondary
- Hover: fondo rgba(255,255,255,0.03), --text-primary
- Activo: 
  - Fondo: rgba(16, 185, 129, 0.08)
  - Texto: --accent-primary
  - Indicador: barra lateral 3px en --accent-primary
  - Icona: peso 600
- Seccións con divisoria 1px --border-default
- Padding: 12px 16px por item
- Iconas: 20px, Material Symbols Outlined

### 3. Área de Contido

- Padding: 24px
- Max-width: 1440px (centrado)
- Scroll vertical cando excede altura

---

## Vistas do Dashboard

### Vista 1: Panel de Fincas (Por defecto)

**Fila de Métricas (4 columnas):**
```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ TOTAL           │ │ kWh MENSUAL     │ │ CUSTO MENSUAL   │ │ ALERTAS ACTIVAS │
│ COMUNIDADES     │ │                 │ │                 │ │                 │
│                 │ │                 │ │                 │ │                 │
│      12         │ │    45.2k        │ │    8.420€       │ │       3         │
│  ─────────────  │ │  ─────────────  │ │  ─────────────  │ │  ─────────────  │
│ ↑ +2 este mes   │ │ ↑ +4.2% vs prev│ │ ↓ -1.5% optim.  │ │ Ver prioridades │
└─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘
```

**Regras das tarxetas de métricas:**
- Fondo: --bg-card
- Borde: 1px --border-default
- Border-radius: 12px
- Padding: 20px
- Label: Caption (12px uppercase, --text-secondary)
- Valor: Metric Large (36px, JetBrains Mono, --text-primary)
- Tendencia: 12px, frecha + porcentaxe
  - Positivo (subida): --accent-success
  - Negativo (baixada): --accent-error
- Hover: border-color → --border-hover, translateY(-1px), sombra suave

**Gráfico de Consumo (2/3 anchura):**
- Título: "Consumo Agregado (kWh)" — H2
- Selector de tempo: 24H | 7D | 30D (pills, activo con fondo --accent-primary)
- Gráfico de área con gradiente (--accent-primary a transparente)
- Liña: 2px, --accent-primary
- Grid: liñas punteadas, --border-default
- Tooltip ao pasar o rato

**Panel Lateral Dereito (1/3 anchura):**

*Tarjeta Asesor IA:*
- Borde: 1px --accent-primary con 30% opacidade
- Fondo: gradiente sutil cara --accent-primary (5% opacidade)
- Icona: "auto_awesome" en --accent-primary
- Label: "ASESOR IA" — caption
- Texto: "3 comunidades poderían aforrar 8.500€/ano"
- "8.500€/ano" en --accent-primary, weight 700
- Botón: "Revisar Optimización" — secundario con borde --accent-primary

*Tarjeta Arbitraxe:*
- Borde: 1px --accent-arbitrage con 30% opacidade
- Label: "OPORTUNIDADE DE ARBITRAXE" — caption
- Comunidade: "Calle Mayor 15, Madrid"
- Potencial: "245€/mes" en --accent-arbitrage, Metric Small

**Táboa de Comunidades:**
- Header: fondo --bg-sidebar, caption uppercase
- Filas: fondo --bg-card, hover --bg-card-hover
- Bordes: 1px --border-default entre filas
- Columnas: Nome | Unidades | kWh (Mes) | Custo | Estado | Accións
- Estado:
  - Optimizado: punto --accent-success + texto
  - Analizando: punto --accent-warning + texto  
  - Alerta: punto --accent-error + texto
- Accións: icona "more_vert" con hover
- Paginación: abaixo da táboa

### Vista 2: Panel de Apartamentos

**Fila de Métricas:**
- Total Propiedades: 45
- Taxa Ocupación: 78%
- Custo Mensual: 5.230€
- Alertas Activas: 3

**Gráfico de Barras:**
- Consumo por unidade
- Liña de media comunitaria
- Cores: por debaixo da media (--accent-success), por encima (--accent-warning), moito por encima (--accent-error)

**Panel de Alertas:**
- 🔴 Unit 3B — Consumo +45% vs media
- 🟡 Unit 5A — AC activo (3 días)
- 🟢 Unit 2C — Factura lista para enviar

**Grid de Propiedades:**
- Tarxetas con foto (placeholder), dirección, conta de inquilinos, badge de estado

### Vista 3: Arbitraxe

**Panel Dividido:**
- Esquerda: Prezos de mercado (ticker OMIE)
- Dereita: Configuración de batería

**Ticker de Prezos:**
- Prezos en tempo real con codificación de cor
- Verde (baixo) → Amarillo (medio) → Rojo (alto)

**Visualización de Batería:**
- Nivel de carga con gradiente
- Control deslizante de capacidade

**Resultados:**
- Tarxetas Antes/Despois
- Gráfico de proxección
- ROI calculado

### Vista 4: Asesor

- Zona de carga CSV
- Táboa comparativa de tarifas
- Gráfico de barras comparando opcións
- Tarxeta de recomendación con aforro destacado

---

## Compoñentes Globais

### Botóns

| Variante | Estilo |
|----------|--------|
| Primary | Fondo --accent-primary, texto #000, hover: aclarar 10% |
| Secondary | Fondo transparente, borde 1px --accent-primary, texto --accent-primary |
| Ghost | Fondo transparente, texto --text-secondary, hover: fondo rgba(255,255,255,0.05) |
| Danger | Fondo --accent-error, texto branco |

- Padding: 10px 20px
- Border-radius: 8px
- Font: 14px weight 500
- Transición: all 150ms ease

### Badges de Estado

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
● Optimizado  │ ● Analizando │ ● Alerta     │
└─────────────┘ └─────────────┘ └─────────────┘
```

- Padding: 4px 12px
- Border-radius: 9999px
- Font: 11px weight 600 uppercase
- Fondo: cor con 10% opacidade
- Texto: cor ao 100%
- Punto: 6px, mesmo cor

### Inputs

- Fondo: --bg-input
- Borde: 1px --border-default
- Border-radius: 8px
- Padding: 12px 16px
- Focus: borde --accent-primary, glow suave

### Táboas

- Header: fondo --bg-sidebar, caption uppercase
- Filas: alternadas --bg-card / --bg-primary (sutil)
- Hover: --bg-card-hover
- Bordes: 1px --border-default
- Accións: icon buttons con hover

---

## Interaccións e Animacións

### Carga Inicial
- Cards: fade in + slideUp (translateY 10px → 0)
- Stagger: 50ms entre cada card
- Duración: 300ms, ease-out

### Métricas
- Contador animado (countUp) ao cargar
- Duración: 1.5s

### Hover States
- Cards: border glow suave, translateY(-1px), 150ms
- Botóns: brillo/escurecer fondo, 150ms
- Filas tabla: fondo --bg-card-hover, 100ms
- Links: cor --accent-primary, 100ms

### Cambio de Módulo
- Crossfade: 200ms
- Contido actual fade out → novo contido fade in

### Tooltips
- Fondo: --bg-card
- Borde: 1px --border-default
- Border-radius: 8px
- Padding: 8px 12px
- Font: 12px
- Aparecen: 200ms delay, fade in 100ms

### Loading States
- Skeleton: fondo #1E2230 con pulse animation
- Non usar spinners a menos que sexa necesario

### Notificacións (Toasts)
- Posición: arriba-dereita
- Entrada: slide in dende dereita
- Saída: fade out
- Duración: 3s automático
- Éxito: borde izquierda --accent-success
- Erro: borde izquierda --accent-error

---

## Responsive Breakpoints

| Breakpoint | Ancho | Cambios |
|------------|-------|---------|
| Mobile | < 640px | Single column, sidebar → drawer, bottom nav simplificado |
| Tablet | 640-1024px | 2 columnas, sidebar colapsable |
| Desktop | > 1024px | Layout completo, sidebar visible |

### Mobile Específico
- Sidebar convértese en drawer (deslizar dende esquerda)
- Bottom nav: 4 iconas (Panel, Fincas, Apartamentos, Máis)
- Cards: apiladas verticalmente
- Táboas: scroll horizontal ou tarxetas apiladas
- Gráficos: simplificados, menos puntos de datos

---

## Notas de Implementación para Stitch

1. **Usar TAILWIND CSS** vía CDN para todo o estilo
2. **Fontes:** Inter e JetBrains Mono desde Google Fonts
3. **Iconas:** Material Symbols Outlined (non Lucide para consistencia con v1)
4. **Tema escuro:** `class="dark"` no `<html>`
5. **Configurar tailwind.config** coa paleta personalizada
6. **TODAS as etiquetas de texto DEBEN estar en ESPAÑOL**
7. **NON usar placeholder text** (lorem ipsum) — usar datos realistas
8. **Incluir estados de hover** para todos os elementos interactivos
9. **Asegurar que o scroll funciona** no contido principal
10. **O sidebar debe ser navegable** (links con #)

### Datos de Exemplo Realistas

**Comunidades:**
- Residencial Los Álamos (24 unidades, 3,450 kWh, 712€)
- Calle Mayor 15 (12 unidades, 1,820 kWh, 445€)
- Edificio Mirador (56 unidades, 8,120 kWh, 1,560€)
- Urbanización Sol (30 unidades, 4,200 kWh, 890€)

**Alertas:**
- Consumo anómalo en Unit 3B (+45%)
- AC activo 72h en Unit 5A
- Factura pendente de envío Unit 2C

---

## Checklist de Calidade

- [ ] Todo o texto está en ESPAÑOL
- [ ] O sidebar mostra TODAS as seccións en español
- [ ] Non hai texto en inglés (Dashboard, Settings, etc.)
- [ ] O fondo non é negro puro (#000000)
- [ ] Hai contraste suficiente entre tarxetas e fondo
- [ ] As métricas usan JetBrains Mono
- [ ] Os hover states son sutís (non agresivos)
- [ ] A navegación é funcional (links con #)
- [ ] O scroll funciona no área de contido
- [ ] O deseño é responsive (funciona en móbil)
- [ ] As cores de acento son consistentes
- [ ] Hai espaciado suficiente entre elementos
- [ ] Os gráficos teñen datos realistas
- [ ] As táboas teñen hover states
- [ ] Os botóns teñen estados visualmente distintos
