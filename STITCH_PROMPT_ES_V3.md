# EnergyOS Dashboard — Prompt para Stitch v3 (ESPAÑOL, ESTILO AMIGABLE)

## Contexto do Proxecto

**EnergyOS Pro** é unha plataforma B2B de xestión enerxética para profesionais inmobiliarios en España.

### Dobre mercado:
1. **🏢 Fincas (Comunidades)** — Reparto de gastos, cálculo de coeficientes, monitorización de zonas comúns
2. **🏠 Apartamentos (Alugueres)** — Seguimento por unidade, alertas a inquilinos, xestión multi-contrato

### Funcionalidades:
3. **⚡ Asesor Enerxético IA** — Recomenda tarifas óptimas, calcula aforros exactos
4. **🔋 Simulador de Arbitraxe de Baterías** — Datos OMIE en tempo real + dimensionamento IA de baterías

## Sistema de Deseño — ESTILO AMIGABLE (Non "IA")

### Filosofía de deseño:
- **Profesional pero amigable** — Non frío/IA, senón cálido e accesible
- **Datos densos pero lexibles** — Cada número ten contexto
- **Acción inmediata** — O usuario sabe que facer en 3 segundos
- **Referencias:** Guesty (SaaS inmobiliario), Stripe (financeiro confiable), Enpal (enerxía positiva)

### Cores — PALETA CÁLIDA (Non dark mode puro):
- **Fondo principal:** #FAFAFA (gris moi claro, NON negro)
- **Fondo tarxetas:** #FFFFFF (branco puro)
- **Bordes:** #E0E0E0 (gris suave)
- **Texto principal:** #212121 (case negro)
- **Texto secundario:** #757575 (gris medio)
- **Primario (Enerxía):** #2E7D32 (verde bosque — crecemento, sostibilidade)
- **Secundario (Alertas):** #FF8F00 (ámbar — enerxía, alertas suaves)
- **Acento (Tecnoloxía):** #00ACC1 (cyan — frescura, innovación)
- **Fincas:** #1565C0 (azul corporativo)
- **Apartamentos:** #F57C00 (naranxa cálido)
- **Arbitraxe:** #7B1FA2 (violeta suave)
- **Asesor:** #2E7D32 (verde bosque)
- **Éxito:** #4CAF50 (verde brillante)
- **Alerta:** #FFB300 (ámbar)
- **Erro:** #E53935 (vermello suave)

### Tipografía:
- **Títulos:** Plus Jakarta Sans (SemiBold, Bold) — amigable, profesional
- **Corpo:** Inter (Regular, Medium) — moderna, lexible
- **Números/Datos:** Tabular figures (monospace para alineación)
- **Escala:**
  - Hero (KPIs): 48px / Bold
  - H1: 32px / SemiBold
  - H2: 24px / SemiBold
  - H3: 20px / Medium
  - Body: 16px / Regular
  - Small: 14px / Regular
  - Caption: 12px / Medium

### Iconografía:
- **Phosphor Icons** (stroke 1.5px) — lixeiras, amigables
- Ou **Lucide Icons** como alternativa
- Tamaño: 20px para menú, 24px para accións, 16px para badges

### Espaciado:
- **Container:** max-w-7xl (1280px) centrado
- **Padding:** 24px como base
- **Gap entre tarxetas:** 16px
- **Border radius:** 12px para tarxetas, 8px para botóns
- **Sombras:** Suaves (shadow-sm, shadow-md)

## Solicitude

Crea unha interface de dashboard premium en modo CLARO para EnergyOS Pro. O usuario debe sentir que está a usar unha ferramenta profesional pero amigable — como Guesty ou Stripe, non como un terminal Bloomberg.

### Estrutura:

**Navegación superior (64px):**
- Logo "EnergyOS" á esquerda
- Buscador global ao centro "Buscar comunidade..."
- Notificacións (badge) + Avatar de usuario á dereita

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
- **⚡ Arbitraxe**
- **🤖 Asesor**
- ---
- **⚙️ Configuración**
- **❓ Axuda**
- **🚪 Pechar sesión**

### 1. Panel Principal (Dashboard)

**Fila de KPIs (4 tarxetas):**
- **Total Comunidades:** 12 (con icona de edificio, cor azul)
- **kWh Mensual:** 45.2k (con trend ↑ +4.2% en verde)
- **Costo Mensual:** 8.420€ (con trend ↓ -1.5% en verde)
- **Alertas Activas:** 3 (con badge ámbar)

