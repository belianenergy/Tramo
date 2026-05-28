<!-- Extracted from stitch-apartamentos.json -->
---
name: EnergyOS Design System
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#2b6954'
  on-secondary: '#ffffff'
  secondary-container: '#adedd3'
  on-secondary-container: '#306d58'
  tertiary: '#a43a3a'
  on-tertiary: '#ffffff'
  tertiary-container: '#fc7c78'
  on-tertiary-container: '#711419'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#b0f0d6'
  secondary-fixed-dim: '#95d3ba'
  on-secondary-fixed: '#002117'
  on-secondary-fixed-variant: '#0b513d'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3af'
  on-tertiary-fixed: '#410005'
  on-tertiary-fixed-variant: '#842225'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  data-lg:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.2'
  data-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1440px
  gutter: 24px
---

## Marca y Estilo

El sistema de diseño está concebido para proyectar precisión, sostenibilidad y eficiencia operativa. La personalidad de la marca es **Profesional-Tecnológica**, diseñada para gestores de energía que requieren claridad inmediata en entornos de datos complejos.

Inspirado en la estética de Stripe y Linear, este sistema utiliza un enfoque de **Minimalismo de Alta Fidelidad**. Se basa en la pureza de las superficies blancas, una paleta técnica restringida y una ejecución tipográfica rigurosa. La interfaz debe sentirse ligera pero estructuralmente sólida, comunicando confianza a través del orden visual y el uso generoso del espacio en blanco. El objetivo emocional es transformar la complejidad de la gestión energética en una experiencia de control serena y ultra-legible.

## Colores

La paleta está optimizada para la legibilidad de datos y la fatiga visual reducida en jornadas laborales extensas.

- **Primario (Emerald Green):** Reservado exclusivamente para acciones principales, estados de éxito y indicadores de "energía limpia". Su uso debe ser quirúrgico para mantener su impacto.
- **Superficies:** Se utiliza un fondo `#FAFAFA` para definir el lienzo principal, mientras que las tarjetas y contenedores utilizan `#FFFFFF` para elevar la información sobre el fondo.
- **Bordes:** Un gris suave `#E5E5E5` define la estructura sin segmentar visualmente el espacio de forma agresiva.
- **Semántica:**
    - **Éxito:** Emerald 500 (#10B981).
    - **Atención:** Amber 500 (#F59E0B).
    - **Error:** Rose 500 (#F43F5E).
    - **Texto Principal:** Slate 900 (#0F172A).

## Tipografía

El sistema emplea una jerarquía tripartita para maximizar la claridad funcional:

1.  **Plus Jakarta Sans (Títulos):** Aporta un carácter moderno y profesional. Debe usarse con pesos bold para establecer anclas visuales claras en el dashboard.
2.  **Inter (Cuerpo):** Elegida por su neutralidad y excelente legibilidad en pantallas de alta densidad. Se utiliza para toda la interfaz narrativa y controles de formulario.
3.  **JetBrains Mono (Datos):** Crucial para la visualización de métricas energéticas, consumos de kWh y marcas de tiempo. Al ser monoespaciada, permite comparar cifras verticalmente en tablas y gráficas sin desalineaciones visuales.

*Nota: Para dispositivos móviles, `display-lg` se reduce a 32px y `headline-lg` a 24px para evitar desbordamientos.*

## Layout & Spacing

Este sistema utiliza una **rejilla fluida de 12 columnas** con una base de 8px para el ritmo vertical.

- **Márgenes y Gutter:** Se establece un gutter estándar de 24px (`lg`) para permitir que la información "respire".
- **Estructura de Página:** Las vistas principales utilizan un diseño de panel lateral (Sidebar) fijo de 280px y un área de contenido que se expande hasta un máximo de 1440px.
- **Densidad:** En pantallas de gestión de datos pesados, se permite el uso de espaciado `sm` (8px) para agrupar elementos relacionados, mientras que para la separación de secciones principales se prefiere `2xl` (48px).
- **Adaptabilidad:** En móviles, la rejilla se reduce a 4 columnas con márgenes laterales de 16px. El espaciado `3xl` se colapsa a `xl` para optimizar el espacio vertical.

## Elevación y Profundidad

La profundidad se comunica mediante una combinación de capas tonales y sombras ambientales extremadamente sutiles, evitando el ruido visual.

- **Nivel 0 (Fondo):** `#FAFAFA`. Plano de base.
- **Nivel 1 (Tarjetas/Superficies):** `#FFFFFF` con un borde de 1px `#E5E5E5`.
- **Nivel 2 (Modales/Popovers):** `#FFFFFF` con una sombra suave: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`.
- **Interacción:** Los estados *hover* en tarjetas no deben usar sombras agresivas, sino un cambio sutil en el color del borde a un gris más oscuro o una sombra de elevación mínima (2px).

El uso de desenfoques de fondo (backdrop-filter) se reserva para barras de navegación superiores pegadas (sticky), permitiendo que el contenido fluya por debajo visualmente.

## Formas

El lenguaje visual de las formas es **Redondeado (Rounded)**, equilibrando la seriedad industrial con la modernidad del software premium.

- **Componentes Estándar:** Botones, inputs y tarjetas utilizan un radio de 8px (`0.5rem`).
- **Contenedores Mayores:** Los diálogos y secciones principales del dashboard pueden escalar hasta 16px (`1rem`) para enfatizar la contención de datos.
- **Elementos de Identidad:** Los avatares y algunos estados de estado (badges) pueden ser circulares para contrastar con la estructura ortogonal del sistema.

## Componentes

### Botones
- **Primario:** Fondo Emerald Green #10B981, texto blanco. Sin degradados.
- **Secundario:** Fondo blanco, borde #E5E5E5, texto Slate 900.
- **Efecto:** Transición de 200ms en el color de fondo al hacer hover.

### Campos de Entrada (Inputs)
- Borde de 1px #E5E5E5, fondo blanco, radio de 8px.
- Focus: Borde Emerald Green #10B981 con un anillo de resplandor sutil (ring) de 3px con 10% de opacidad.
- Tipografía: Inter para el texto de entrada, JetBrains Mono para valores numéricos.

### Tarjetas (Cards)
- Fondo blanco, borde #E5E5E5, padding de 24px.
- Encabezados de tarjeta: Línea divisoria de 1px que separa el título del contenido.

### Gráficos de Datos
- Las líneas de tendencia deben usar el verde esmeralda para valores positivos y un gris medio para comparativas históricas.
- Uso de JetBrains Mono para los ejes X/Y y tooltips de datos.

### Badges (Indicadores de Estado)
- Pequeños contenedores con texto en mayúsculas (label-caps).
- Estilo "soft": Fondo con 10% de opacidad del color semántico y texto con 100% de opacidad (ej. Fondo verde claro, texto verde oscuro).

### Tablas de Datos
- Filas con altura mínima de 48px para asegurar la legibilidad.
- Alineación numérica a la derecha usando JetBrains Mono para facilitar la comparación de magnitudes de energía.
