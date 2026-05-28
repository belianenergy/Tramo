# EnergyOS Dashboard — Prompt para Stitch v4 (ESPAÑOL, CON DATADIS E SIMULACIÓN BATERÍAS)

## Contexto do Proxecto

**EnergyOS Pro** é unha plataforma B2B de xestión enerxética para profesionais inmobiliarios en España.

### Dobre mercado:
1. **🏢 Fincas (Comunidades)** — Reparto de gastos, cálculo de coeficientes, monitorización de zonas comúns
2. **🏠 Apartamentos (Alugueres)** — Seguimento por unidade, alertas a inquilinos, xestión multi-contrato

### Funcionalidades:
3. **⚡ Asesor Enerxético IA** — Recomenda tarifas óptimas, calcula aforros exactos
4. **🔋 Simulador de Arbitraxe de Baterías** — Datos OMIE en tempo real + dimensionamento IA de baterías
5. **📊 Datadis** — Datos de consumo por CUPS vía API (autorización electrónica)
6. **🔋 Simulación de instalación de baterías** — Para fomentar a venda do servizo

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

### Espaciado:
- **Container:** max-w-7xl (1280px) centrado
- **Padding:** 24px como base
- **Gap entre tarxetas:** 16px
- **Border radius:** 12px para tarxetas, 8px para botóns
- **Sombras:** Suaves (shadow-sm, shadow-md)

## Solicitude

Crea unha interface de dashboard premium en modo CLARO para EnergyOS Pro.

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

**Gráfico de Consumo Agregado:**
- Título: "Consumo Agregado"
- Subtítulo: "Análise histórica de kWh"
- Selector de período: 24H | 7D | 30D (tabs)
- Gráfico de área con gradiente verde suave

**Listado de Comunidades (táboa):**
- Columnas: Nome, Unidades, Consumo (kWh), Custo (€), Estado
- Estados: 🟢 Optimizado, 🟡 Analizando, 🔴 Alerta

**Panel lateral dereito (320px):**

**Asesor IA:**
- Texto: "Detectou unha oportunidade de aforro optimizando a potencia contratada"
- **Aforro Estimado: 8.500€/ano** (número grande verde)
- Botón: "Ver Estrategia" (verde)

**Arbitraxe:**
- Badge: "Activo" (verde)
- Texto: "Exceso de reactiva detectado en Calle Mayor 15"
- Barra de progreso: 75%

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

**Simulación de instalación de baterías:**
- Formulario: CUPS, consumo mensual, zona
- Resultado: "Se instalas unha batería de 10kWh, aforrarías X€/ano"
- ROI: "Recuperarás a inversión en 24 meses"
- CTA: "Solicita orzamento sen compromiso"

### 5. Vista do Asesor

**Header:**
- Título: "Asesor Enerxético"
- Subtítulo: "Atopa a mellor tarifa para as túas propiedades"

**Autorización Datadis:**
- Texto: "Para obter datos de consumo, necesitamos a túa autorización para acceder a Datadis"
- Formulario: CUPS, nome, apelidos, DNI/NIE
- Firma electrónica: Checkbox + botón "Firmar Autorización"
- CTA: "Autorizar Aceso a Datadis"

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
