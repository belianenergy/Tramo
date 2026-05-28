# EnergyOS — Dashboard Amigable (v3)

## Visión Xeral

Crea un dashboard de xestión enerxética para profesionais inmobiliarios en España. O deseño debe sentirse **cálido, amigable e profesional** — como unha ferramenta que un xestor de fincas usaría con gusto cada día. NON debe parecer unha interface de IA nin un terminal de datos.

---

## Estilo Visual — "Cálido e Profesional"

### Paleta de Cores (Modo Escuro Amigable)

```css
/* Fondos — cálidos, non fríos */
--bg-main: #1A1B23;           /* Fondo principal — lixeiro toque cálido */
--bg-sidebar: #16171E;        /* Sidebar — un pouco máis escuro */
--bg-card: #22232E;           /* Tarxetas — distinguible do fondo */
--bg-card-hover: #292A37;     /* Hover suave */
--bg-input: #2A2B38;          /* Inputs */

/* Bordes — sutís pero visibles */
--border-soft: #2E3040;       /* Bordes normais */
--border-hover: #3D3F52;      /* Hover */

/* Texto — branco cálido, non frío */
--text-main: #F0EDE8;         /* Principal — branco cálido (non puro) */
--text-secondary: #9B97A0;    /* Secundario */
--text-muted: #6B6873;        /* Desactivado */

/* Acentos — ámbar/dourado (enerxía solar, cálido) */
--accent-primary: #F5A623;    /* Dourado — enerxía, aforro, positivo */
--accent-primary-light: #FFD180; /* Dourado claro */
--accent-fincas: #5BA3F5;     /* Azul ceo — fincas, confianza */
--accent-apts: #FFB74D;       /* Ámbar — apartamentos, calidez */
--accent-arbitrage: #AB7FFF;  /* Violeta suave — arbitraxe */
--accent-success: #66D9A0;    /* Verde suave */
--accent-warning: #FFD54F;    /* Amarelo cálido */
--accent-error: #FF7B7B;      /* Vermello suave */
```

### Tipografía

- **Principal:** Inter (Google Fonts) — pesos 300, 400, 500, 600
- **Monospace:** IBM Plex Mono — para números e métricas (máis amigable có JetBrains)
- **Escala:**
  - Saudación: 28px, weight 300 (lixeira, acolledora)
  - H1: 22px, weight 600
  - H2: 16px, weight 600
  - Body: 14px, weight 400
  - Caption: 11px, weight 500, uppercase, letter-spacing 0.08em
  - Métricas: 32px, weight 600, IBM Plex Mono

### Bordas e Formas

- Border-radius (cards): 16px (máis redondeado = máis amigable)
- Border-radius (botóns): 12px
- Border-radius (badges): 9999px
- Border-radius (inputs): 10px

---

## Estrutura da Interface

### 1. Header (64px)

```
┌─────────────────────────────────────────────────────────────────────┐
│ ☀️ EnergyOS          [🔍 Buscar...]          [🔔] [👤 Mauro ▾]     │
└─────────────────────────────────────────────────────────────────────┘
```

- **Esquerda:** Icona de sol (☀️) + "EnergyOS" en 20px weight 600, cor --accent-primary
- **Centro:** Campo de busca con bordas redondeadas, placeholder "Buscar comunidade..."
- **Dereita:** Campá de notificacións con badge + avatar do usuario con nome

### 2. Sidebar (240px)

```
┌──────────────────────┐
│                      │
│  ☀️ EnergyOS         │
│                      │
│  ─────────────────── │
│                      │
│  📊  Panel           │  ← Activo (fondo dourado 10%)
│                      │
│  ─────────────────── │
│                      │
│  🏢  Fincas          │
│     📋  Comunidades  │
│     💰  Reparto      │
│     📈  Informes     │
│                      │
│  ─────────────────── │
│                      │
│  🏠  Apartamentos    │
│     🏘️  Propiedades  │
│     👥  Inquilinos   │
│     🚨  Alertas      │
│                      │
│  ─────────────────── │
│                      │
│  ⚡  Arbitraxe       │
│  🤖  Asesor IA       │
│                      │
│  ─────────────────── │
│                      │
│  ⚙️  Configuración   │
│                      │
└──────────────────────┘
```

- Fondo: --bg-sidebar
- Items: 14px Inter weight 400, --text-secondary
- Hover: fondo rgba(245, 166, 35, 0.05), --text-main
- Activo: fondo rgba(245, 166, 35, 0.10), --accent-primary, barra lateral 3px dourada
- Espaciado xeneroso: 14px padding vertical por item
- Seccións separadas por divisoria 1px --border-soft

### 3. Área de Contido Principal

