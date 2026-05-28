# EnergyOS — Validación de Landing Page y Estrategia de Producto

**Fecha:** 2026-05-16  
**Tipo:** Validación de mercado y recomendaciones de landing  
**Enfoque:** Gestoras de alojamientos turísticos en España

---

## 1. Perfil del Cliente Objetivo

### Perfil primario: **Gestora de apartamentos turísticos**

- **Qué gestiona:** Entre 10 y 100+ apartamentos vacacionales en España (costera, urbana, rural)
- **Quién paga:** La gestora (OPEX) o el propietario (incluido en comisiones)
- **Perfil organizativo:** Equipo pequeño (2-10 personas), gestión manual o con PMS parcial
- **Rol de decisión:** Gerencia / dirección, a veces propietaria única
- **Dónde está:** Costa mediterránea, Canarias, interior urbano (Madrid, Barcelona, Sevilla)

### Perfil secundario: **Propietario individual con cartera pequeña**

- Gestiona directamente sus apartamentos sin empresa de gestión
- Busca herramientas que no requieran mucha configuración
- Su dolor principal: facturas sorpresa y falta de tiempo para revisar cada alojmaiento

### Perfil terciario: **Apartahotel o hotel boutique**

- 20-100 habitaciones
- Ya tienen ciertos sistemas de automatización (BMS, cerraduras inteligentes)
- Quieren optimización de energía más sofisticada

### Dolor #1 (el que más temen): **Factura de luz sin explicación**

El problema no es solo el coste, sino **no saber por qué**某些 apartamentos disparan el consumo, especialmente en temporada alta cuando hay más ocupación y más gasto. El miedo real: que un propietario pregunte por una factura y la gestora no tenga datos para explicarla. La gestión energetica es fundamentalmente un problema de **control operativo y transparencia**, más que de ahorro puro.

### Dolor #2: **Obras e instalación = caos**

Tradicionalmente, automatizar significaba pedir presupuestos, hacer obra, instalar hardware, configurar. Para una gestora con 20 apartamentos en distintos edificios, esto es un proyecto enorme. Hay un sesgo fuerte hacia soluciones que no requieran hardware nuevo o que se puedan instalar sin obras.

### Dolor #3: **No tienen visibilidad en tiempo real**

Casi ninguna gestora de apartamento vacacional tiene datos de consumo por alojamiento. Ven la factura total, no el desglose. Esto es un gaps operativo enorme.

### Dolor #4: **El mercado está normalizando los precios eléctricos**

Con la PVPC y los precios horários, una mesma gestores que antes tenía una tarifa fija ahora no sabe si paga mucho o poco. La complejidad del mercado eléctrico español (3 períodos, potencia contratada, cargosfixos, peajes) genera incertidumbre genuina.

### Dolor #5: **Tiempo operativo = dinero**

La gestora tiene horas limitadas. No quiere añadir una nueva herramienta compleja a su día. Quieren algo que funcione, que no requiera gestión Constantine.

---

## 2. Proceso de Decisión para SaaS en Este Segmento

1. **Problema identificado** → Ven una factura alta o un propietario se queja
2. **Búsqueda inicial** → Googledra "gestión energía apartamentos" o pregunta en grupos de WhatsApp de gestoras
3. **Evaluación** → Pide demo o piloto, usually free. El factor de decisión principal: **facilidad de instalación y tiempo hasta resultados**
4. **Compra** → Generalmente decisión del director/a, sin comité de compras
5. **Onboarding** → Miedo principal: "¿Cuánto tiempo me va a llevar configurar esto?"
6. **ROI visible** → Necesitan ver el ahorro en la primera factura, no en 6 meses

**Nota:** Este mercado responde mucho a la validación social: casos de éxito de gestoras similares, testimonios de otros players del sector. La desconfianza hacia vendors nuevos es alta porque han visto muchas promesas de startups que luego desaparecen.

---

## 3. Análisis Competitivo

### Competidor 1: **Linkener** (linkener.com)
- **Enfoque:** Gestión energética para hoteles y cadenas hoteleras
- **Modelo:** SaaS con equipo de soporte, enfoque enterprise
- **Fortalezas:** Producto maduro, equipo de asesor energiético, integración con sistemas hoteleros
- **Debilidades:** Enfocado a hoteles, no a apartamentos vacacionales; precio enterprise; onboarding largo
- **Pricing público:** No publicado — ventas consultiva
- **Gap:** No aborda el caso de gestoras de apartamentos vacacionales con 10-50 unidades

