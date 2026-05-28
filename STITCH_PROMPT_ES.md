# EnergyOS Dashboard — Prompt para Stitch (ESPAÑOL)

## Contexto do Proxecto

**EnergyOS Pro** é unha plataforma B2B de xestión enerxética para profesionais inmobiliarios en España:

### Dobre mercado:
1. **🏢 Fincas (Comunidades)** — Reparto de gastos, cálculo de coeficientes, monitorización de zonas comúns
2. **🏠 Apartamentos (Alugueres)** — Seguimento por unidade, alertas a inquilinos, xestión multi-contrato

### Funcionalidades compartidas:
3. **⚡ Asesor Enerxético IA** — Recomenda tarifas óptimas, calcula aforros exactos
4. **🔋 Simulador de Arbitraxe de Baterías** — Datos OMIE en tempo real + dimensionamento IA de baterías

## Sistema de Deseño

### Cores
- Fondo: #0f172a (slate escuro)
- Tarxetas: #1e293b (slate-800)
- Primario: #10b981 (esmeralda)
- Acento Fincas: #3b82f6 (azul)
- Acento Apartamentos: #f59e0b (ámbar)
- Acento Arbitraxe: #8b5cf6 (violeta)
- Texto: #e2e8f0 (slate-200)

### Tipografía
- Fonte: Inter
- Métricas/números: JetBrains Mono
- Encabezados: peso 600-700
- Corpo: peso 400, 14-16px

## Solicitude

Crea unha interface de dashboard premium en modo escuro para EnergyOS Pro. O usuario debe sentir que está a usar Linear.app ou un terminal Bloomberg — denso en datos, profesional e inmediatamente accionable.

### Estrutura:

**Navegación superior:**
- Logo á esquerda, Táboas de módulos ao centro (Fincas | Apartamentos | Arbitraxe | Asesor), Avatar de usuario á dereita
- Táboa activa con liña de cor debaixo

**Barra lateral (colapsable):**
- Sección Fincas: Panel, Comunidades, Reparto de Gastos, Informes
- Sección Apartamentos: Panel, Propiedades, Inquilinos, Alertas
- Compartido: Arbitraxe, Asesor, Configuración

### 1. Panel de Fincas
- **Fila de métricas principais:** Total Comunidades, kWh Mensual, Custo Mensual, Alertas
- **Gráfico de consumo:** Gráfico de área mostrando kWh ao longo do tempo para todas as comunidades
- **Tarxeta Asesor IA:** "3 comunidades poderían aforrar 8.500€/ano" con botón Revisar
- **Tarxeta oportunidade Arbitraxe:** "Comunidade Calle Mayor 15 | Potencial: 245€/mes"
- **Táboa de Comunidades:** Nome, Unidades, kWh, Custo, Estado, Accións

### 2. Panel de Apartamentos
- **Fila de métricas principais:** Total Propiedades, Taxa de Ocupación, Custo Mensual, Alertas Activas
- **Gráfico de consumo por unidade:** Gráfico de barras por propiedade con liña de media
- **Panel de alertas:** Lista por prioridade (vermello/amarelo/verde) con unidade e incidencia
- **Grella de propiedades:** Tarxetas con foto (placeholder), dirección, conta de inquilinos, badge de estado, métricas rápidas

### 3. Vista de Arbitraxe
- **Panel dividido:** Prezos de mercado á esquerda, configuración de batería á dereita
- **Ticker de prezos:** Prezos OMIE en tempo real con codificación por cor (verde=baixo, vermello=alto)
- **Visualización de batería:** Nivel de carga con gradiente, control deslizante de capacidade
- **Resultados da simulación:** Tarxetas Antes/Despois, gráfico de proxección de beneficios, calculadora de ROI

### 4. Vista do Asesor
- **Zona de carga:** Arrastrar e soltar CSV con datos de consumo
- **Comparativa de tarifas:** Táboa mostrando Actual vs Recomendada vs Diferenza
- **Tarxeta de recomendación:** Cifra de aforro grande, explicación, botóns Aplicar/Detalles
- **Gráfico:** Gráfico de barras comparando 3 opcións de tarifa

### Compoñentes Globais:
- **Tarxetas de métricas:** Número grande con frecha de tendencia, icona de cor do módulo
- **Badges de estado:** Normal (esmeralda), Aviso (ámbar), Alerta (rosa)
- **Botóns:** Primario (esmeralda sólido), Secundario (contorno), Fantasma
- **Táboas:** Ordenables, con puntos de estado e iconas de acción
- **Modais:** Para vistas detalladas, centrados con desenfoque de fondo

### Notas de Estilo:
- Tema escuro premium (fondo 0f172a)
- Tarxetas con bordes sutis (1px slate-700) e radio de 12px
- Efeitos hover: brillo de borde, lixeiro levantamento (-2px)
- Números en fonte monoespaciada para sensación financeira
- Iconas do conxunto Lucide
- Responsivo: 4→2→1 columnas, a barra lateral convértese en navegación inferior en móbil
- Sensación: Plataforma de trading financeiro xestión inmobiliaria

### Interaccións clave:
- Cambio de módulo con transición suave de contido
- Tarxetas de métricas animadas ao cargar (contaxe ascendente)
- Tooltips nos gráficos ao pasar o rato
- Filas da táboa resáltanse ao pasar o rato
- Botóns brillan ao pasar o rato
