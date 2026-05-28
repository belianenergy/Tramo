# Investigación de Deseño: Dashboards Enerxéticos e Inmobiliarios 2025-2026

> **Contexto:** EnergyOS é unha plataforma B2B de xestión enerxética para profesionais inmobiliarios en España. O deseño actual é demasiado "IA" (dark, frío, pouco amigable). Necesitamos un estilo máis amigable e profesional.

---

## 📊 1. Tendencias de Deseño 2025-2026

### 1.1 Movemento anti-"IA Dark Mode"
- **Problema:** Os dashboards dark mode masivo están asociados a ferramentas técnicas/frías
- **Tendencia 2025:** Movemento cara a interfaces "warm" e acolledoras
- **Datos:** Estudos de Nielsen Norman Group indican que os usuarios non técnicos prefieren fondos claros para lectura prolongada
- **Para EnergyOS:** Evitar o dark mode puro. Optar por **light mode** ou **híbrido** con toques de cor

### 1.2 "Neumorphism 2.0" / Soft UI
- Reemplaza os bordes duros por sombras suaves
- Elementos que parecen "expulsados" da superficie
- **Uso recomendado:** Tarxetas de métricas, botóns principais
- **Precaución:** Non abusear, pode reducir contraste

### 1.3 Glassmorphism Controlado
- Transparencias e efectos de desenfoque
- Moi popular en 2024-2025
- **Para EnergyOS:** Usar en paneles laterais ou headers, non en contido principal

### 1.4 Data Storytelling
- Os dashboards xa non son só números
- Narrativa visual: "O teu consumo subiu un 15% este mes"
- Gráficos con contexto e explicacións
- **Tendencia:** Integración de "insights" en linguaxe natural

### 1.5 Minimalismo Funcional
- Menos é máis
- Eliminación de elementos decorativos innecesarios
- Foco en accións e datos relevantes
- **Influencia:** Apple Design Awards 2025

---

## 🎨 2. Paletas de Cores Recomendadas

### 2.1 Análise de Plataformas Reais

| Plataforma | Esquema | Cores Principais | Sensación |
|-----------|---------|------------------|-----------|
| **Enpal** (Alemaña) | Light + Verde | Branco, verde menta, gris suave | Fresco, sostible |
| **Sense** (USA) | Light + Naranxa | Branco, naranxa vibrante, azul oscuro | Moderno, amigable |
| **Emporia** | Light + Azul | Branco, azul eléctrico, verde | Técnico pero limpo |
| **Guesty** | Light + Roxo | Branco, roxo suave, gris | Profesional, premium |
| **Buildium** | Light + Azul | Branco, azul corporativo, verde | Confiable, estable |

### 2.2 Paleta Recomendada para EnergyOS

**Opción A: "Enerxía Limpia" (Recomendada)**
```
Primary:    #2E7D32 (Verde bosque - crecemento, sostibilidade)
Secondary:  #FF8F00 (Ámbar - enerxía, alertas suaves)
Accent:     #00ACC1 (Cyan - tecnoloxía, frescura)
Background: #FAFAFA (Gris moi claro)
Surface:    #FFFFFF (Branco puro)
Text:       #212121 (Case negro)
Success:    #4CAF50 (Verde brillante)
Warning:    #FFB300 (Ámbar)
Error:      #E53935 (Vermello suave)
```

**Opción B: "Confianza Profesional"**
```
Primary:    #1565C0 (Azul corporativo)
Secondary:  #43A047 (Verde natural)
Accent:     #FF6F00 (Naranxa enerxético)
Background: #F5F5F5
Surface:    #FFFFFF
Text:       #263238
```

**Opción C: "Híbrido Warm"**
```
Primary:    #00695C (Teal)
Secondary:  #E65100 (Naranxa profundo)
Accent:     #FFD54F (Amarelo suave)
Background: #FFF8E1 (Crema moi claro)
Surface:    #FFFFFF
Text:       #3E2723
```