### Competidor 2: **Voltic** (voltic.es)
- **Enfoque:** Automatización de climatización e iluminación para hoteles y viviendas vacacionales
- **Modelo:** Hardware + software, instalación profesional
- **Fortalezas:** Ganador Premio EmprendeXXI 2026, producto específico para vivienda vacacional, integración PMS, normativa RITE 2026
- **Debilidades:** Requiere instalación/hardware; no optimización de tarifas ni reporting para propietarios
- **Pricing público:** Presupuesto custom
- **Gap:** No tiene módulo de optimización de tarifas ni reporting automático para propietarios. Es hardware, no solo software

### Competidor 3: **Akeptus** (akeptus.com)
- **Enfoque:** Reducción de facturas eléctricas para propietarios residenciales, sin hardware
- **Modelo:** SaaS puro, conecta a smart meter, optimización de tarifa
- **Fortalezas:** No requiere instalación física; modelo depricing claro (free + premium); UX simple
- **Debilidades:** Segmento residencial, no property managers; no tiene automatización basada en reservas; no tiene reporting para terceros
- **Pricing público:** Free tier + $14.99/mes
- **Gap:** No tiene modelo B2B para gestores de apartamentos

### Competidor 4: **Hyperplace** (tryhyperplace.com)
- **Enfoque:** Propietarios residenciales en USA, optimización solar + tarifas + heat pumps
- **Modelo:** Marketplace + SaaS, certificación de partners instaladores
- **Fortalezas:** Buena UX, focus en solar y tarifas; presencia USA clara
- **Debilidades:** Solo USA; no tiene modelo para property managers; no automatización de climatización por reservas
- **Pricing público:** Free check, luego servicio a través de partners
- **Gap:** No es relevante para el mercado español actual

### Competidor 5: **Polaroo** (polaroo.com)
- **Enfoque:** Gestión de suministros para alquiler vacacional (luz, agua, gas, internet, limpieza)
- **Modelo:** SaaS con módulos de control de gastos y automatización
- **Fortalezas:** Caso claro en gestión de suministros, integración con automatización (artículo sobre Controlá), público específico de vivienda vacacional; ahorra hasta 30% en planes anuales; casos de éxito como Numa Stays
- **Debilidades:** No tiene optimización de tarifas eléctricas por períodos horários; el enfoque es en controlar gastos recurring no en optimización energética activa; no tiene módulo de batería/arbitraje
- **Pricing público:** 30% descuento en planes anuales
- **Gap:** El módulo de energía está más enfocado a control de gastos que a optimización activa de consumo y tarifas

### Competidor 6: **Zerofy** (zerofy.net)
- **Enfoque:** Home Energy Management System (HEMS) para propietarios residenciales y prosumidores
- **Modelo:** SaaS con integración solar, baterías, smart home
- **Fortalezas:** Enfoque técnico robusto, compatible con múltiples sistemas; partners como energy companies
- **Debilidades:** Segmento residencial/professional, no property managers; no tiene modelo B2B; ningún foco en España
- **Pricing público:** Planes y pricing en web pero no visible claramente
- **Gap:** No hay presencia en el mercado español de alquiler vacacional

### Competidor 7: **Gemweb** (gemweb.es)
- **Enfoque:** Software de gestión energética para empresas
- **Modelo:** SaaS con módulos de contabilidad energética, gestión multisuministro, big data
- **Fortalezas:** Producto técnico con muchas funcionalidades; enfoque enterprise
- **Debilidades:** Sin foco en vivienda vacacional; UX probablemente compleja; pricing enterprise
- **Gap:** No hay producto específico para gestoras de apartamentos turísticos

### Resumen Competitivo

| Competidor | Foco | Hardware | Optimización Tarifas | Reporting Propietarios | Pilot/Piloto |
|------------|------|----------|----------------------|------------------------|---------------|
| Linkener | Hoteles | SaaS | Sí | Sí | No (sales) |
| Voltic | Vacacional + Hotel | Sí | No | No | Presupuesto |
| Akeptus | Residencial | No | Sí | No | Free tier |
| Hyperplace | Residencial USA | No | Sí | No | Free check |
| Polaroo | Vacacional | Partial | No | Parcial | Sí |
| Zerofy | Residencial | No | Sí | No | No |
| Gemweb | Enterprise | SaaS | Sí | Sí | No |

**Conclusión:** El mercado español de gestoras de alquiler vacacional está desatendido en la intersección de: (1) SaaS puro sin hardware obligatorio, (2) optimización de tarifas eléctricas por períodos horários, (3) reporting automático para propietarios, (4) automatización basada en reservas. EnergyOS está bien posicionado si se comunica correctamente.

---

## 4. Tamaño de Mercado

### España — Alojamientos de turismo vacacional (INE 2024)

