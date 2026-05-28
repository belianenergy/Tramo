<!-- Extracted from stitch-mvp-v4-config-response.json -->
---
name: EnergyOS
colors:
  surface: '#f4fbf4'
  surface-dim: '#d4dcd5'
  surface-bright: '#f4fbf4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef6ee'
  surface-container: '#e8f0e9'
  surface-container-high: '#e3eae3'
  surface-container-highest: '#dde4dd'
  on-surface: '#161d19'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#2b322d'
  inverse-on-surface: '#ebf3eb'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
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
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3af'
  on-tertiary-fixed: '#410005'
  on-tertiary-fixed-variant: '#842225'
  background: '#f4fbf4'
  on-background: '#161d19'
  surface-variant: '#dde4dd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  data-display:
    fontFamily: JetBrains Mono
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
  data-table:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  data-id:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin: 32px
---

## Estilo e Personalidade da Marca
Este sistema de deseño proxecta unha imaxe de precisión, eficiencia e control tecnolóxico. O obxectivo é transmitir fiabilidade aos propietarios de inmobles a través dunha interface limpa e utilitaria que prioriza a lexibilidade dos datos en tempo real e o estado do hardware.

A estética segue un modelo **SaaS Moderno**, caracterizado polo uso xeneroso do espazo en branco, unha xerarquía visual clara e unha paleta de cores funcional que guía a atención do usuario cara aos indicadores de rendemento enerxético. A experiencia debe sentirse profesional, robusta e orientada á acción inmediata.

## Cores
A paleta está deseñada para comunicar o estado do sistema de forma intuitiva:

- **Primaria (Verde Esmeralda):** Utilízase para accións principais e para indicar estados de eficiencia e "Funcionamento correcto".
- **Secundaria (Índigo):** Representa a infraestrutura tecnolóxica e os dispositivos de hardware.
- **Aviso (Ámbar):** Reservado para alertar sobre consumos elevados ou picos de demanda.
- **Erro (Vermello):** Indica anomalías críticas, fallos de conexión ou avarías.
- **Neutras:** O fondo gris moi claro (#FAFAFA) e as superficies brancas crean un contraste suave que reduce a fatiga visual durante a monitorización prolongada.

## Tipografía
O sistema utiliza unha estratexia de fonte dual para separar o contexto administrativo dos datos técnicos:

1.  **Inter:** A fonte principal para toda a interface de usuario, navegación e textos explicativos. Proporciona unha legibilidade excelente en pantallas dixitais.
2.  **JetBrains Mono:** Utilízase exclusivamente para valores numéricos, métricas de consumo (kWh, kW, €) e identificadores de dispositivos. O seu deseño monospaciado garante que as cifras estean sempre aliñadas, facilitando a comparación rápida de datos en gráficas e táboas.

Para dispositivos móbiles, os tamaños `display-lg` e `headline-lg` deben reducirse nun 20% para manter a proporción visual.

## Deseño e Espazado
Este sistema de deseño implementa unha **grid fluída de 12 columnas** para escritorio e unha grid de **4 columnas** para dispositivos móbiles. 

A filosofía de espazado baséase nunha unidade base de **8px**, o que crea un ritmo visual consistente. Priorízase o "aire" entre compoñentes para evitar a saturación de información, especialmente en paneis de control (dashboards) densos en datos. As tarxetas de información deben empregar un padding interno de polo menos `md` (24px) para asegurar a claridade.

## Elevación e Profundidade
A xerarquía visual conséguese mediante o uso de capas tonais e sombras sutís, evitando efectos dramáticos que poidan distraer da análise de datos:

- **Nivel 0 (Fondo):** #FAFAFA, a base sobre a que descansa todo o contido.
- **Nivel 1 (Tarxetas/Cards):** Branco (#FFFFFF) con un bordo de 1px en #E5E5E5.
- **Nivel 2 (Elevación suave):** Para elementos interactivos ou estados "hover", aplícase unha sombra suave: `0px 4px 12px rgba(0, 0, 0, 0.05)`.
- **Nivel 3 (Modais/Menus):** Unha sombra máis definida para separar o elemento do plano principal: `0px 12px 24px rgba(0, 0, 0, 0.08)`.

Non se utilizan gradientes complexos nin efectos de cristal (glassmorphism) para manter o foco na integridade da información.

## Formas
O sistema de formas busca un equilibrio entre a modernidade do software e a solidez do hardware:

- **Contedores e Tarxetas:** Teñen un radio de curvatura de **12px**, o que suaviza a interface sen perder o aspecto estruturado.
- **Compoñentes Interactivos:** Os botóns, campos de entrada e chips utilizan un radio de **8px**, comunicando claramente a súa función como elementos accionables.
- **Elementos de Estado:** As etiquetas de estado pequenas poden chegar a ser circulares (pill-shaped) para unha identificación rápida.

## Compoñentes

### Botóns
- **Primarios:** Fondo Verde Esmeralda con texto branco. Radio de 8px.
- **Secundarios:** Fondo branco con bordo #E5E5E5 e texto #1A1A1A.
- **De Datos:** Botóns pequenos en JetBrains Mono para filtros técnicos ou selección de intervalos de tempo.

### Tarxetas (Cards)
Son a unidade básica de información. Deben incluír sempre un título claro na parte superior esquerda e, se o dato é crítico, un indicador de cor no bordo lateral (por exemplo, unha liña vermella de 4px se hai un erro no dispositivo).

### Gráficas e Visualización
As liñas de tendencia deben usar a cor Primaria (eficiencia) ou Secundaria (tecnoloxía). As áreas de perigo en gráficas de consumo deben sombrearse en Ámbar.

### Campos de Entrada (Inputs)
Fondo branco, bordo #E5E5E5, radio de 8px. O estado "focus" destaca cun bordo de 2px na cor Secundaria (Índigo).

### Badges de Estado
Etiquetas compactas con fondo semitransparente da cor de estado (ex. Verde ao 10% de opacidade) e texto na cor sólida para garantir o contraste.
