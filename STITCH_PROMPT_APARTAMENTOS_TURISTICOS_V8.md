# EnergyOS — Landing MVP para gestoras de apartamentos turísticos (Stitch v8)

Crea una landing page responsive de alta fidelidad para **EnergyOS**, un servicio B2B para gestoras profesionales de apartamentos turísticos en España.

## Objetivo de negocio
Convertir a gestoras que quieren controlar gestión energética y consumo entre reservas sin añadir complejidad operativa. La página debe parecer una herramienta real de operaciones para property managers, no una landing genérica.

## Idioma y tono
- Todo el copy en **castellano**.
- Tono profesional, concreto y orientado a operación, confort, ahorro y propietarios.
- Nada de copy centrado en IA, algoritmos, “smart magic” o promesas vagas.
- No afirmar integraciones PMS completas como si ya existieran; usar lenguaje honesto: calendario/reservas, conexión o importación cuando corresponda.

## ICP / badge piloto
- ICP recomendado: **gestoras con 20+ apartamentos turísticos**.
- Si necesitas una alternativa visual, puede aparecer “10+” solo como umbral mínimo, pero el badge principal debe ser: **“Piloto para gestoras con 10+ alojamientos”**.

## Posicionamiento principal
**Control operativo de gestión energética y consumo entre reservas**:
- preparar la gestión energética antes del check-in,
- pasar a bajo consumo tras el check-out,
- detectar consumo anómalo cuando no hay estancia,
- enviar alertas claras al equipo,
- generar un informe mensual realista para propietarios.

## Posicionamiento secundario
Optimización de tarifa eléctrica como beneficio secundario, discreto y claro. No debe dominar el hero.

## Premium / bajo estudio
Batería, arbitraje energético y optimización avanzada deben aparecer como **premium / bajo estudio** para carteras grandes. Debe ser un bloque pequeño al final, no una sección dominante.

## Estilo visual
- Modo claro.
- Profesional, premium, tipo Linear/Stripe, pero más operativo y SaaS B2B.
- Fondo blanco roto `#FAFAFA`, tarjetas `#FFFFFF`, bordes `#E5E7EB`.
- Verde esmeralda `#10B981` como acento principal.
- Ámbar `#F59E0B` para avisos.
- Rojo `#EF4444` para anomalías.
- Texto principal `#111827`, secundario `#6B7280`.
- Tipografía Inter; números con estilo tabular/monospace.
- Mucho aire, grid preciso, tarjetas limpias, sombras muy suaves.
- No usar stock inmobiliario genérico como protagonista.
- No usar estética oscura ni cyberpunk.

## Accesibilidad y responsive obligatorio
Diseña explícitamente para:
- **Mobile 375px**: nav compacta con logo, botón menú o CTA simplificado; CTAs del hero en columna; mockups apilados; formularios a una columna.
- **Tablet 768px**: grid 2 columnas cuando encaje; navegación legible.
- **Desktop 1440px**: layout amplio con hero en 2 columnas y mockups detallados.
- Contraste AA en textos y botones.
- Estados de foco visibles para enlaces, botones e inputs.
- Botones de al menos 44px de alto en mobile.
- No depender solo del color para estados: usar texto/labels/iconos.

## Estructura obligatoria

### 1) Top nav
Logo “EnergyOS” con icono simple de energía. Links:
- Cómo funciona
- Automatizaciones
- Informes
- Demo

CTA nav: **“Solicitar demo”**.
En mobile, mostrar logo + CTA compacto o menú; no romper layout.

### 2) Hero — copy obligatorio
Badge encima del headline:
**“Piloto para gestoras con 10+ alojamientos”**

Headline exacto o muy cercano:
**“Reduce y controla la energía de tus alojamientos turísticos”**

Subheadline debe mencionar reservas, energía e consumo:
**“Centraliza consumo, reservas, tarifas e informes para ahorrar, detectar anomalías y valorar baterías o arbitraje energético.”**

CTAs:
- Primario: **“Solicitar diagnóstico energético”**
- Secundario: **“Ver módulos de la app”**

Proof bar justo bajo CTAs:
**“Piloto en 3-5 viviendas · Sin obra inicial · Compatible con PMS/calendario”**

### 3) Mockup hero operativo
Visual hero a la derecha, estilo producto real, con una tarjeta/panel operativo. Debe incluir:
- lista de **5 apartamentos** con nombres reales de ejemplo:
  - Centro 1A
  - Playa 2B
  - Ático Sol
  - Marina 4C
  - Ronda 7
- estados visibles:
  - “Pre-check-in”
  - “Ocupado”
  - “Post-check-out”
  - “Alerta consumo”
  - “Bajo consumo”
- alerta roja concreta: **“Consumo alto sin reserva”**
- métrica grande: **“-18% consumo fuera de estancia”**
- mini timeline check-in/check-out con horas.
- acción operativa visible: “Enviar alerta”, “Pasar a eco” o “Revisar vivienda”.

Debe verse como un dashboard funcional, no como una ilustración abstracta.

