# Stitch v6 — EnergyOS PRO (MODO CLARO)

## 🎯 Contexto

**EnergyOS Pro** é unha plataforma B2B de xestión enerxética para profesionais inmobiliarios en España. Estilo: **Linear meets Stripe** — premium, profesional, denso en datos.

## 🎨 Estilo Visual

### REGLAS DE OURO
- **MODO CLARO ONLY** — fondo #FAFAFA, nunca escuro
- **BORDES REAIS** — non glows de IA
- **PREMIUM** — parece Stripe/Guesty, NON startup xenérica
- **NÚMEROS CON CONTEXTO** — sempre con unidades (kWh, €)

### Paleta de Cores
```
Background:     #FAFAFA  (gris claro)
Cards:          #FFFFFF  (branco)
Bordes:         #E5E5E5  (gris suave)
Texto:          #18181B  (case negro)
Texto secundario: #71717A

Primary:        #10B981  (emerald)
Primary Hover:  #059669
Success:        #4CAF50
Warning:        #F59E0B
Danger:         #EF4444

Fincas:         #1565C0  (azul)
Apartamentos:   #F57C00  (laranxa)
Arbitraxe:     #7B1FA2  (violeta)
Asesor:        #2E7D32  (verde)
```

### Tipografía
- **Display:** Plus Jakarta Sans Bold 700
- **Body:** Inter Regular 400 / Medium 500
- **Números:** JetBrains Mono

## 📐 Layout

### Navegación Lateral (260px, fixa)
```
┌──────────────────────────┐
│ 🦎 EnergyOS              │
├──────────────────────────┤
│ 📊 Panel                │ ← activo
│ 🏢 Fincas               │
│ 🏠 Apartamentos          │
│ ⚡ Arbitraxe            │
│ 🤖 Asesor IA            │
├──────────────────────────┤
│ ⚙️ Configuración        │
└──────────────────────────┘
```

### Navegación Superior (64px)
```
[🔍 Buscar comunidades...]     [🔔 3] [MG avatar]
```

### Container
- max-width: 1280px centrado
- padding: 24px
- gap: 16px

## 🧩 Compoñentes

### MetricCard (card con KPI)
```
┌────────────────────────┐
│ Label (caption)         │
│                        │
│ 12                     │ ← metric, font-mono
│ unidades               │
│                        │
│ ↑ +2  (badge verde)   │
└────────────────────────┘

border: 1px solid #E5E5E5
border-radius: 12px
padding: 20px
bg: white
shadow: subtle (0 1px 3px rgba(0,0,0,0.05))
```

### DataTable
```
Header: bg #F4F4F5, text caption uppercase
Row: border-bottom #E5E5E5, hover bg #FAFAFA
Cell: font-mono para números
```

### Badge de Estado
```
🟢 Optimizado: bg verde claro, texto verde
🟡 Analizando: bg ámbar claro, texto ámbar
🔴 Alerta: bg vermello claro, texto vermello
```

### Button
```
Primary: bg #10B981, text white, rounded 8px
Hover: bg #059669

Secondary: bg transparent, border #E5E5E5, text #18181B
Ghost: bg transparent, text #71717A
```

## 📊 Dashboard — Panel Principal

