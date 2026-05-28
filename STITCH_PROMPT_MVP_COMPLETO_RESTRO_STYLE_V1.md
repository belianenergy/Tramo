# EnergyOS MVP Completo — Restro Style

Crear un proyecto Stitch limpio, separado e independiente para **EnergyOS MVP Completo — Restro Style**.

## Objetivo

Reinterpretar el MVP completo de EnergyOS con una estética tipo dashboard premium “Restro”: cálida, muy limpia, modular, compacta y calmada. No generar solo una landing: el proyecto debe incluir las 9 pantallas del MVP dentro del mismo proyecto Stitch.

## Contexto de producto

EnergyOS es una herramienta B2B para **gestoras de 20+ apartamentos turísticos** en España.

- **Core del MVP:** plataforma de gestión energética para carteras de alojamientos turísticos, conectando consumos, reservas, tarifas, alertas e informes.
- **Problema principal:** las gestoras tienen datos energéticos dispersos y poca visibilidad para priorizar ahorro, coordinar operaciones y explicar costes a propietarios.
- **Secundario:** automatización de alertas operativas por alojamiento y revisión de tarifa eléctrica/potencia contratada.
- **Premium bajo estudio:** batería/arbitraje energético como oportunidad avanzada para carteras con volumen suficiente; debe aparecer como potencial, no como promesa garantizada.
- **No enfocar en:** comunidades de vecinos, fincas, IA como claim principal, domótica genérica o trading energético.

## Idioma y tono

- Todo el texto visible en **castellano**.
- Tono profesional, operativo, claro y directo.
- Debe parecer una app real para equipos de operaciones de alojamientos turísticos.
- Nada de lorem ipsum, claims inflados o badges falsos.

## Dirección visual Restro Style

Inspiración visual: dashboard tipo Restro, muy limpio, fondo gris/beige claro, contenedor blanco principal con bordes redondeados, métricas compactas, gráficos finos y acento naranja/caramelo.

### Paleta

- Shell / fondo app: `#F4F1EA`, `#F6F3EC`, `#F7F7F4` o gris cálido muy claro.
- Superficie principal: `#FFFFFF` / `#FFFCF7`.
- Cards internas: blanco/cream con borde muy sutil `#E8E2D8`.
- Texto principal: `#171717`, `#1F2933`.
- Texto secundario: `#6B7280`, `#8A8176`.
- Acento principal: naranja/caramelo `#E6813A`, `#F59E0B`, `#D97706`.
- Estados positivos: verde suave solo como secundario `#10B981` / `#84CC16`, nunca como color de marca dominante.
- Alertas: rojo/coral sobrio `#E35D4F`, con fondos suaves, no agresivos.

### Layout y componentes

- App shell con **sidebar estrecha** (64-84 px) con iconos circulares o botones redondeados, no sidebar grande corporativa.
- Topbar compacta con icon buttons, pills de filtro, selector de fecha/ciudad y CTA pequeño.
- Dashboard como **una sola superficie/panel premium** con submódulos, no una colección de cards SaaS genéricas separadas.
- Cards compactas con radio 24-32 px, sombras muy suaves, mucho aire, poca saturación.
- Grid modular: métricas superiores horizontales, paneles medios con gráficos, columna lateral de prioridad/operaciones.
- Gráficos finos: líneas/dotted line, puntos/heatmap, barras redondeadas, micro sparkline, sin efectos 3D.
- Tipografía: Inter, Plus Jakarta Sans o similar. Jerarquía sobria: títulos medianos, números claros, labels pequeños.
- Iconografía: minimal, lineal, abstracta o geométrica. **No usar emojis**.
- Evitar dark mode, gradientes fuertes, glassmorphism, neón, verde SaaS dominante, exceso de texto.

### Responsive

Diseñar para desktop 1440, tablet 768 y mobile 375. En móvil, sidebar puede convertirse en top nav compacta o rail inferior; mantener legibilidad.

## Datos de ejemplo persistentes

Gestora: **Costa Norte Stays**  
Cartera: **48 apartamentos turísticos**  
Ciudades: Vigo, Santiago, A Coruña, Sanxenxo, Baiona  
Integraciones: Hostaway/PMS, Google Calendar, Shelly/medidores, email/WhatsApp.

Apartamentos de muestra:

1. **VGO-014 · Apartamento Areal**
   - Ciudad: Vigo
   - Propietario: Marta Lago
   - Reserva: sin estancia hasta mañana 16:00
   - Clima: A/C encendido 22 ºC
   - Consumo actual: 1,84 kW
   - Estado: alerta crítica
   - Próxima acción: apagar A/C y avisar mantenimiento si persiste

2. **SCQ-022 · Loft Catedral**
   - Ciudad: Santiago
   - Propietario: José Prieto
   - Reserva: check-in hoy 17:30
   - Clima: pre-enfriando 23 ºC
   - Consumo actual: 0,92 kW
   - Estado: pre-check-in correcto
   - Próxima acción: validar confort 30 min antes

