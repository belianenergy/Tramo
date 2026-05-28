# EnergyOS — Landing + Dashboard para Propiedades Turísticas

## Contexto de Negocio

**Problema:** Propietarios de Airbnb con 3-10 apartamentos non saben canto gasta cada un. Descubren consumos anómalos cando chega a factura, non cando pasa.

**Solución:** Dispositivo Shelly EM instalado en cada propriedade + dashboard + alertas Telegram.

**Proposta de valor:** "Sabe o que pasa nos teus apartamentos, sen ter que ir alí."

**Diferenciador:** Non é software - é hardware instalado fisicamente.

---

## Estilo Visual — "Profissional pero Accesible"

### Paleta de Cores (Modo Claro prioritario)

```css
/* Fondos — brancos quentes, non fríos */
--bg-main: #FAFAFA;           /* Fondo principal */
--bg-card: #FFFFFF;           /* Tarxetas */
--bg-sidebar: #F5F5F3;        /* Sidebar — lixeiro tono */

 /* Bordes — suaves */
--border-soft: #E8E6E3;       /* Bordes normais */
--border-hover: #D4D1CC;      /* Hover */

/* Texto — escuro quente */
--text-main: #1A1A1A;         /* Principal */
--text-secondary: #6B6660;    /* Secundario */
--text-muted: #9B9891;        /* Desactivado */

/* Acentos */
--accent-primary: #10b981;    /* Verde esmeralda — enerxía, positivo */
--accent-primary-light: #D1FAE5;
--accent-secondary: #6366f1;  /* Indigo — tech, confianza */
--accent-warning: #f59e0b;    /* Ámbar — alertas */
--accent-error: #ef4444;      /* Vermello — problemas */
--accent-success: #22c55e;    /* Verde — ok */
```

### Tipografía

- **Principal:** Inter (Google Fonts) — pesos 400, 500, 600, 700
- **Monospace:** IBM Plex Mono — para números e métricas
- **Escala:**
  - Hero título: 48px, weight 700
  - Hero subtítulo: 20px, weight 400
  - H1: 28px, weight 600
  - H2: 20px, weight 600
  - Body: 16px, weight 400
  - Caption: 12px, weight 500

---

## ESTRUTURA: LANDING PAGE

### Hero Section

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   ⚡  EnergyOS                                                     │
│                                                                     │
│   "¿Sabes canto gastan os teus apartamentos                         │
│    cando non hai ninguén?"                                          │
│                                                                     │
│   Instálamos un dispositivo que mide o consumo en tempo real.      │
│   Se algo está encendido sen que debería, recíbes unha alerta       │
│   no teu móbil.                                                     │
│                                                                     │
│   [ Solicitar demo gratuíta ]                                       │
│                                                                     │
│   ───                                                                │
│   Xestionas propiedades turísticas?                                 │
│   Apartamentos, villas, casas rurais?                                │
│                                                                     │
│   energyos.es                                                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

- Fondo: gradiente branco → #F0FDF4 (verdoso moi suave)
- Título: 48px, weight 700, --text-main
- Subtítulo: 20px, --text-secondary
- CTA: fondo --accent-primary, texto branco, padding 16px 32px, border-radius 12px
- Imaxe: illustration de propbnb con "sensor" destacado

### Beneficios (3 columnas)

```
┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐
│                         │ │                         │ │                         │
│  📱                     │ │  🔔                     │ │  ⚡                     │
│                         │ │                         │ │                         │
│  Control desde         │ │  Alertas de             │ │  Sinxelo de            │
│  calquera sitio         │ │  consumo anómalo        │ │  instalar              │
│                         │ │                         │ │                         │
│  Ves todos os           │ │  Recíbes notificación   │ │  15 minutos,           │
│  apartamentos nunha     │ │  se algo está           │ │  sen obras.            │
│  pantalla.              │ │  gastando demais.       │ │  Só pinzas.            │
│                         │ │                         │ │                         │
└─────────────────────────┘ └─────────────────────────┘ └─────────────────────────┘
```

- Cards: fondo branco, borde 1px --border-soft, border-radius 16px, padding 28px
- Iconas: 40px, emojis
- Título: 20px weight 600
- Descripción: 16px, --text-secondary

### Social Proof

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   "Gardei 180€ no primeiro mes só cambiando os hábitos dos         │
│    hóspedes. O sistema detectou que deixaban o aire posto."        │
│                                                                     │
│   — María, propietario de 4 apartamentos en Galicia                │
│                                                                     │
│   ⭐⭐⭐⭐⭐                                                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

- Fondo: --bg-sidebar
- Texto: 18px, italic, --text-main
- Avatar: placeholder con iniciais

### Como Funciona

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   Como funciona                                                      │
│                                                                     │
│   1️⃣  Instalamos o dispositivo          2️⃣  Ves os datos          3️⃣  Recíbes alertas  │
│       no teu apartamento                     en tempo real              se algo está mal     │
│       (15 minutos)                           no teu móbil              (Telegram/WhatsApp)  │
│                                                                     │
│                              [ Solicitar demo gratuíta ]            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