- **Viviendas de uso turístico (VUT):** ~380,000 unidades (INE)
- **Establecimientos de apartamentos turísticos:** ~12,500 con ~130,000 plazas
- **Gestoras profesionales:** Estimado 2,000-3,000 gestoras activas en España con más de 10 apartamentos
- **Mercado direccionable (TAM):** ~€15-25M/año (basado en coste energético promedio de apartmaento vacacional: €1,500-2,500/unidad/año, con gestoras pagando un 2-5% del coste como SaaS)

### Segmentación prioritaria

1. **Gestoras costeras (Costa Brava, Mediterráneo, Canarias):** Mayor consumo energético (climatización), más dolor por facturas
2. **Gestoras urbanas (Madrid, Barcelona, Sevilla):** Menos climatización, más tarifas y reporting
3. **Gestoras de casas rurales:** Menos prioridad por volumen bajo

---

## 5. Validación de la Landing Page Actual

### Lo que funciona bien

1. **El hero copy** ("Reduce y controla la energía de tus alojamientos turísticos") es claro y directo
2. **El formato de 5 beneficios** es fácil de escanear y comunica el alcance completo
3. **La demo visual** (apartamento con ahorro 18%, alerta, reglas aplicadas) es efectiva — muestra el producto funcionando
4. **El formulario de piloto** tiene las preguntas correctas (alojamientos, dolor principal, intereses)
5. **El estimated fit dinámico** (basado en nº de alojamientos) es un buen pattern de qualification
6. **El precio "piloto"** reduce el riesgo percibido — nadie tiene que comprometerse con un contrato largo

### Lo que no funciona bien (y por qué importa)

1. **No hay prueba social visible** — ningún logo de gestora, ningún testimonio, ningún número de ahorros real. En un mercado donde la confianza es baja, esto es crítico. En la versión actual, no hay ningún elemento que diga "otros como tú ya lo usan".

2. **El módulo de batería/arbitraje se presenta como "Premium"** — esto puede ser confuso o intimidatorio para gestoras que no tienen batería. Puede que estén perdiendo leads que se desaniman al ver "premium" antes de entender el valor del conjunto.

3. **Falta la pregunta "¿Cuánto costará?"** — la landing no menciona pricing ni rangos. El piloto es el mecanismo de qualification, pero alguien que landing en la página sin rellenar el formulario necesita entender qué nivel de inversión implica. Un "desde €X/mes por X alojamientos" ayudaría.

4. **No hay ninguna mención de instalación o setup** — en un mercado donde el miedo a la complejidad es alto, sería valioso decir algo como "Sin hardware adicional, con tus contadores existentes" o "Configuración en 48 horas".

5. **El call-to-action "Solicitar diagnóstico" compite con "Solicitar piloto"** — hay dos CTAs distintos que pueden generar confusión. Hay que pick one y ser consistente.

6. **La sección de problema es correcta pero genérica** — "la energía se convierte en una incidencia operativa" es bueno, pero no specifics de quanto dinero desperdician. Un dato como "Una apartamento con climatización mal gestionada puede costar €400-800/año de más" sería más tangible.

7. **No hay evidencia de ROI específica** — la demo muestra "18% ahorro estimado" pero no hay contexto. ¿18% sobre qué base? ¿Cuánto dinero es eso? Comparado con gestoras similares.

8. **El formulario es demasiado largo para un primer contacto** — 8+ campos puede reducir el conversion en la primera visita. Considerar una versión corta (nombre, email, nº alojamientos) y luego qualificar en una segunda conversación.

---

## 6. Jerarquía de Mensajes Recomendada

### Primero — Dolor específico (no dolor genérico)

**Mensaje:** "La mayoría de las gestoras de apartamentos vacacionales en España pagan de más en energía sin saberlo. No por malo gestión, sino porque nadie les enseña dónde está el gasto."

**Por qué:** El mensaje actual ("la energía se convierte en una incidencia operativa") es verdadero pero no específica quanto dinero. Hay que hacer el dolor tangible.

**Alternativa mejor:**
- "Un apartamento con climatización sin control puede costar €600/año de más en temporada alta."
- "El 70% de las facturas de luz de apartamentos vacacionales tienen errores de potencia o tarifa."

### Segundo — Solución clara (no feature list)

**Mensaje:** "EnergyOS conecta tus reservas con el consumo real para que cada apartamento se gestione sóolo cuando es necesario: apagando cuando no hay reservas, alertando cuando algo consume de más, y optimizando la tarifa para que pagues menos."

**Por qué:** La gente no compra features, compra outcomes. "Conecto mis reservas con el consumo" es más claro que "automatización por reservas".

### Tercero — Prueba social y credenciales

**Mensaje:** "[Logo gestoras] — X gestoras ya validan su consumo con EnergyOS. Saving medio: 15-22% en climatización."