### 2.3 Recomendacións de Cor

1. **Evitar:** Purpuras, azules eléctricos intensos (asociados a IA/tech frío)
2. **Usar:** Verdes, teals, ámbares (natureza, enerxía, calidez)
3. **Gradientes:** Suaves e sutís (ex: verde a teal, 15% opacidade)
4. **Estados de enerxía:**
   - Baixo consumo: Verde suave
   - Consumo medio: Ámbar
   - Alto consumo: Coral (non vermello agresivo)

---

## 🔤 3. Tipografía

### 3.1 Tendencias 2025-2026

| Característica | Tendencia | Para EnergyOS |
|----------------|-----------|---------------|
| **Serif vs Sans** | Sans-serif domina | ✅ Sans-serif |
| **XeoHumanismo** | Fontes con toque humano | ✅ Recomendado |
| **Variable Fonts** | Crecemento do uso | ✅ Considerar |
| **Tamaño base** | 16px estándar | ✅ 16px |
| **Contraste** | Alto pero suave | ✅ WCAG AA |

### 3.2 Fontes Recomendadas

**Opcións Google Fonts (Gratis):**

1. **Inter** - Moderna, moi lexible, usada por Figma, GitHub
2. **Plus Jakarta Sans** - Amigable, profesional, boa para números
3. **Manrope** - Xeo-humanista, calidez sen perder profesionalismo
4. **Outfit** - Redondeada, moderna, moi amigable
5. **DM Sans** - Elegante, boa para dashboards

**Recomendación para EnergyOS:**
- **Títulos/Headings:** Plus Jakarta Sans (SemiBold, Bold)
- **Corpo/Body:** Inter (Regular, Medium)
- **Números/Datos:** Tabular figures (monospace para alineación)

### 3.3 Escala Tipográfica (Tailwind-like)

```
Hero (KPIs):     48px / 1.1 / Bold
H1:              32px / 1.2 / SemiBold
H2:              24px / 1.3 / SemiBold
H3:              20px / 1.4 / Medium
Body:            16px / 1.5 / Regular
Small:           14px / 1.5 / Regular
Caption:         12px / 1.4 / Medium
```

---

## 📐 4. Layout e Patróns de UX

### 4.1 Estrutura Recomendada (Sidebar + Main)

```
┌─────────────────────────────────────────┐
│  Logo    Buscador    Notif  Perfil      │  Header (64px)
├────────┬────────────────────────────────┤
│        │  Título + Accións              │
│  Nav   ├────────────────────────────────┤
│        │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ │
│  Menú  │  │KPI │ │KPI │ │KPI │ │KPI │ │  KPIs (120px)
│        │  └────┘ └────┘ └────┘ └────┘ │
│  icon  ├────────────────────────────────┤
│        │  ┌──────────────┐ ┌──────────┐ │
│  base  │  │   Gráfico    │ │  Lista   │ │  Contido
│        │  │   Principal  │ │  Lateral │ │  principal
│        │  └──────────────┘ └──────────┘ │
│        │  ┌──────────────────────────┐  │
│        │  │    Tabla/Detalle         │  │
│        │  └──────────────────────────┘  │
└────────┴────────────────────────────────┘
```

### 4.2 Patróns de UX para Xestores Inmobiliarios

**1. Vista de Portfolio (Propiedades)**
- Grid de tarxetas con imaxe da propiedade
- Indicadores de estado enerxético (semáforo)
- Consumo actual vs. media
- Accións rápidas (ver detalle, informe, alerta)

**2. Vista de Detalle de Propiedade**
- Header con info básica e estado global
- Pestañas: Consumo | Facturas | Dispositivos | Alertas
- Timeline de eventos
- Comparativas históricas

**3. Dashboard Principal (Home)**
- KPIs globais (consumo total, aforro, alertas)
- Gráfico de tendencia (últimos 30 días)
- Propiedades con alertas activas
- Accións rápidas

