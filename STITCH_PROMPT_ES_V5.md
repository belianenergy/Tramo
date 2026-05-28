# EnergyOS Dashboard — Prompt para Stitch v5 (CASTELÁN, CAPTACIÓN LEADS HW)

## Contexto do Proxecto

**EnergyOS Pro** é unha plataforma B2B de xestión enerxética para profesionais inmobiliarios en **España**.

### Dobre mercado:
1. **🏢 Fincas (Comunidades)** — Reparto de gastos, cálculo de coeficientes, monitorización de zonas comúns
2. **🏠 Apartamentos (Alquileres)** — Seguimiento por unidad, alertas a inquilinos, gestión multi-contrato

### Funcionalidades:
3. **⚡ Asesor Energético IA** — Recomienda tarifas óptimas, calcula ahorros exactos
4. **🔋 Simulador de Arbitraje de Baterías** — Datos OMIE en tiempo real + dimensionamiento IA de baterías
5. **📊 Datadis** — Datos de consumo por CUPS vía API (autorización electrónica)
6. **🔌 Monitorización en tiempo real** — Captación de leads para hardware Shelly EM

## Sistema de Diseño — ESTILO AMIGABLE (No "IA")

### Filosofía de diseño:
- **Profesional pero amigable** — No frío/IA, sino cálido y accesible
- **Datos densos pero legibles** — Cada número tiene contexto
- **Acción inmediata** — El usuario sabe qué hacer en 3 segundos
- **Referencias:** Guesty (SaaS inmobiliario), Stripe (financiero confiable), Enpal (energía positiva)

### Colores — PALETA CÁLIDA (No dark mode puro):
- **Fondo principal:** #FAFAFA (gris muy claro, NO negro)
- **Fondo tarjetas:** #FFFFFF (blanco puro)
- **Bordes:** #E0E0E0 (gris suave)
- **Texto principal:** #212121 (casi negro)
- **Texto secundario:** #757575 (gris medio)
- **Primario (Energía):** #2E7D32 (verde bosque — crecimiento, sostenibilidad)
- **Secundario (Alertas):** #FF8F00 (ámbar — energía, alertas suaves)
- **Acento (Tecnología):** #00ACC1 (cyan — frescura, innovación)
- **Fincas:** #1565C0 (azul corporativo)
- **Apartamentos:** #F57C00 (naranja cálido)
- **Arbitraje:** #7B1FA2 (violeta suave)
- **Asesor:** #2E7D32 (verde bosque)
- **Éxito:** #4CAF50 (verde brillante)
- **Alerta:** #FFB300 (ámbar)
- **Error:** #E53935 (rojo suave)

### Tipografía:
- **Títulos:** Plus Jakarta Sans (SemiBold, Bold) — amigable, profesional
- **Cuerpo:** Inter (Regular, Medium) — moderna, legible
- **Números/Datos:** Tabular figures (monospace para alineación)

### Espaciado:
- **Container:** max-w-7xl (1280px) centrado
- **Padding:** 24px como base
- **Gap entre tarjetas:** 16px
- **Border radius:** 12px para tarjetas, 8px para botones
- **Sombras:** Suaves (shadow-sm, shadow-md)

## Solicitud

Crea una interfaz de dashboard premium en modo CLARO para EnergyOS Pro.

### Estructura:

**Navegación superior (64px):**
- Logo "EnergyOS" a la izquierda
- Buscador global al centro "Buscar comunidad..."
- Notificaciones (badge) + Avatar de usuario a la dereita

**Barra lateral (260px, colapsable):**
- **📊 Panel** (activo por defecto)
- **🏢 Fincas**
  - Panel de fincas
  - Comunidades
  - Reparto de gastos
  - Informes
- **🏠 Apartamentos**
  - Panel de apartamentos
  - Propiedades
  - Inquilinos
  - Alertas
- **⚡ Arbitraje**
- **🤖 Asesor**
- ---
- **⚙️ Configuración**
- **❓ Ayuda**
- **🚪 Cerrar sesión**

### 1. Panel Principal (Dashboard)

**Fila de KPIs (4 tarjetas):**
- **Total Comunidades:** 12 (con icono de edificio, color azul)
- **kWh Mensual:** 45.2k (con tendencia ↑ +4.2% en verde)
- **Coste Mensual:** 8.420€ (con tendencia ↓ -1.5% en verde)
- **Alertas Activas:** 3 (con badge ámbar)

**Gráfico de Consumo Agregado:**
- Título: "Consumo Agregado"
- Subtítulo: "Análisis histórico de kWh"
- Selector de período: 24H | 7D | 30D (tabs)
- Gráfico de área con gradiente verde suave

**Listado de Comunidades (tabla):**
- Columnas: Nombre, Unidades, Consumo (kWh), Coste (€), Estado
- Estados: 🟢 Optimizado, 🟡 Analizando, 🔴 Alerta

**Panel lateral derecho (320px):**

**Asesor IA:**
- Texto: "Detectó una oportunidad de ahorro optimizando la potencia contratada"
- **Ahorro Estimado: 8.500€/año** (número grande verde)
- Botón: "Ver Estrategia" (verde)

**Arbitraje:**
- Badge: "Activo" (verde)
- Texto: "Exceso de reactiva detectado en Calle Mayor 15"
- Barra de progreso: 75%

