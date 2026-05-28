<!-- Extracted from stitch-landing-aura-v2-screen-response.json -->
---
name: EnergyOS Narrative
colors:
  surface: '#fbf9f7'
  surface-dim: '#dbdad8'
  surface-bright: '#fbf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f1'
  surface-container: '#efedeb'
  surface-container-high: '#eae8e6'
  surface-container-highest: '#e4e2e0'
  on-surface: '#1b1c1b'
  on-surface-variant: '#434844'
  inverse-surface: '#30302f'
  inverse-on-surface: '#f2f0ee'
  outline: '#737873'
  outline-variant: '#c3c8c2'
  surface-tint: '#526257'
  primary: '#17251c'
  on-primary: '#ffffff'
  primary-container: '#2c3b31'
  on-primary-container: '#94a598'
  inverse-primary: '#bacbbd'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#311d1e'
  on-tertiary: '#ffffff'
  tertiary-container: '#483233'
  on-tertiary-container: '#b89a9a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e7d8'
  primary-fixed-dim: '#bacbbd'
  on-primary-fixed: '#101f16'
  on-primary-fixed-variant: '#3b4a40'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#fddadb'
  tertiary-fixed-dim: '#e0bfbf'
  on-tertiary-fixed: '#291618'
  on-tertiary-fixed-variant: '#584142'
  background: '#fbf9f7'
  on-background: '#1b1c1b'
  surface-variant: '#e4e2e0'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-md:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 30px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Playfair Display
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
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  data-display:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: -0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  gap: 16px
  card-padding: 24px
  section-padding: 80px
  container-max-width: 1280px
---

## Brand & Style

El enfoque visual de este sistema de diseño se define como **Minimalismo Utilitario Premium**. Diseñado específicamente para gestores de apartamentos turísticos en España, el sistema busca transmitir una sensación de control absoluto, sostenibilidad institucional y eficiencia operativa. 

Inspirado en la fluidez de Aura Mobile Flow 4, el diseño prioriza la claridad de los datos energéticos a través de una estética limpia y profesional. Se aleja de los clichés tecnológicos vibrantes para abrazar una paleta orgánica y sobria que evoca la arquitectura contemporánea y la gestión responsable de recursos. La experiencia debe sentirse como una herramienta de alta precisión, pero con la elegancia de una publicación editorial de lujo.

**Principios clave:**
- **Claridad Estructural:** Eliminación de cualquier elemento decorativo superfluo.
- **Autoridad Serena:** Uso de verdes profundos para generar confianza y estabilidad.
- **Precisión Técnica:** Integración de tipografía monoespaciada para enfatizar el rigor de las mediciones de consumo.

## Colors

La paleta es estrictamente dicromática en su núcleo, apoyándose en el contraste entre el **Dark Forest Green** y el **Blanco Puro**. El color primario (`#2C3B31`) no solo actúa como tono de marca, sino también como el color principal para bordes y superficies de alto contraste, sustituyendo al negro tradicional para suavizar la interfaz sin perder fuerza.

El **Sage Green** (`#7A9E7E`) se reserva exclusivamente para acentos funcionales: estados positivos, indicadores de ahorro energético y elementos de interacción secundaria. Se prohíbe el uso de cualquier tono cálido (naranjas, púrpuras) para mantener la integridad visual del sistema "Green & White". Los textos utilizan una escala de grises fríos para garantizar la legibilidad en reportes densos.

## Typography

Este sistema de diseño utiliza un maridaje tipográfico tríadico para segmentar la información:

1.  **Playfair Display (Display/Headlines):** Aporta el carácter editorial y sofisticado. Se utiliza en grandes titulares de dashboards y secciones de bienvenida para elevar la percepción de la marca hacia un sector de hospitalidad de gama alta.
2.  **Inter (Body):** El estándar de oro para la legibilidad en interfaces SaaS. Se emplea en todos los textos de lectura, controles de formularios y descripciones.
3.  **JetBrains Mono (Labels/Data):** Crucial para el contexto de gestión energética. Se utiliza para todas las métricas numéricas (kWh, €, m3), etiquetas de estado y datos técnicos, proporcionando una alineación perfecta en tablas y gráficos.