**4. Patrón "At-a-glance"**
- Información crítica en < 3 segundos
- Uso de color para indicar estado
- Iconografía clara
- Progreso visual (circular/linear)

### 4.3 Grid e Espaciado

- **Container:** max-w-7xl (1280px) centrado
- **Padding:** 24px (1.5rem) como base
- **Gap entre tarxetas:** 16px (1rem)
- **Border radius:** 12px para tarxetas, 8px para botóns
- **Sombras:** Suaves (shadow-sm, shadow-md)

---

## 🎯 5. Iconografía

### 5.1 Tendencias
- **Line icons** > Solid icons (más limpo, moderno)
- **Stroke width:** 1.5px - 2px
- **Tamaño base:** 20px-24px
- **Esquina:** Redondeada (non afilada)

### 5.2 Sets Recomendados

| Set | Estilo | Uso |
|-----|--------|-----|
| **Phosphor Icons** | Moderno, configurable | Recomendado principal |
| **Heroicons** | Limpo, consistente | Alternativa sólida |
| **Lucide** | Elegante, minimalista | Para interfaces premium |
| **Tabler Icons** | Versátil, grande colección | Opción alternativa |

### 5.3 Iconas Clave para EnergyOS

```
Propiedades:     🏠 house / building-2
Consumo:         ⚡ zap / bolt
Aforro:          💰 piggy-bank / trending-down
Alertas:         🔔 bell / alert-triangle
Facturas:        📄 file-text / receipt
Dispositivos:    🔌 plug / cpu
Sostibilidade:   🌱 leaf / tree
Reports:         📊 bar-chart-3 / pie-chart
Config:          ⚙️  settings / sliders
Usuarios:        👥 users / user-group
```

---

## ✨ 6. Micro-interaccións

### 6.1 Tendencias Efectivas 2025

| Interacción | Uso | Implementación |
|-------------|-----|----------------|
| **Hover suave** | Tarxetas, botóns | scale(1.02), shadow increase, 200ms ease |
| **Loading skeleton** | Carga de datos | Shimmer effect, non spinner |
| **Toast notifications** | Feedback | Slide-in desde arriba/dereita, auto-dismiss |
| **Number counting** | KPIs | Contador animado ao cargar |
| **Pulse** | Alertas activas | Sutil, non agresivo |
| **Progressive disclosure** | Formularios complexos | Expandir seccións |

### 6.2 Transicións Recomendadas