3. **LCG-008 · Marina Centro**
   - Ciudad: A Coruña
   - Propietario: Inés Vidal
   - Reserva: check-out realizado 11:00
   - Clima: apagado
   - Consumo actual: 0,21 kW
   - Estado: post-check-out pendiente
   - Próxima acción: revisar consumo residual y generar informe

4. **SNX-031 · Playa Silgar**
   - Ciudad: Sanxenxo
   - Propietario: Grupo Rías
   - Reserva: estancia activa
   - Clima: huésped presente, 24 ºC
   - Consumo actual: 1,26 kW
   - Estado: estancia activa normal
   - Próxima acción: ninguna

5. **BAI-006 · Mirador Atlántico**
   - Ciudad: Baiona
   - Propietario: Laura Méndez
   - Reserva: sin reserva 3 días
   - Clima: calefacción apagada
   - Consumo actual: 0,48 kW
   - Estado: anomalía leve
   - Próxima acción: comprobar termo y standby

## Navegación app común

Para las pantallas internas, mantener consistencia:

- Rail lateral estrecho con iconos/pills para: Dashboard, Apartamentos, Operaciones, Informes, Tarifa, Leads, Configuración.
- Header/topbar con: Costa Norte Stays, fecha, selector ciudad/cartera, botón pequeño “Nueva regla” o acción contextual.
- Estética premium calmada, no “admin template”.

## Pantallas obligatorias

Generar cada pantalla como una pantalla independiente de Stitch dentro del mismo proyecto. Si Stitch solo permite una pantalla por llamada, hacer una llamada por pantalla al mismo `project_id`.

### 1) Landing pública

Nombre sugerido: `landing-publica`

Objetivo: captar demos/pilotos de gestoras con 20+ apartamentos turísticos.

Debe heredar el mismo sistema visual Restro: fondo cálido, hero con mockup dashboard compacto estilo panel premium, acento naranja.

Contenido obligatorio:

- Topbar con logo EnergyOS, enlaces: Producto, Operaciones, Informes, Piloto.
- Hero:
  - H1: **Gestiona la energía de tu cartera turística desde un solo sistema.**
  - Subtítulo: **EnergyOS conecta consumos, reservas, tarifas, alertas e informes para reducir costes, coordinar operaciones y evaluar baterías o arbitraje cuando la cartera lo permite.**
  - CTA principal: **Solicitar diagnóstico**
  - CTA secundario: **Ver casos de uso**
- Proof bar:
  - **10+ alojamientos por gestora**
  - **Alertas de consumo ligadas a reservas**
  - **Optimización de tarifas, potencia y contrato**
  - **Baterías, solar y arbitraje bajo estudio**
- Sección problema/solución con 3 cards:
  1. Señales de consumo y reservas dispersas
  2. Tarifas y potencia sin revisar
  3. Informes, baterías y arbitraje sin criterio operativo
- Mini preview de dashboard operativo en estilo Restro.
- Sección “Cómo funciona”:
  1. Conecta PMS/calendario
  2. Define reglas de clima y consumo
  3. Opera alertas desde una cola única
  4. Envía informe mensual al propietario
- Formulario/lead visible:
  - Nombre
  - Email profesional
  - Empresa gestora
  - Nº alojamientos (20-50, 51-100, 100+)
  - Dolor principal (clima entre reservas, consumo fuera de estancia, informes propietario, tarifa/potencia)
  - Botón: **Quiero piloto**
- Footer simple.

### 2) Dashboard operativo

Nombre sugerido: `dashboard-operativo`

Debe sentirse como centro operativo premium, no analytics decorativo.

Contenido obligatorio:

- Sidebar estrecha con navegación por iconos/pills.
- Header: Costa Norte Stays, fecha de hoy, filtros compactos, botón “Nueva regla”.
- KPIs accionables compactos:
  - **A/C activo sin reserva: 3**
  - **Pre-check-ins hoy: 12**
  - **Post-check-outs pendientes: 8**
  - **Alertas abiertas: 7**
  - **Consumo fuera de estancia: 3,8 kW**
- Módulo “Prioridad ahora” con VGO-014 alerta crítica.
- Lista de operaciones recientes:
  - A/C detectado sin reserva en VGO-014
  - Pre-enfriado activado para SCQ-022
  - Check-out cerrado en LCG-008
  - Informe enviado a Marta Lago
- Panel de distribución por estado: normal, pendiente, alerta.
- Gráfico fino de consumo fuera de estancia, heatmap/puntos por horas y barras redondeadas por ciudad.

### 3) Apartamentos / cartera

Nombre sugerido: `apartamentos-cartera`

Contenido obligatorio:

- Vista tabla/cards de apartamentos dentro de panel blanco premium.
- Filtros en pills: ciudad, estado reserva, alerta, propietario.
- Columnas/cards:
  - Apartamento
  - Ciudad
  - Estado de reserva
  - Clima
  - Consumo actual
  - Propietario
  - Próxima acción