### 4) Banda de confianza / ICP
Franja pequeña y sobria:
- “Pensado para equipos que gestionan rotación semanal y múltiples propietarios”
- Badges: “Piloto 3-5 viviendas”, “Alertas Telegram/WhatsApp”, “Calendario/PMS”, “Sin obra inicial”.
No sobredimensionar Airbnb/Booking ni afirmar integraciones profundas.

### 5) Tres pilares principales con micro-mockups
No usar cards genéricas. Cada pilar debe tener un micro-mockup UI pequeño y realista.

1. **Automatización por reservas**
   - Copy: “Activa clima a tiempo para que el huésped llegue a una vivienda preparada.”
   - Micro-mockup: reserva entra 16:00, clima objetivo 22ºC, acción programada 15:15.

2. **Optimización de tarifas**
   - Copy: “Reduce o apaga gestión energética cuando termina la estancia y la vivienda queda vacía.”
   - Micro-mockup: check-out 11:00, modo eco 11:20, consumo bajando.

3. **Baterías y arbitraje**
   - Copy: “Evalúa cuándo tiene sentido usar solar, batería o arbitraje entre horas valle y punta.”
   - Micro-mockup: alerta ámbar/roja con kWh fuera de estancia y botón “Avisar equipo”.

### 6) Cómo funciona
Tres pasos horizontales en desktop, apilados en mobile:
1. **Leemos reservas y calendarios** — check-ins, check-outs, ventanas entre estancias.
2. **Medimos y aplicamos reglas por vivienda** — sensores/medidores compatibles y reglas simples.
3. **Avisamos y resumimos** — alertas al equipo e informe mensual para propietarios.

Usar copy prudente: “conectamos o importamos calendario/PMS según el caso”, no prometer PMS falso.

### 7) Dashboard / informe mensual realista para propietarios
Sección con mockup grande de informe mensual. Debe reforzar que sirve para justificar gestión profesional ante propietarios.

El informe debe incluir datos realistas, no exagerados:
- “Ahorro estimado del mes: 42 €”
- “Consumo fuera de estancia: 118 kWh”
- “Horas de gestión energética evitadas: 31 h”
- “Top 3 anomalías”:
  1. Consumo alto tras check-out — Playa 2B — 7,8 kWh
  2. Termo activo vivienda vacía — Ronda 7 — 4,1 kWh
  3. Calefacción fuera de horario — Centro 1A — 3,6 kWh
- “Estado por apartamento” con 4-5 filas.
- “Recomendación para propietario”: texto breve y creíble.

### 8) Optimización de tarifa secundaria
Bloque más pequeño y discreto:
Título: **“Además, revisamos si tu tarifa encaja con el uso real”**
Mostrar comparativa simple:
- Tarifa actual: 0,19 €/kWh medio
- Tarifa recomendada: mejor para consumo nocturno / valle
- Ahorro estimado: 8-14 €/mes por vivienda según perfil
Dejar claro que es revisión/estimación, no promesa garantizada.

### 9) Card de tarifa clara y discreta
Incluir una card de precio simple, no dominante:
- Título: **“Piloto operativo”**
- Precio: **“Desde 99 €/mes + setup según viviendas”**
- Incluye:
  - 3-5 viviendas en piloto
  - alertas operativas
  - informe mensual
  - revisión inicial de consumo
- Nota: “Precio final según dispositivos existentes y alcance.”
Debe ser claro pero discreto; no convertir la página en pricing-first.

### 10) Premium / batería-arbitraje bajo estudio
Bloque final pequeño:
Título: **“Premium bajo estudio: batería y arbitraje para carteras grandes”**
Copy: “Para gestoras con consumos agregados relevantes, podemos simular batería, horarios de carga y oportunidades de arbitraje. Se evalúa caso a caso.”
Debe ocupar menos espacio que los pilares y el informe.

### 11) Formulario lead
Card final con título:
**“¿Gestionas 20+ apartamentos? Te mostramos dónde se escapa el consumo.”**

Campos:
- Nombre
- Email
- Teléfono
- Nº de apartamentos
- Ciudad
- PMS/calendario usado (opcional)

CTA: **“Solicitar diagnóstico energético”**
Texto de confianza: **“Sin compromiso. No tocamos instalaciones ni automatizaciones sin autorización.”**

### 12) Footer
Simple:
- EnergyOS
- “Automatización energética para alquiler turístico”
- Links básicos: Privacidad, Contacto, Demo

## Restricciones duras
- No mencionar comunidades de vecinos/fincas como caso principal.
- No hacer que la IA sea el centro de la propuesta.
- No usar “algoritmos” como promesa principal.
- No prometer integraciones PMS profundas si no están descritas como “calendario/PMS según el caso”.
- No usar arbitraje/batería como hero ni como sección dominante.
- No usar stock de apartamentos o edificios como protagonista.
- El hero debe vender gestión energética + consumo entre reservas.

## Entrega esperada
Una landing visualmente terminada, responsive, con componentes realistas, copy final, datos de ejemplo y jerarquía clara. Debe sentirse lista para enseñar a una gestora de apartamentos turísticos.