```css
/* Hover en tarxetas */
.card {
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

/* Botóns */
.button {
  transition: background-color 150ms ease, transform 100ms ease;
}
.button:active {
  transform: scale(0.98);
}

/* Loading */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

## ♿ 7. Accesibilidade

### 7.1 Estándares a Seguir

- **WCAG 2.1 Level AA** (mínimo)
- **WCAG 2.1 Level AAA** (ideal para lectura)
- **Diretiva Europea de Accesibilidade (EAA)** - obrigatoria en 2025

### 7.2 Checklist para EnergyOS

- [ ] Contraste 4.5:1 para texto normal
- [ ] Contraste 3:1 para texto grande (18px+)
- [ ] Focus visible en todos os elementos interactivos
- [ ] Etiquetas ARIA para gráficos complexos
- [ ] Navegación por teclado completa
- [ ] Soporte para reducir animacións (prefers-reduced-motion)
- [ ] Texto alternativo para iconas decorativas
- [ ] Tamaño de toque mínimo 44x44px (mobile)

### 7.3 Ferramentas de Testeo

- Lighthouse (Chrome DevTools)
- axe DevTools
- WAVE (Web Accessibility Evaluation Tool)
- Stark (plugin Figma)

---

## 🏢 8. Análise de Plataformas Reais

### 8.1 Enpal (Alemaña) - Solar/Enerxía
- **URL:** https://www.enpal.de
- **Estilo:** Limpo, moderno, confiable
- **Cores:** Verde menta, branco, gris
- **Fortalezas:**
  - Dashboard claro con métricas grandes
  - Uso de iconas simples
  - Progreso visual para aforro
- **Para EnergyOS:** Adoptar o verde como cor primaria, layouts limpos

### 8.2 Sense (USA) - Monitoreo Residencial
- **URL:** https://sense.com
- **Estilo:** Tecnolóxico pero amigable
- **Cores:** Naranxa, azul escuro, branco
- **Fortalezas:**
  - Visualización de dispositivos en tempo real
  - Gráficos de ondas/timeline
  - Comparativas intuitivas
- **Para EnergyOS:** Gráficos de timeline, comparativas históricas

### 8.3 Emporia (USA) - Gestión Enerxética
- **URL:** https://www.emporiaenergy.com
- **Estilo:** Técnico pero accesible
- **Cores:** Azul, verde, gris
- **Fortalezas:**
  - Vista de dispositivos por categoría
  - Alertas configurables
  - Interface responsive
- **Para EnergyOS:** Categorización de dispositivos, sistema de alertas

### 8.4 Guesty (Israel) - Xestión de Alugueres
- **URL:** https://www.guesty.com
- **Estilo:** Profesional, premium
- **Cores:** Roxo suave, branco, gris
- **Fortalezas:**
  - Multi-propiedade
  - Calendario integrado
  - Automatizacións
- **Para EnergyOS:** Vista multi-propiedade, automatizacións

### 8.5 Buildium (USA) - Xestión Inmobiliaria
- **URL:** https://www.buildium.com
- **Estilo:** Confiable, estable
- **Cores:** Azul corporativo, verde, branco
- **Fortalezas:**
  - Navegación clara
  - Informes detallados
  - Xestión de documentos
- **Para EnergyOS:** Navegación, sistema de informes

---

## 🛠️ 9. Frameworks de Deseño

### 9.1 Material Design 3 (M3)

**Fortalezas:**
- Sistema de deseño maduro
- Bo soporte para componentes
- Personalización de cores (Material Theme Builder)

**Para EnergyOS:**
- Usar como base pero **personalizar cores**
- Evitar o azul/indigo por defecto
- Adaptar border-radius (M3 usa 12px, axeitar a 8-12px)

**URL:** https://m3.material.io

### 9.2 Apple Human Interface Guidelines

**Fortalezas:**
- Enfoque en claridade
- Tipografía sistema (San Francisco)
- Interaccións naturais

**Para EnergyOS:**
- Adoptar principios de claridade
- Referencia para animacións
- Non directamente aplicable a web

**URL:** https://developer.apple.com/design/human-interface-guidelines

### 9.3 Tailwind UI

**Fortalezas:**
- Componentes listos para usar
- Totalmente personalizable
- Enfoque utility-first

**Para EnergyOS:**
- Excelente base para desenvolvemento rápido
- Fácil de personalizar cores
- Buena documentación

**URL:** https://tailwindui.com

### 9.4 shadcn/ui

**Fortalezas:**
- Componentes copiables (non dependencia)
- Baseado en Radix UI (accesible)
- Integración con Tailwind

**Para EnergyOS:**
- **Recomendado** para Next.js
- Total control sobre estilos
- Accesible por defecto

**URL:** https://ui.shadcn.com

---

## 📦 10. Recomendacións Concretas para EnergyOS

### 10.1 Paleta Final Recomendada

```javascript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',  // Principal
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
        },
        secondary: {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#ffc107',  // Ámbar
          600: '#ffb300',
          700: '#ffa000',
          800: '#ff8f00',
          900: '#ff6f00',
        },
        accent: {
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4',  // Cyan
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
        },
        surface: '#ffffff',
        background: '#fafafa',
        foreground: '#212121',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.08)',
      },
    },
  },
}
```

### 10.2 Arquitectura de Componentes

```
app/
├── components/
│   ├── ui/              # shadcn/ui base
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── PageContainer.tsx
│   ├── dashboard/
│   │   ├── KpiCard.tsx
│   │   ├── EnergyChart.tsx
│   │   ├── PropertyGrid.tsx
│   │   └── AlertBadge.tsx
│   ├── properties/
│   │   ├── PropertyCard.tsx
│   │   ├── PropertyDetail.tsx
│   │   └── DeviceList.tsx
│   └── shared/
│       ├── StatusIndicator.tsx
│       ├── DateRangePicker.tsx
│       └── DataTable.tsx
```

### 10.3 Principios de Deseño para EnergyOS

1. **Claridade ante todo**
   - Os números deben ser lexibles a 1m de distancia
   - Estados claros con cor + icona + texto

2. **Progresión lóxica**
   - Vista xeral → Detalle → Acción
   - Non sobrecargar con datos

3. **Contexto enerxético**
   - Mostrar sempre a unidade (kWh, €, CO2)
   - Comparativas temporais (vs mes anterior, vs ano)
   - Indicadores de tendencia (↗️ ↘️ ➡️)

4. **Amabilidade profesional**
   - Sorriso no deseño: bordes redondeados, cores cálidas
   - Non intimidar con datos técnicos
   - Linguaxe clara: "Aforraches 45€ este mes" vs "Delta -12.3%"

5. **Responsive por defecto**
   - Mobile-first para consultas rápidas
   - Desktop para análise detallada
   - Tablet para uso en campo

---

## 📚 11. Recursos e Referencias

### Repositorios de Referencia (GitHub)

1. **dataviz** (edward-designer)
   - Dashboard para Octopus Energy
   - React + D3 + TypeScript
   - https://github.com/edward-designer/dataviz

2. **BrightFlow** (mkmuniz)
   - Xestión de facturas enerxéticas
   - Next.js + Prisma + AWS
   - https://github.com/mkmuniz/BrightFlow

3. **mern-yariga-dashboard** (ladunjexa-pbl)
   - Dashboard inmobiliario con Refine
   - React + Material-UI
   - https://github.com/ladunjexa-pbl/mern-yariga-dashboard

4. **material-kit-react** (devias-io)
   - Template dashboard Material UI
   - 5.5k+ stars
   - https://github.com/devias-io/material-kit-react

### Artigos e Recursos

- Nielsen Norman Group - Dashboard Design Guidelines
- Material Design 3 - https://m3.material.io
- Tailwind CSS - https://tailwindcss.com
- shadcn/ui - https://ui.shadcn.com
- Phosphor Icons - https://phosphoricons.com
- WCAG 2.1 - https://www.w3.org/WAI/WCAG21/quickref/

---

## 🎯 12. Conclusións e Próximos Pasos

### O que cambiar no deseño actual de EnergyOS

1. **De Dark a Light:** Cambiar a fondo claro (#FAFAFA) con tarxetas brancas
2. **Cor primaria:** Verde (#4CAF50) en vez de azul/púrpura
3. **Tipografía:** Inter + Plus Jakarta Sans
4. **Border radius:** Aumentar a 8-12px para suavizar
5. **Iconografía:** Migrar a Phosphor Icons (stroke 1.5px)
6. **Micro-interaccións:** Engadir hover states, loading skeletons
7. **Layout:** Sidebar fixo + contido scrollable
8. **KPIs:** Números grandes con contexto e tendencias

### Checklist de Implementación

- [ ] Actualizar tailwind.config.ts con nova paleta
- [ ] Instalar e configurar fontes (Inter, Plus Jakarta Sans)
- [ ] Instalar Phosphor Icons
- [ ] Crear componentes base (Card, Button, Badge)
- [ ] Redeseñar vista de dashboard principal
- [ ] Redeseñar vista de propiedades
- [ ] Implementar micro-interaccións
- [ ] Test de accesibilidade (Lighthouse)
- [ ] Test responsive (mobile, tablet, desktop)

---

*Documento xerado: 2025-05-06*
*Próxima revisión: 2025-08-06*
