# EnergyOS MVP Completo — Gestoras Apartamentos Turísticos

Crear un proyecto Stitch limpio, separado e independiente para **EnergyOS MVP Completo — Gestoras Apartamentos Turísticos**.

## Contexto de producto

EnergyOS es una herramienta B2B para **gestoras de 20+ apartamentos turísticos** en España.

- **Core del MVP:** control operativo de climatización y consumo entre reservas.
- **Problema principal:** A/C, calefacción, termo u otros consumos quedan activos cuando no hay estancia; el equipo de operaciones no tiene una cola clara de acciones antes/después de reservas.
- **Secundario:** optimización de tarifa eléctrica y potencia contratada.
- **Premium bajo estudio:** batería/arbitraje energético, pero **no debe aparecer como foco del MVP**.
- **No enfocar en:** comunidades de vecinos, fincas, IA como claim principal, domótica genérica o trading energético.

## Tono e idioma

- Todo el texto visible en **castellano**.
- Tono claro, profesional, directo, estilo Linear/Stripe.
- Debe parecer una app SaaS operativa real para equipos de operaciones.
- Nada de lorem ipsum.

## Sistema visual

- Modo claro obligatorio.
- Fondo: `#F8FAFC` / blanco.
- Cards: blanco con borde `#E5E7EB`.
- Texto principal: `#0F172A`.
- Texto secundario: `#64748B`.
- Verde/teal para estado correcto: `#10B981` / `#0F766E`.
- Ámbar para pendiente/pre-check-in: `#F59E0B`.
- Rojo para alerta: `#EF4444`.
- Azul discreto para acciones secundarias: `#2563EB`.
- Tipografía: Inter o similar.
- UI: navegación lateral o topbar clara, botones sólidos, badges, tablas limpias, timeline, filtros.
- Evitar estética oscura, cripto, futurista o demasiado marketing.
- Responsive: desktop y mobile coherentes.

## Datos de ejemplo persistentes en todas las pantallas

Gestora: **Costa Norte Stays**  
Cartera: **48 apartamentos turísticos**  
Ciudades: Vigo, Santiago, A Coruña, Sanxenxo, Baiona  
Integraciones: Hostaway/PMS, Google Calendar, Shelly/medidores, email/WhatsApp.

Apartamentos de muestra:

1. **VGO-014 · Apartamento Areal**
   - Ciudad: Vigo
   - Propietario: Marta Lago
   - Reserva: sin estancia hasta mañana 16:00
   - Clima: A/C encendido 22ºC
   - Consumo actual: 1,84 kW
   - Estado: alerta crítica
   - Próxima acción: apagar A/C y avisar mantenimiento si persiste

2. **SCQ-022 · Loft Catedral**
   - Ciudad: Santiago
   - Propietario: José Prieto
   - Reserva: check-in hoy 17:30
   - Clima: pre-enfriando 23ºC
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
   - Clima: huésped presente, 24ºC
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

## Pantallas obligatorias

Generar cada pantalla como una pantalla independiente de Stitch dentro del mismo proyecto. Si Stitch solo permite una pantalla por llamada, hacer una llamada por pantalla al mismo `project_id`.

### 1) Landing pública

Nombre sugerido: `landing-publica`

Objetivo: captar demos/pilotos de gestoras con 20+ apartamentos turísticos.

Contenido obligatorio:

- Topbar con logo EnergyOS, enlaces: Producto, Operaciones, Informes, Piloto.
- Hero:
  - H1: **Controla climatización y consumo entre reservas sin perseguir incidencias apartamento por apartamento.**
  - Subtítulo: **EnergyOS ayuda a gestoras de apartamentos turísticos a detectar A/C activo sin reserva, preparar check-ins y reducir consumo fuera de estancia desde una cola operativa única.**
  - CTA principal: **Solicitar demo piloto**
  - CTA secundario: **Ver flujo operativo**
- Proof bar:
  - **48 apartamentos monitorizados**
  - **7 alertas abiertas hoy**
  - **3,8 kW fuera de estancia detectados**
  - **PMS + calendario + medidores**
- Sección problema/solución con 3 cards:
  1. A/C activo sin reserva
  2. Pre-check-ins sin confort verificado
  3. Informes a propietarios dispersos
- Mini preview de dashboard operativo.
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

Contenido obligatorio:

- Sidebar con: Dashboard, Apartamentos, Operaciones, Informes, Tarifa/potencia, Leads, Configuración.
- Header: Costa Norte Stays, fecha de hoy, botón “Nueva regla”.
- KPIs accionables:
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
- Debe sentirse como centro operativo, no analytics decorativo.

### 3) Apartamentos / cartera