- 3 pasos en horizontal
- Conectores visuais entre pasos

### Formulario de Contacto

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   Solicita unha demo gratuíta                                        │
│                                                                     │
│   Nome:        [___________________________]                         │
│                                                                     │
│   Email:       [___________________________]                         │
│                                                                     │
│   Nº propiedades:  [1-3 ▾]                                          │
│                                                                     │
│   Localidade:  [___________________________]                         │
│                                                                     │
│                     [ Solicitar demo ]                               │
│                                                                     │
│   Sen compromiso. Sen instalación sen同意.                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

- Formulario minimal
- Non pedindo todo - só o necesario para contacto
- Mensaxe de confianza abaixo

### Footer

```
┌─────────────────────────────────────────────────────────────────────┐
│   ⚡ EnergyOS                                                        │
│   Xestión intelixente para propiedades turísticas                   │
│                                                                     │
│   © 2026 EnergyOS                                                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ESTRUCTURA: DASHBOARD

### Header (64px)

```
┌─────────────────────────────────────────────────────────────────────┐
│ ⚡ EnergyOS            [🔍 Buscar propiedades...]    [🔔 2] [👤 ▾]  │
└─────────────────────────────────────────────────────────────────────┘
```

- Logo: raio emoji + "EnergyOS" en --accent-primary
- Busca: placeholder "Buscar propiedades..."
- Notificacións: badge con número
- Usuario: avatar + menú

### Sidebar (240px)

```
┌──────────────────────┐
│ ⚡ EnergyOS          │
│                      │
│  ─────────────────── │
│                      │
│  📊 Panel            │  ← Activo
│                      │
│  🏠 Propiedades      │
│     Todos            │
│     Airbnb           │
│     Villas           │
│                      │
│  🔔 Alertas          │
│                      │
│  ⚡ Arbitraxe        │
│                      │
│  🤖 Asesor IA        │
│                      │
│  ⚙️ Configuración    │
│                      │
└──────────────────────┘
```

- Fondo: --bg-sidebar
- Items activos: fondo --accent-primary-light, texto --accent-primary
- Borde dereito: 3px --accent-primary

### Panel Principal — Propiedades

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   Bos días, Mauro 👋                                               │
│   4 propiedades activas · 2 alertas esta semana                      │
│                                                                     │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│   │              │  │              │  │              │            │
│   │  Apart.      │  │  Apart.      │  │  Villa       │            │
│   │  Centro      │  │  Praia       │  │  Montaña     │            │
│   │              │  │              │  │              │            │
│   │  🟢 0.3 kWh  │  │  🔴 2.1 kWh  │  │  🟢 0.1 kWh  │            │
│   │  Normal      │  │  ANÓMALO    │  │  Normal      │            │
│   │              │  │  [Ver →]    │  │              │            │
│   └──────────────┘  └──────────────┘  └──────────────┘            │
│                                                                     │
│   + Engadir propiedade                                              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

- Grid de cards de propiedades
- Cada card mostra:
  - Nome e tipo (Airbnb/Villa/etc)
  - Consumo actual (kWh)
  - Status: verde=normal, vermello=anómalo, ámbar=verificación
  - Click → detalles

### Detalle Propiedade

```
┌─────────────────────────────────────────────────────────────────────┐
│ ← Volver a propiedades                                              │
│                                                                     │
│ 🏠 Apartamento Centro — Airbnb                                      │
│                                                                     │
│   CONSUMO ACTUAL                                                    │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │                                                              │  │
│   │   2.1 kWh/hora                    ⚠️ ANÓMALO                │  │
│   │   (normal: 0.3 kWh)               Consumo 7x superior        │  │
│   │                                                              │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│   HOXE      [7 DÍAS ●]    30 DÍAS    ANO                           │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │                                                              │  │
│   │         ████                                                  │  │
│   │    ██████████                                                │  │
│   │ ─────────────────────────────────────────────────────────    │  │
│   │                                                              │  │
│   │  00   04   08   12   16   20   24                             │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│   ALERTAS RECENTES                                                   │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │ 🔴 Hoxe 14:32 — Consumo anómalo detectado (2.1 kWh/hora)    │  │
│   │ ⚠️ Onte 23:15 — Consumo elevado (1.8 kWh/hora)              │  │
│   │ ✅ Onte 22:00 — Consumo normalizado                         │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│   CONFIGURACIÓN                                                      │
│   Alerta se consumo > [0.5] kWh/hora    [Gardar]                   │
│   Notificar por: [Telegram ▾]                                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Módulo Alertas

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   🔔 Alertas                                                         │
│                                                                     │
│   ┌─ HOXE ──────────────────────────────────────────────────────┐  │
│   │                                                               │  │
│   │  🔴 14:32  Apart. Praia    Consumo 7x normal (2.1 kWh/h)    │  │
│   │                                                               │  │
│   │  ┌─────────────────────────────────────────────────────────┐ │  │
│   │  │  Enviaste mensaxe ao hóspede: "Hola, creo que deixaches │ │  │
│   │  │  o aire acond. conectado?"                              │ │  │
│   │  │                                                [OK] ✓   │ │  │
│   │  └─────────────────────────────────────────────────────────┘ │  │
│   │                                                               │  │
│   └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│   ┌─ ONTE ───────────────────────────────────────────────────────┐  │
│   │                                                               │  │
│   │  ⚠️ 23:15  Apart. Centro   Consumo elevado (1.8 kWh/h)      │  │
│   │  ⚠️ 18:42  Villa Montaña  Consumo elevado (0.8 kWh/h)       │  │
│   │  ✅ 22:00  Apart. Praia    Resolto automaticamente            │  │
│   │                                                               │  │
│   └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