- Usar los 5 apartamentos de muestra.
- Estados con badges claros: alerta crítica, pre-check-in, post-check-out, estancia activa, anomalía leve.
- CTA por fila: Ver detalle / Resolver.

### 4) Operaciones

Nombre sugerido: `operaciones-cola`

Contenido obligatorio:

- Cola de automatizaciones/alertas filtrable.
- Filtros tipo tabs/pills: Todas, Pre-check-in, Post-check-out, Anomalía, Informe propietario.
- Cards o tabla de tareas con:
  - Tipo
  - Apartamento
  - Severidad
  - Estado: pendiente, en curso, automatizada, resuelta
  - SLA / vencimiento
  - Responsable
  - Acción principal
- Detalle accionable lateral o card expandida para VGO-014:
  - Motivo: A/C activo sin reserva
  - Evidencia: consumo 1,84 kW durante 46 min, sin reserva hasta mañana
  - Recomendación: apagar A/C, esperar 10 min, confirmar bajada <0,35 kW
  - Botones: Apagar clima, Crear incidencia, Marcar resuelta

### 5) Detalle apartamento

Nombre sugerido: `detalle-apartamento`

Contenido obligatorio para **VGO-014 · Apartamento Areal**:

- Header con estado, ciudad, propietario Marta Lago.
- Timeline reserva/check-in/check-out.
- Card de clima: A/C encendido 22 ºC, sin estancia hasta mañana 16:00.
- Card de consumo: 1,84 kW actual, tendencia fina, umbral esperado <0,35 kW.
- Evidencia y recomendación operativa.
- Historial de eventos y reglas aplicadas.
- Bloque secundario de tarifa/potencia discreto, sin robar foco.
- Acciones: Apagar clima, Avisar mantenimiento, Generar informe propietario.

### 6) Informe mensual propietario

Nombre sugerido: `informe-mensual-propietario`

Contenido obligatorio para **Marta Lago · Apartamento Areal · Abril 2026**:

- Vista tipo informe limpio con cabecera premium.
- Resumen ejecutivo.
- Métricas:
  - Consumo total mensual
  - Consumo fuera de estancia detectado
  - Incidencias resueltas
  - Ahorro estimado prudente
- Timeline/incidencias relevantes.
- Gráfico fino mensual.
- Texto listo para enviar al propietario.
- CTA: Exportar PDF, Enviar por email.

### 7) Tarifa / potencia

Nombre sugerido: `optimizacion-tarifa-potencia`

Módulo secundario, prudente y sobrio. No convertir en producto principal.

Contenido obligatorio:

- Comparativa tarifa actual vs recomendada.
- Potencia contratada actual/recomendada por periodos.
- Ahorro estimado prudente, con disclaimer “estimación sujeta a histórico y contrato”.
- Lista de apartamentos con oportunidad de ajuste.
- Gráfico de demanda/picos con línea fina.
- Evitar promesas de arbitraje, trading o batería como core.

### 8) Leads / piloto

Nombre sugerido: `leads-solicitudes-piloto`

Vista interna simple para gestionar solicitudes de piloto.

Contenido obligatorio:

- Leads cualificados con empresa, contacto, nº alojamientos, ciudad principal, dolor principal, interés, estado contacto.
- Ejemplos: Atlántico Rentals, Rías Baixas Homes, Norte Gestión Vacacional.
- Pipeline/pills: Nuevo, Contactado, Demo agendada, Piloto activo.
- Panel lateral con próximo paso y checklist de cualificación.

### 9) Configuración piloto

Nombre sugerido: `configuracion-piloto`

Contenido obligatorio:

- Integraciones: PMS/calendario, medidores Shelly, email/WhatsApp.
- Reglas de clima:
  - Sin estancia: apagar clima si consumo >0,8 kW durante 30 min
  - Pre-check-in: activar/preparar confort 90 min antes si temperatura exterior lo requiere
  - Post-check-out: verificar consumo residual tras 60 min
- Umbrales de consumo por apartamento.
- Notificaciones/responsables.
- Modo piloto: activos 12 apartamentos de 48, periodo 30 días, propietario/informe mensual.

## Reglas de calidad

- Mantener contido e foco validado: gestoras 10+ alojamientos turísticos; core = gestión energética de cartera (consumo + reservas + tarifas + alertas + informes); avanzado = batería/arbitraje bajo estudio como potencial para carteras con volumen, nunca como promesa garantizada.
- Visualmente: cálido, premium, compacto, naranja/caramelo, sombras suaves, bordes redondeados, mucho aire.
- Reducir verde esmeralda; usarlo solo para estados positivos secundarios.
- Evitar dark mode, gradients fuertes, glassmorphism, iconos emoji, exceso de texto, badges falsos.
- Cada pantalla debe parecer parte del mismo producto y del mismo proyecto.