**Captación de Leads Shelly (SECCIÓN CLAVE):**
- Título: "🔌 Monitorización en Tiempo Real"
- Subtítulo: "Instala un medidor de consumo y obtén datos precisos"
- Icono de medidor Shelly EM
- Beneficios:
  - "Datos cada segundo, no una vez al mes"
  - "Detección de anomalías instantánea"
  - "Optimización de tarifas en tiempo real"
- Precio indicativo: "Desde 49€ + instalación"
- CTA: "Solicitar Presupuesto" (botón verde grande)
- Badge: "Popular" (ámbar)

### 2. Vista de Fincas (separada)

**Header:**
- Título: "Fincas"
- Subtítulo: "Gestión de comunidades de vecinos"
- Botón: "Nueva Comunidad" (verde)

**Grid de tarjetas de fincas:**
- Cada tarjeta muestra:
  - Nombre de la comunidad
  - Número de unidades
  - Consumo total (kWh)
  - Coste mensual (€)
  - Estado (semáforo)
  - Acciones rápidas

### 3. Vista de Apartamentos (separada)

**Header:**
- Título: "Apartamentos"
- Subtítulo: "Gestión de propiedades de alquiler"
- Botón: "Nueva Propiedad" (naranja)

**Grid de tarjetas de apartamentos:**
- Cada tarjeta muestra:
  - Nombre/dirección
  - Inquilino actual
  - Consumo (kWh)
  - Estado del contrato
  - Alertas activas

### 4. Vista de Arbitraje

**Header:**
- Título: "Simulador de Arbitraje"
- Subtítulo: "Optimiza tu inversión en baterías"

**Simulación de instalación de baterías:**
- Formulario: CUPS, consumo mensual, zona
- Resultado: "Si instalas una batería de 10kWh, ahorrarías X€/año"
- ROI: "Recuperarás la inversión en 24 meses"
- CTA: "Solicitar Presupuesto sin Compromiso"

### 5. Vista del Asesor

**Header:**
- Título: "Asesor Energético"
- Subtítulo: "Encuentra la mejor tarifa para tus propiedades"

**Autorización Datadis:**
- Texto: "Para obtener datos de consumo, necesitamos tu autorización para acceder a Datadis"
- Formulario: CUPS, nombre, apellidos, DNI/NIE
- Firma electrónica: Checkbox + botón "Firmar Autorización"
- CTA: "Autorizar Acceso a Datadis"

**Resultados:**
- Tarifa recomendada (nombre + explicación)
- Ahorro mensual/anual (número grande)
- Comparativa visual (3 barras)
- Botón: "Exportar Informe"

### 6. Captación de Leads Shelly (PÁGINA DEDICADA)

**Header:**
- Título: "Monitorización en Tiempo Real"
- Subtítulo: "Instala un medidor de consumo y optimiza tu factura"

**Hero Section:**
- Imagen de un Shelly EM instalado
- Título: "¿Cuánto estás perdiendo por no medir en tiempo real?"
- Subtítulo: "Con un medidor de consumo puedes detectar anomalías, optimizar tarifas y ahorrar hasta un 30% en tu factura"
- CTA: "Solicitar Presupuesto Gratis" (botón verde grande)

**Beneficios (3 tarjetas):**
1. **Detección de Anomalías** — "Recibe alertas instantáneas cuando el consumo es anómalo"
2. **Optimización de Tarifas** — "Con datos en tiempo real, la IA puede recomendar la tarifa exacta"
3. **Ahorro Garantizado** — "Nuestros clientes ahorran de media 450€/año"

**Cómo Funciona (3 pasos):**
1. **Solicitas Presupuesto** — "Rellena el formulario con tus datos"
2. **Instalamos el Medidor** — "Un técnico certificado instala el Shelly EM en tu cuadro eléctrico"
3. **Empiezas a Ahorrar** — "Accedes a tu dashboard con datos en tiempo real"

**Formulario de Captación:**
- Nombre completo
- Email
- Teléfono
- Tipo de propiedad (Finca / Apartamento / Otro)
- Número de propiedades que gestiona
- CUPS (opcional)
- Checkbox: "Acepto la política de privacidad"
- CTA: "Solicitar Presupuesto" (botón verde)

**Testimonios:**
- "Instalé el Shelly EM en 3 comunidades y ahora detecto fugas al instante" — Gestor de fincas, Madrid
- "Ahorro 200€/mes gracias a la monitorización en tiempo real" — Propietario Airbnb, Barcelona

**FAQ:**
- ¿Cuánto cuesta? → "Desde 49€ + instalación. El presupuesto es gratuito y sin compromiso"
- ¿Necesito un electricista? → "Nosotros nos encargamos de la instalación"
- ¿Es compatible con mi cuadro eléctrico? → "El Shelly EM es compatible con el 95% de cuadros eléctricos"

### Notas de Estilo:
- **Modo CLARO** (no dark mode)
- Tarjetas con bordes suaves (1px #E0E0E0) y radio de 12px
- Efectos hover: sombra suave, ligero levantamiento (-1px)
- Números en fuente monoespaciada para sensación financiera
- Iconos de Phosphor o Lucide
- Responsivo: 4→2→1 columnas
- Sensación: Herramienta profesional pero amigable