- Padding: 28px
- Scroll vertical
- Max-width: 1400px centrado

---

## Vista Principal — Panel

### 3.1 Saudación (Parte Superior)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   Bos días, Mauro ☀️                                                │
│   Aquí tes o resumo das túas propiedades                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

- Texto: 28px weight 300, --text-main
- Subtítulo: 14px weight 400, --text-secondary
- Estilo: acolledor, persoal, non corporativo

### 3.2 Tarxetas de Métricas (4 columnas)

```
┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│                   │ │                   │ │                   │ │                   │
│  🏢 Comunidades   │ │  ⚡ Consumo       │ │  💰 Gasto         │ │  🚨 Alertas       │
│                   │ │                   │ │                   │ │                   │
│      12           │ │    45.2k kWh      │ │    8.420€         │ │       3           │
│                   │ │                   │ │                   │ │                   │
│  +2 este mes  ↗️  │ │  +4.2% vs ant. ↗️ │ │  -1.5% optim. ↘️  │ │  Ver prioridades →│
│                   │ │                   │ │                   │ │                   │
└───────────────────┘ └───────────────────┘ └───────────────────┘ └───────────────────┘
```

- Fondo: --bg-card
- Borde: 1px --border-soft
- Border-radius: 16px
- Padding: 24px
- Icona: 28px, emoji-style (non Material Symbols), á esquerda do label
- Label: 11px uppercase, --text-secondary, letter-spacing 0.08em
- Valor: 32px IBM Plex Mono weight 600, --text-main
- Tendencia: 12px, frecha emoji + texto
  - Positivo: --accent-success
  - Negativo: --accent-error
  - "Ver prioridades →" en --accent-primary (link amigable)
- Hover: border-color → --accent-primary con 20% opacidade, translateY(-2px), sombra suave (0 8px 24px rgba(0,0,0,0.2))
- Transición: 200ms ease

### 3.3 Gráfico de Consumo (2/3 anchura)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  📈 Consumo dos últimos 30 días                             │
│                                                             │
│  [24H] [7D] [30D ●]                                         │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │         ╭──────╮                                    │   │
│  │    ╭───╯      ╰───╮          ╭────╮                │   │
│  │ ──╯               ╰──────────╯    ╰──              │   │
│  │                                                     │   │
│  │  01  03  05  07  09  11  13  15  17  19  21  23   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Liña: --accent-primary (dourado)                           │
│  Area: gradiente dourado → transparente                     │
│  Grid: punteado, --border-soft                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- Título: "📈 Consumo dos últimos 30 días" — 16px weight 600
- Selector de tempo: pills con border-radius 8px, activo con fondo --accent-primary
- Gráfico de área suave con gradiente dourado
- Liña: 2.5px, --accent-primary
- Tooltip ao pasar o rato (fondo --bg-card, borde --border-soft, border-radius 12px)

### 3.4 Panel Lateral Dereito (1/3 anchura)

#### Tarxeta do Asesor IA

```
┌─────────────────────────────────────┐
│                                     │
│  🤖 Asesor Enerxético               │
│                                     │
│  Detectei unha oportunidade:        │
│  3 comunidades poden aforrar        │
│  cambiando de tarifa.               │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  💰 Aforro estimado           │  │
│  │     8.500€ / ano              │  │
│  └───────────────────────────────┘  │
│                                     │
│  [ Ver recomendación → ]            │
│                                     │
└─────────────────────────────────────┘
```

- Fondo: gradiente sutil de --bg-card cara dourado (5% opacidade)
- Borde: 1px --accent-primary con 25% opacidade
- Border-radius: 16px
- Padding: 24px
- Título: "🤖 Asesor Enerxético" — 16px weight 600, --accent-primary
- Texto: 14px weight 400, --text-main, tono conversacional (non corporativo)
- Aforro: 24px IBM Plex Mono weight 600, --accent-primary
- Botón: fondo transparente, borde 1px --accent-primary, texto --accent-primary, border-radius 12px

#### Tarxeta de Arbitraxe

```
┌─────────────────────────────────────┐
│                                     │
│  ⚡ Oportunidade de Arbitraxe        │
│                                     │
│  Calle Mayor 15                     │
│  Exceso de reactiva detectado       │
│                                     │
│  Progreso: ████████░░ 75%           │
│                                     │
│  [ Ver detalles → ]                 │
│                                     │
└─────────────────────────────────────┘
```

- Fondo: --bg-card
- Borde: 1px --accent-arbitrage con 25% opacidade
- Border-radius: 16px
- Barra de progreso: 8px, border-radius 4px, fondo --bg-input, recheo --accent-arbitrage