Toda la jerarquía debe respetar el uso de mayúsculas controladas en las etiquetas (`label-md`) para acentuar el aspecto técnico.

## Layout & Spacing

El sistema se basa en una **retícula de 8px** que dicta una jerarquía espacial rigurosa. Se utiliza un modelo de **Grid Fijo** centrado para el escritorio, con un ancho máximo de 1280px para mantener la densidad de información bajo control.

**Especificaciones de layout:**
- **Márgenes y Gaps:** Se utiliza un gap estándar de 16px para elementos relacionados y 24px para la separación interna de tarjetas.
- **Secciones:** La separación vertical entre grandes bloques de contenido es de 80px, permitiendo que el diseño "respire" y se sienta premium.
- **Dashboard Grid:** Estructura de 12 columnas en escritorio con gutters de 24px. En dispositivos móviles, se transiciona a una sola columna con márgenes laterales de 16px.
- **Alineación:** Los datos numéricos deben alinearse a la derecha en tablas para facilitar la comparación rápida, utilizando siempre la fuente monoespaciada.

## Elevation & Depth

Para mantener la estética limpia y evitar el ruido visual, este sistema de diseño rechaza el uso de sombras difusas tradicionales y efectos de cristal. La profundidad se comunica exclusivamente a través de:

1.  **Capas Tonales:** El uso de superficies blancas sobre fondos de color gris muy claro (`#F9FAFB`) o viceversa.
2.  **Bordes Definidos:** Se emplea el color primario `#2C3B31` con un grosor de 1px para delimitar tarjetas y contenedores. Esto crea una estética de "plano técnico" muy estructurada.
3.  **Contraste de Superficie:** Los elementos interactivos de alto nivel pueden utilizar el fondo `Primary` con texto en `Secondary` para destacar sobre el fondo blanco general, creando una jerarquía de elevación visual sin necesidad de ejes Z físicos.

## Shapes

La gramática de formas de este sistema de diseño es geométrica y contenida. 

- **Contenedores y Tarjetas:** Utilizan un radio de curvatura de **8px**. Es lo suficientemente suave para ser moderno, pero lo suficientemente técnico para no parecer excesivamente lúdico o infantil.
- **Badges y Etiquetas de Estado:** Se definen como **Pill-shaped** (completamente redondeados). Esto crea un contraste visual inmediato con las tarjetas rectangulares, permitiendo que los estados de energía o alertas sean identificables de un vistazo.
- **Inputs y Botones:** Mantienen el estándar de 8px para consistencia con las tarjetas, reforzando la sensación de bloque sólido.

## Components

**Botones (Buttons):**
- **Primario:** Fondo `#2C3B31`, texto `#FFFFFF`, 8px de radio. Sin sombras.
- **Secundario:** Borde de 1px `#2C3B31`, texto `#2C3B31`, fondo transparente.
- **Acento:** Fondo `#7A9E7E`, texto `#FFFFFF`. Uso limitado para acciones de "ahorro" o "éxito".

**Tarjetas (Cards):**
Fondo blanco, borde de 1px en `#2C3B31`, padding interno de 24px. Los títulos de las tarjetas siempre en `headline-lg` (Playfair Display).

**Chips / Badges:**
Forma de píldora, fondo `#7A9E7E` con opacidad del 15% y texto en el mismo tono pero saturado, o fondo sólido para estados críticos. Siempre usando `label-sm` (JetBrains Mono).

**Campos de Entrada (Inputs):**
Borde inferior de 2px en `#2C3B31` o borde completo de 1px. La tipografía de entrada debe ser `body-md` (Inter), pero los valores numéricos introducidos deben cambiar a `label-md` (JetBrains Mono).

**Listas y Tablas:**
Filas separadas por líneas finas de 1px. Los encabezados de columna utilizan `label-sm` en mayúsculas. Las celdas con datos de consumo deben usar el peso `semibold` de JetBrains Mono.

**Componentes Adicionales Sugeridos:**
- **Energy Gauge:** Un indicador circular o lineal que use la paleta de verdes para mostrar la eficiencia actual del apartamento.
- **Property Switcher:** Un selector refinado con Playfair Display para alternar entre diferentes propiedades turísticas.