Nombre sugerido: `apartamentos-cartera`

Contenido obligatorio:

- Vista tabla/cards de apartamentos.
- Filtros: ciudad, estado reserva, alerta, propietario.
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
- Filtros tipo tabs: Todas, Pre-check-in, Post-check-out, Anomalía, Informe propietario.
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

Contenido obligatorio:

- Apartamento: VGO-014 · Apartamento Areal.
- Header con estado crítico y propietario Marta Lago.
- Timeline reserva/check-in/check-out:
  - Check-out anterior ayer 11:00
  - Limpieza completada ayer 14:20
  - Sin estancia actual
  - Próximo check-in mañana 16:00
- Cards de clima:
  - A/C encendido 22ºC
  - Regla esperada: apagado si no hay estancia
  - Acción recomendada: apagar ahora
- Cards consumo:
  - Actual 1,84 kW
  - Basal esperado 0,25-0,35 kW
  - Fuera de estancia acumulado hoy 6,2 kWh
- Alerta:
  - A/C activo sin reserva, severidad alta
  - Evidencias y acciones
- Recomendación de tarifa/potencia discreta:
  - “La potencia valle parece sobredimensionada para este apartamento. Revisar en optimización mensual.”
- Mini gráfico horario de consumo.

### 6) Informe mensual propietario

Nombre sugerido: `informe-mensual-propietario`

Contenido obligatorio:

- Informe para Marta Lago · Apartamento Areal · Abril 2026.
- Métricas:
  - Consumo total
  - Consumo fuera de estancia
  - Incidencias evitadas
  - Ahorro estimado
  - Días con climatización correcta antes de check-in
- Secciones:
  - Resumen ejecutivo para propietario
  - Incidencias detectadas y resueltas
  - Ahorro estimado por apagados automáticos/alertas
  - Recomendación tarifa/potencia
- CTA: Exportar PDF, Enviar por email, Copiar resumen.
- Debe parecer compartible con propietario, no dashboard interno.

### 7) Optimización tarifa/potencia

Nombre sugerido: `optimizacion-tarifa-potencia`

Contenido obligatorio:

- Pantalla secundaria/discreta.
- Mensaje: “Módulo complementario: no sustituye la operación diaria de climatización y consumo.”
- Tabla comparativa:
  - Apartamento
  - Tarifa actual
  - Potencia actual
  - Recomendación
  - Ahorro estimado mensual
  - Confianza
- Card “Actual vs recomendado” para VGO-014.
- Recomendaciones prudentes, no promesas exageradas.
- Sin foco en batería/arbitraje; si aparece, como “en estudio” pequeño.

### 8) Leads / solicitudes piloto

Nombre sugerido: `leads-solicitudes-piloto`

Contenido obligatorio:

- Vista interna simple de leads cualificados.
- Columnas:
  - Empresa
  - Contacto
  - Nº alojamientos
  - Dolor principal
  - Intereses
  - Estado contacto
  - Próxima acción
- Leads de ejemplo:
  - Costa Norte Stays — 48 alojamientos — clima entre reservas — piloto agendado
  - Rías Baixas Rentals — 83 alojamientos — informes propietario — llamada pendiente
  - UrbanStay Madrid — 120 alojamientos — consumo fuera de estancia — demo enviada
- Embudo pequeño: Nuevo, Cualificado, Demo, Piloto, Cerrado.
- CTA: Añadir lead, Programar demo.

### 9) Configuración piloto

Nombre sugerido: `configuracion-piloto`

Contenido obligatorio:

- Secciones:
  1. Integración calendario/PMS
  2. Reglas de clima
  3. Umbrales de consumo
  4. Notificaciones
  5. Usuarios/responsables
- Integraciones:
  - Hostaway conectado
  - Google Calendar conectado
  - Medidores Shelly 41/48 conectados
- Reglas clima:
  - Apagar A/C si no hay reserva activa
  - Pre-enfriar 45 min antes de check-in si temperatura >26ºC
  - Apagar calefacción 20 min después de check-out
- Umbrales:
  - Alerta alta >1,5 kW sin reserva durante 20 min
  - Alerta leve >0,45 kW sin reserva durante 60 min
- Notificaciones: email, WhatsApp/equipo operaciones, resumen semanal.

## Requisitos de generación

- Mantener consistencia visual entre pantallas.
- Cada pantalla debe tener contenido completo y realista.
- Incluir navegación para que se vea como un MVP completo.
- Renderizar para desktop; el HTML debe ser responsive.
- Crear nombres claros por pantalla.
- No mencionar comunidades/fincas como segmento.
- No vender “IA” como foco.
- No convertir tarifa/potencia ni batería/arbitraje en el core.