### KPIs (grid 4 columnas)
```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│Total     │ │Consumo   │ │Coste     │ │Alertas   │
│Comunidades│ │Mensual   │ │Mensual   │ │Activas   │
│    12    │ │  45.2    │ │  8.420   │ │    3     │
│   🏢    │ │   MWh ↑  │ │    € ↓   │ │   🔔    │
│+2 este   │ │+4.2%    │ │-1.5%     │ │Atención  │
│mes       │ │          │ │          │ │          │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

### Gráfico de Consumo
```
Título: "Consumo Agregado"
Selector: [24H] [7D] [30D] — tabs
Gráfico: Area chart con gradiente emerald
Eixe Y: kWh
Eixe X: Meses
```

### Táboa de Comunidades
```
┌─────────────────────────────────────────────────────┐
│ Comunidad          │ Ciudad    │ Units│ Consumo│Coste│Estado│
├─────────────────────────────────────────────────────┤
│ Calle Mayor 15    │ Madrid    │  24  │ 2.400  │ 408€ │  🟢  │
│ Avda Galicia 42   │ Santiago  │  18  │ 1.800  │ 306€ │  🟢  │
│ Ronda Fonts 5      │ A Coruña  │  12  │ 1.200  │ 204€ │  🟡  │
└─────────────────────────────────────────────────────┘
```

### Panel Lateral dereita (300px)
```
┌──────────────────────────┐
│ 🤖 Asesor IA             │
│                          │
│ Oportunidade de aforro:  │
│                          │
│     8.500€               │ ← grande, verde
│     por ano              │
│                          │
│ [Ver Estratexia]        │
├──────────────────────────┤
│ ⚡ Arbitraxe             │
│ ● Activo                 │
│ Batería: 75%             │
│███████░░░               │
└──────────────────────────┘
```

## 🏢 Vista Fincas

### Header
```
Fincas
Xestión de comunidades de veciños

[Nova Comunidade] ← botón verde
```

### Grid de Tarxetas
```
┌─────────────────────┐ ┌─────────────────────┐
│ 🏢                  │ │ 🏢                  │
│ Calle Mayor 15      │ │ Avda Galicia 42     │
│ Madrid              │ │ Santiago            │
│ 24 unidades         │ │ 18 unidades         │
│ 2.400 kWh          │ │ 1.800 kWh           │
│ 408€/mes            │ │ 306€/mes            │
│ 🟢 Optimizado       │ │ 🟢 Optimizado       │
└─────────────────────┘ └─────────────────────┘
```

## 🏠 Vista Apartamentos

### Grid de Tarxetas
```
┌─────────────────────┐ ┌─────────────────────┐
│ 🏠                  │ │ 🏠                  │
│ Apartamento Centro  │ │ Piso Beiro          │
│ Santiago de Comp.   │ │ Avda Madrid 42      │
│ María García       │ │ sen inquilino        │
│ 320 kWh · 54€      │ │ 280 kWh · 48€      │
│ 🟢 Optimizado       │ │ 🟡 Analizando       │
└─────────────────────┘ └─────────────────────┘
```

## ⚡ Vista Arbitraxe

### Simulador
```
Configuración de Batería:
├─ Capacidade: [=====●=====] 10 kWh
├─ Potencia: [===●======] 5 kW
└─ Eficiencia: 90%

Gráfico de Prezos OMIE (24h):
[[area chart con prezos]]

Ciclos estimados: 1.2/día
ROI: 3.2 anos
Aforro anual: 1.847€
```

## 🤖 Vista Asesor IA

### Recomendador de Tarifas
```
┌─────────────────────────────────────────────┐
│ Tarifa Actual        │ Tarifa Recomendada   │
│ PVPC Indexada       │ Tarifa Fija 2.0TD    │
│ 145 €/MWh           │ 140 €/MWh           │
├─────────────────────────────────────────────┤
│ Aforro mensual: 19.50€                      │
│ Aforro anual: 234€                          │
│ Tempo de retorno: 5 meses                    │
└─────────────────────────────────────────────┘

[Cambiar Tarifa] ← botón verde
```

## 📱 Responsive

- Desktop: Sidebar visible, 4 KPIs
- Tablet: Sidebar colapsable, 2 KPIs
- Mobile: Sidebar como drawer, 1 KPI

---

## 🚨 IMPORTANTE

1. **MODO CLARO OBRIGATORIO** — fondo #FAFAFA
2. **BORDES REAIS** — border: 1px solid #E5E5E5
3. **SOMBRAS SUAVES** — shadow-sm ou shadow-md
4. **NON gradients de IA** — cores planas
5. **NÚMEROS EN MONO** — JetBrains Mono
6. **TEXTO EN ESPAÑOL/GALEGO**
7. **PREMIUM COMO STRIPE** — non startup xenérica
