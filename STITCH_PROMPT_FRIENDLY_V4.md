# EnergyOS — Landing + Dashboard (v4)

## Contexto

**Misión:** Crear un MVP completo para captar clientes que paguen por xestión enerxética de propiedades turísticas.

**Proposta de valor:** "Sabe o que pasa nos teus apartamentos, sen ter que ir alí."

**Diferenciador:** Hardware Shelly EM instalado + dashboard + alertas. Non é só software.

---

## Estilo Visual — "Profissional e Accesible"

### Paleta de Cores (Modo CLARO)

```css
/* Fondos */
--bg-main: #FAFAFA;
--bg-card: #FFFFFF;
--bg-sidebar: #F5F5F3;

/* Bordes */
--border-soft: #E8E6E3;
--border-hover: #D4D1CC;

/* Texto */
--text-main: #1A1A1A;
--text-secondary: #6B6660;
--text-muted: #9B9891;

/* Acentos */
--accent-primary: #10b981;     /* Verde esmeralda */
--accent-secondary: #6366f1;   /* Indigo */
--accent-warning: #f59e0b;      /* Ámbar */
--accent-error: #ef4444;       /* Vermello */
--accent-success: #22c55e;     /* Verde */
```

### Tipografía
- Inter (400, 500, 600, 700) + IBM Plex Mono

---

## PÁXINA 1: LANDING PAGE

### Hero
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
│   energyos.es                                                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```
- Fondo: branco con gradiente sutil verdoso
- Título hero: 48px, bold
- CTA: verde esmeralda, branco, redondeado

### 3 Beneficios
```
┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐
│  📱                     │ │  🔔                     │ │  ⚡                     │
│  Control desde          │ │  Alertas de             │ │  Sinxelo de            │
│  calquera sitio         │ │  consumo anómalo        │ │  instalar              │
│                         │ │                         │ │                         │
│  Ves todos os           │ │  Recíbes notificación   │ │  15 minutos,           │
│  apartamentos nunha     │ │  se algo está           │ │  sen obras.            │
│  pantalla.              │ │  gastando demais.       │ │  Só pinzas.            │
└─────────────────────────┘ └─────────────────────────┘ └─────────────────────────┘
```

### Testimonial
```
┌─────────────────────────────────────────────────────────────────────┐
│   "Gardei 180€ no primeiro mes só cambiando os hábitos dos         │
│    hóspedes. O sistema detectou que deixaban o aire posto."        │
│                                                                     │
│   — María, propietario de 4 apartamentos en Galicia                │
│   ⭐⭐⭐⭐⭐                                                          │
└─────────────────────────────────────────────────────────────────────┘
```

### Como Funciona
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   1️⃣  Instalamos o dispositivo      2️⃣  Ves os datos           3️⃣  Recíbes alertas  │
│       no teu apartamento                  en tempo real               se algo está mal     │
│       (15 minutos)                        no teu móbil                 (Telegram)           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Formulario
```
┌─────────────────────────────────────────────────────────────────────┐
│   Solicita unha demo gratuíta                                        │
│                                                                     │
│   Nome:        [___________________________]                         │
│   Email:       [___________________________]                         │
│   Nº propiedades:  [1-3 ▾]                                          │
│   Localidade:  [___________________________]                         │
│                                                                     │
│                     [ Solicitar demo ]                               │
│                                                                     │
│   Sen compromiso.                                                   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## PÁXINA 2: DASHBOARD

### Header
```
┌─────────────────────────────────────────────────────────────────────┐
│ ⚡ EnergyOS            [🔍 Buscar propiedades...]    [🔔 2] [👤 ▾]  │
└─────────────────────────────────────────────────────────────────────┘
```

### Sidebar
```
┌──────────────────────┐
│ ⚡ EnergyOS          │
│                      │
│  ─────────────────── │
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

### Panel Principal
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   Bos días, Mauro 👋                                               │
│   4 propiedades activas · 2 alertas esta semana                      │
│                                                                     │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│   │ 🟢 Apart.    │  │ 🔴 Apart.    │  │ 🟢 Villa     │            │
│   │    Centro    │  │    Praia     │  │    Montaña   │            │
│   │              │  │              │  │              │            │
│   │  0.3 kWh     │  │  2.1 kWh     │  │  0.1 kWh     │            │
│   │  Normal      │  │  ANÓMALO    │  │  Normal      │            │
│   │              │  │  [Ver →]   │  │              │            │
│   └──────────────┘  └──────────────┘  └──────────────┘            │
│                                                                     │
│   + Engadir propiedade                                              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Detalle Propiedade
```
┌─────────────────────────────────────────────────────────────────────┐
│ ← Volver                                                          │
│                                                                     │
│ 🏠 Apartamento Centro — Airbnb                                      │
│                                                                     │
│   CONSUMO ACTUAL                                                    │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │   2.1 kWh/hora              ⚠️ ANÓMALO                      │  │
│   │   (normal: 0.3 kWh)         Consumo 7x superior             │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│   HOXE      [7 DÍAS ●]    30 DÍAS    ANO                           │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │         ████                                                  │  │
│   │    ██████████                                                 │  │
│   │ ─────────────────────────────────────────────────────────    │  │
│   │  00   04   08   12   16   20   24                             │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│   ALERTAS RECENTES                                                   │
│   🔴 Hoxe 14:32 — Consumo anómalo detectado                        │
│   ⚠️ Onte 23:15 — Consumo elevado                                  │
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
│   🔔 Alertas                                                         │
│                                                                     │
│   ┌─ HOXE ──────────────────────────────────────────────────────┐  │
│   │  🔴 14:32  Apart. Praia    Consumo 7x normal                │  │
│   │     [Enviar mensaxe ao hóspede]  [Marcar resolto]           │  │
│   └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│   ┌─ ONTE ───────────────────────────────────────────────────────┐  │
│   │  ⚠️ 23:15  Apart. Centro   Consumo elevado                   │  │
│   │  ✅ 22:00  Apart. Praia    Resolto automaticamente          │  │
│   └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### Módulo Config
```
┌─────────────────────────────────────────────────────────────────────┐
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

## Implementación

1. **Tailwind CSS** — classes utility
2. **Inter + IBM Plex Mono** — Google Fonts
3. **Lucide React** — iconas
4. **Tema claro** — fondo branco
5. **Galego/Español** — todo o texto
6. **Skeleton loading** — estados de carga
7. **Responsive** — desktop, tablet, móbil

---

## Datos de exemplo

- Apartamento Centro (Airbnb) — Santiago — 45m²
- Apartamento Praia (Airbnb) — Ferrol — 38m²  
- Villa Montaña (Airbnb) — Ordes — 120m²
- Casa Rural Río (Rural) — Betanzos — 85m²

Consumo normal: 0.2-0.4 kWh/hora
Alertas activas: 2

---

## Resumo do MVP

| Elemento | Descripción |
|----------|-------------|
| Landing | Hero + 3 beneficios + testimonial + formulario |
| Auth | Google OAuth |
| Dashboard | Panel propiedades + detalle + alertas |
| Módulos | 5: Panel, Propiedades, Alertas, Arbitraxe, Config |
| API | Datos reais de Shelly (ou mock) |
| Deploy | Vercel (gratis) |

**Non vai no MVP:** Arbitraxe real con baterías, Datadis, facturas