**Por qué:** En el segmento actual de EnergyOS (MVP), no hay muchos clientes. Opciones:
- Usar piloto early adopters con testimonios (aunque sean anónimos)
- Usar métricas de la propia plataforma: "En nuestros pilotos, el ahorro medio en el primer mes ha sido del 16%"
- Si no hay datos reales todavía, usar case studies hipotéticos pero realistic, claramente marcados como "en piloto"

### Cuarto — How it works (sin complejidad)

**Mensaje:** "3 pasos: Conectas tus datos (reservas, consumos, tarifas), nosotros analizamos y proponemos acciones, mides el ahorro en tu próxima factura."

**Por qué:** La complejidad asusta. Hay que demostrar que no es un proyecto de meses.

---

## 7. Missing Features / Pain Points en el Copy Actual

### 1. **Instalación zero-hardware** (no mentioned)

Many property managers won't read past "requires installation" or "needs hardware." This should be front and center.

### 2. **Tiempo hasta resultados** (no mentioned)

They want to know: "When will I see savings?" A clear answer like "First measurable results in your next electricity bill" reduces risk perception.

### 3. **Integración con PMS / canales** (not mentioned)

Property managers live in Channel Manager and PMS tools. If EnergyOS can connect with any PMS, it should be stated. If not yet, the roadmap should mention it.

### 4. **Cuantificación del ahorro** (too vague)

"Reduce 18%" is shown in the demo but no context: 18% of what? What's the euro value? A clearer framing: "Save €180-400 per apartment per year in climate control alone."

### 5. **Reporting to owners** (mentioned but could be stronger)

This is a key differentiator vs competitors like Voltic. The current copy mentions "Informes para propietarios" but doesn't explain what the owner sees or why it solves a real problem for the gestor.

### 6. **Competitivo de tarifas** (not explained)

"Optimización de tarifas" is mentioned but never explained. Property managers don't know what time-of-use tariffs are or why they matter. A simple explanation like "Move your consumption to cheaper hours — automatic savings without changing your habits" would help.

### 7. **Battery / arbitrage** (buried in benefits)

Battery arbitrage is actually a sophisticated differentiator but it's buried in benefit #5 as "Premium." It should either be positioned as a future roadmap capability ("Coming soon: turn your battery into an income source") or positioned as an advanced module for clients who already have solar+battery.

---

## 8. Recomendaciones de Conversión

### Lead Capture Best Practices para Este Segmento

1. **Formulario de alta conversión:** Nombre, email, nº alojamientos, dolor principal. Máximo 4 campos. El resto en llamada de qualification.

2. **Pilot offer como lead magnet:** El "diagnóstico gratuito de tu cartera" es un buen gancho. Reforzar el valor: "Recibe un informe de oportunidades de ahorro para tus X apartamentos — sin compromiso."

3. **Exit intent / scroll depth:** Para usuarios que no convierten, guardar el email con un lead magnet descargable (guía: "5 formas de reducir tu factura de luz en apartamentos turísticos").

4. **Chatbot / live chat:** Este segmento (gestoras pequeñas) responde bien a WhatsApp directo o chat. Si hay capacidad, ofrecer chat humano en horario laboral.

5. **Social proof placement:** Logos de gestoras cerca del hero y cerca del formulario — no solo al final.

6. **Pricing visible:** Even if "from pilot," a range like "From €X/month for up to 20 apartments" helps qualification and filters low-intent leads.

---

## 9. Roadmap de Contenido Sugerido

- **Landing actual:** Captura leads con piloto
- **Próximo:** Case study de primer piloto (datos reales anonymized)
- **Próximo:** Calculator de ahorro ("¿Cuánto podrías ahorrar? → [Calculadora]")
- **Content Marketing:** Blog posts targeting "gestión energética alquiler vacacional" para SEO

---

## 10. Summary: Qué Cambiar en la Landing

| Prioridad | Cambio | Impacto |
|-----------|--------|---------|
| Alta | Añadir prueba social (logos, testimonials, métricas pilot) | ↑ Conversión |
| Alta | Reforzar "sin hardware" / "sin obras" en hero | ↓ Frustración |
| Alta | Añadir pricing range o "desde €X/mes" | ↑ Qualification |
| Media | Simplificar formulario a 4 campos max | ↑ Conversion rate |
| Media | Hacer ROI tangible: "€300-600 ahorro/apartamento/año" | ↑ Credibilidad |
| Media | Explicar optimización de tarifas con ejemplo simple | ↑ Comprensión producto |
| Baja | Unificar CTAs a uno solo ("Solicitar piloto") | ↑ Claridad |
| Baja | Mover battery/arbitraje a "Próximamente" o roadmap | ↑ Claridad positioning |

---

*Documento preparado para validación de landing page EnergyOS. Datos de mercado basados en investigación pública de Mayo 2026.*