**Cada KPI ten:**
- Número grande (48px, Plus Jakarta Sans Bold)
- Label pequeno (12px, uppercase, gris)
- Icona con fondo de cor suave
- Trend arrow con % (verde se positivo, ámbar se negativo)

**Gráfico de Consumo Agregado:**
- Título: "Consumo Agregado"
- Subtítulo: "Análise histórica de kWh"
- Selector de período: 24H | 7D | 30D (tabs)
- Gráfico de área con gradiente verde suave
- Liña de media punteada
- Tooltip ao pasar o rato con datos detallados

**Listado de Comunidades (táboa):**
- Título: "Listado de Comunidades"
- Subtítulo: "Mostrando 4 de 12 comunidades"
- Columnas: Nome, Unidades, Consumo (kWh), Custo (€), Estado
- Estados con badges:
  - 🟢 "Optimizado" (verde)
  - 🟡 "Analizando" (ámbar)
  - 🔴 "Alerta" (vermello suave)
- Hover en filas: fondo gris claro (#F5F5F5)
- Accións: "Ver detalle", "Descargar informe"

**Panel lateral dereito (320px):**

**Asesor IA:**
- Título: "Asesor IA"
- Icona de robot amigable (non frío)
- Texto: "Detectou unha oportunidade de aforro optimizando a potencia contratada"
- **Aforro Estimado: 8.500€/ano** (número grande verde)
- Botón: "Ver Estrategia" (verde, cheo)

**Arbitraxe:**
- Título: "Arbitraxe"
- Badge: "Activo" (verde)
- Texto: "Exceso de reactiva detectado en Calle Mayor 15"
- Barra de progreso: 75% (gradiente verde)
- Botón: "Ver Detalle" (outline)

**Hub de Comunidades:**
- Imaxe/diagrama dun centro operativo
- Texto: "8 comunidades operativas"
- Badge: "Online" (verde)

### 2. Vista de Fincas (separada)

**Header:**
- Título: "Fincas"
- Subtítulo: "Xestión de comunidades de veciños"
- Botón: "Nova Comunidade" (verde)

**Grid de tarxetas de fincas:**
- Cada tarxeta mostra:
  - Nome da comunidade
  - Número de unidades
  - Consumo total (kWh)
  - Custo mensual (€)
  - Estado (semáforo)
  - Accións rápidas

### 3. Vista de Apartamentos (separada)

**Header:**
- Título: "Apartamentos"
- Subtítulo: "Xestión de propiedades de aluguer"
- Botón: "Nova Propiedade" (naranxa)

**Grid de tarxetas de apartamentos:**
- Cada tarxeta mostra:
  - Nome/dirección
  - Inquilino actual
  - Consumo (kWh)
  - Estado do contrato
  - Alertas activas

### 4. Vista de Arbitraxe

**Header:**
- Título: "Simulador de Arbitraxe"
- Subtítulo: "Optimiza o teu investimento en baterías"

**Panel dividido:**
- **Esquerda:** Gráfico de prezos OMIE en tempo real
- **Dereita:** Configuración de batería (capacidade, potencia, rendemento)

**Resultados:**
- Profit mensual/ano estimado
- ROI (anos)
- Gráfico de ciclos carga/descarga

### 5. Vista do Asesor

**Header:**
- Título: "Asesor Enerxético"
- Subtítulo: "Atopa a mellor tarifa para as túas propiedades"

**Zona de carga:**
- Drag-and-drop CSV
- Ou entrada manual de consumo

**Resultados:**
- Tarifa recomendada (nome + explicación)
- Aforro mensual/anual (número grande)
- Comparativa visual (3 barras)
- Botón: "Exportar Informe"

### Notas de Estilo:
- **Modo CLARO** (non dark mode)
- Tarxetas con bordes suaves (1px #E0E0E0) e radio de 12px
- Efeitos hover: sombra suave, lixeiro levantamento (-1px)
- Números en fonte monoespaciada para sensación financeira
- Iconas de Phosphor ou Lucide
- Responsivo: 4→2→1 columnas
- Sensación: Ferramenta profesional pero amigable

### Interaccións clave:
- Carga: Skeleton pulse, non spinner
- Métricas: Contador animado (countUp) ao cargar
- Hover cards: Sombra suave, translateY(-1px)
- Hover filas táboa: Fondo #F5F5F5, transición 150ms
- Cambio módulo: Crossfade 200ms
- Notificacións: Toast slide-in dende arriba-dereita
- Modal: Backdrop blur + scale-in