- Lista de alertas por día
- Actions: Notificar hóspede, Marcar como resolto, Ignorar

### Módulo Arbitraxe

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   ⚡ Arbitraxe                                                      │
│                                                                     │
│   Este módulo permite configurar optimización de consumo            │
│   baseada en tarifas horarias.                                      │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │                                                              │  │
│   │  Estado: En desenvolvemento                                   │  │
│   │                                                              │  │
│   │  A función de arbitraxe requerirá:                           │  │
│   │  • Batería instalada ( Roadmap Fase 3 )                     │  │
│   │  • Integración con tarifas horarias                          │  │
│   │  • Configuración adicional                                   │  │
│   │                                                              │  │
│   │  [ Notificarme cando estea dispoñible ]                      │  │
│   │                                                              │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Módulo Asesor IA

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   🤖 Asesor IA                                                      │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │                                                              │  │
│   │  Oportunidade detecteda:                                     │  │
│   │                                                              │  │
│   │  Os apartamentos Apart. Praia e Apart. Centro                │  │
│   │  teñen patróns de consumo similares. Considera               │  │
│   │  renegociar a tarifa cun fornecedor único.                    │  │
│   │                                                              │  │
│   │  Aforro potencial: 15-20%                                   │  │
│   │                                                              │  │
│   │  [ Ver detalles ]    [ Ignorar ]                             │  │
│   │                                                              │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│   Historial de recomendacións                                        │
│                                                                     │
│   • ✅ Apart. Centro — Cambio de hora punta: aforro 45€             │
│   • ✅ Villa Montaña — Tarifa fixa recomendada                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Módulo Configuración

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   ⚙️ Configuración                                                  │
│                                                                     │
│   CONTA                                                              │
│   Nome:        [Mauro________________________________]               │
│   Email:       [mauro@email.com_____________________]                │
│   Google:      [Connected ✓]                                        │
│                                                                     │
│   NOTIFICACIÓNS                                                     │
│   Telegram:   [@mauro___ ✓]                    [Cambiar]            │
│   Alertas:    [● Todos  ○ Só anómalos  ○ Desactivadas]              │
│                                                                     │
│   DISPOSITIVOS                                                       │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │ 🟢 Shelly_EM_01   Apart. Centro      Conectado    [Ver →]   │  │
│   │ 🟢 Shelly_EM_02   Apart. Praia       Conectado    [Ver →]   │  │
│   │ 🟡 Shelly_EM_03   Villa Montaña      Sen sinal   [Ver →]   │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│   [+ Engadir novo dispositivo]                                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Diseño Responsive

### Tablet (768px-1024px)
- Sidebar colapsable a icono
- Grid 2 columnas
- Cards de propiedades 2 por fila

### Móbil (<768px)
- Sidebar como menú hamburguesa
- Grid 1 columna
- Cards full width
- Touch-friendly (min 44px tap targets)

---

## Dados de Exemplo (Realistas)

### Propiedades
- Apartamento Centro (Airbnb) — Santiago de Compostela — 45m²
- Apartamento Praia (Airbnb) — Ferrol — 38m²
- Villa Montaña (Airbnb) — Ordes — 120m²
- Casa Rural Río (Rural) — Betanzos — 85m²

### Métricas
- Total propiedades: 4
- Alertas esta semana: 2
- Consumo medio: 0.4 kWh/hora
- Dispositivos conectados: 3/4

---

## Notas de Implementación

1. **Tailwind CSS** — classes utility
2. **Fontes:** Inter + IBM Plex Mono de Google Fonts
3. **Iconas:** Emojis ou Lucide React
4. **Tema claro** — fondo branco, texto escuro
5. **TODAS as etiquetas en GALEGO/ESPAÑOL**
6. **Datos realistas** — nada de "lorem ipsum"
7. **Hover states** — todos os elementos interactivos
8. **Loading states** — skeleton screens
9. **Empty states** — mensaxes amigables cando non hai datos

---

## Checklist de Calidade

- [ ] Landing con proposta de valor clara
- [ ] Hero impactante (problema + solución)
- [ ] 3 beneficios con iconas
- [ ] Testimonial real
- [ ] Formulario de demo simple
- [ ] Dashboard con sidebar e área principal
- [ ] Cards de propiedades con status
- [ ] Detalle de propiedade con gráfico
- [ ] Módulo de alertas funcional
- [ ] Módulo config con dispositivos
- [ ] Responsive (desktop, tablet, móbil)
- [ ] Loading states con skeleton
- [ ] Empty states con mensaxes amigables