### 3.5 Táboa de Comunidades

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  📋 As túas comunidades                                             │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ COMUNIDADE      │ UNIDADES │ CONSUMO   │ CUSTO     │ ESTADO  │  │
│  ├───────────────────────────────────────────────────────────────┤  │
│  │ Residencial     │     48   │ 12.450 kWh│ 2.105€    │ ✅ OK   │  │
│  │ Los Álamos      │          │           │           │         │  │
│  ├───────────────────────────────────────────────────────────────┤  │
│  │ Calle Mayor 15  │     12   │  4.820 kWh│   942€    │ 🔄 Anal.│  │
│  ├───────────────────────────────────────────────────────────────┤  │
│  │ Edificio        │     34   │ 15.300 kWh│ 3.420€    │ 🚨 Alert│  │
│  │ Mirador         │          │           │           │         │  │
│  ├───────────────────────────────────────────────────────────────┤  │
│  │ Urbanización    │    112   │ 22.100 kWh│ 4.280€    │ ✅ OK   │  │
│  │ Sol             │          │           │           │         │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

- Título: "📋 As túas comunidades" — 16px weight 600
- Header: fondo --bg-sidebar, 11px uppercase, --text-muted
- Filas: fondo --bg-card, hover --bg-card-hover
- Bordes: 1px --border-soft entre filas
- Estado:
  - ✅ Optimizado: badge verde con emoji
  - 🔄 Analizando: badge ámbar con emoji
  - 🚨 Alerta: badge vermello con emoji
- Padding: 16px horizontal, 14px vertical
- Hover: fondo --bg-card-hover, transición 150ms

---

## Micro-interaccións e Animacións

### Carga
- Cards: fade in + slide up (10px → 0), stagger 80ms
- Métricas: countUp animation (1.5s, ease-out)
- Gráfico: liña debuxada progresivamente (1s)

### Hover
- Cards: translateY(-2px) + border glow dourado suave, 200ms
- Botóns: brillo 110%, 150ms
- Filas táboa: fondo --bg-card-hover, 100ms
- Links: cor --accent-primary, subliñado suave

### Notificacións (Toasts)
- Posición: arriba-dereita
- Entrada: slide in dende dereita
- Fondo: --bg-card
- Borde esquerda: cor do estado (verde/ámbar/vermello)
- Border-radius: 12px
- Auto-dismiss: 4s

### Loading
- Skeleton screens con pulse suave (non spinners)
- Cor skeleton: --bg-card-hover con animación de opacidade

---

## Datos de Exemplo (Español)

### Comunidades
- Residencial Los Álamos (Madrid) — 48 unidades, 12.450 kWh, 2.105€
- Calle Mayor 15 (Barcelona) — 12 unidades, 4.820 kWh, 942€
- Edificio Mirador (Valencia) — 34 unidades, 15.300 kWh, 3.420€
- Urbanización Sol (Sevilla) — 112 unidades, 22.100 kWh, 4.280€

### Alertas
- 🚨 Edificio Mirador — Consumo +45% vs media (revisar aire acondicionado)
- 🔄 Calle Mayor 15 — Analizando oportunidade de cambio de tarifa
- ✅ Residencial Los Álamos — Optimización aplicada con éxito

### Métricas
- Total Comunidades: 12
- Consumo Mensual: 45.2k kWh (+4.2%)
- Gasto Mensual: 8.420€ (-1.5%)
- Alertas Activas: 3

---

## Notas de Implementación

1. **TAILWIND CSS** vía CDN con config personalizado
2. **Fontes:** Inter (300-600) + IBM Plex Mono desde Google Fonts
3. **Iconas:** Emojis nativos (non Material Symbols) — máis amigable
4. **Tema escuro:** `class="dark"` no `<html>`
5. **TODAS as etiquetas en ESPAÑOL (galego)**
6. **Non usar texto placeholder** — datos realistas
7. **Hover states** en todos os elementos interactivos
8. **Scroll funcional** no contido principal
9. **Responsive:** desktop-first, con breakpoints para tablet e móbil
10. **O fondo non debe ser negro puro** — usar --bg-main (#1A1B23)

---

## Checklist de Calidade

- [ ] Todo o texto en español/galego
- [ ] Saudación persoal na parte superior
- [ ] Emojis como iconas (non Material Symbols)
- [ ] Fondo cálido (non negro puro)
- [ ] Border-radius 16px en cards (redondeado, amigable)
- [ ] IBM Plex Mono para números
- [ ] Cores cálidas (dourado como primario)
- [ ] Hover states sutís e acolledores
- [ ] Táboa con emojis de estado
- [ ] Texto conversacional (non corporativo)
- [ ] Espaciado xeneroso entre elementos
- [ ] Loading states con skeleton
- [ ] Responsive (desktop, tablet, móbil)
