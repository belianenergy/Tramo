# Loop 3 — Design Review Tramo

## Veredicto

**Nota de diseño: 8.2/10.**  
Tramo ya se siente bastante más B2B profesional que SaaS genérico. La dirección "Industrial Precision M3" está bien entendida: crema cálido, ink oscuro, bordes finos, datos en mono, composición rectilínea y poco ornamento gratuito. La landing comunica infraestructura operativa, no "startup eco" ni dashboard falso de productividad.

El principal riesgo no es conceptual, sino de ejecución final: hay señales de Stitch/AI slop en el asset del logo, en algunos claims/copies genéricos, en el exceso de iconos/material symbols y en ciertos detalles técnicos del HTML que ensucian una pieza que, visualmente, va por buen camino.

## Paleta Industrial Precision M3

La paleta funciona. `#fff8f5`, `#fff1ea`, `#231a14`, `#984700`, `#e6813a`, `#ead8cd` construyen una identidad cálida-industrial con suficiente diferencia frente a fintech azul, climate green o SaaS morado. El sistema transmite energía, infraestructura y control sin caer en "verde sostenibilidad".

**Aciertos:**

- El fondo cream/paper da calidez y evita el blanco SaaS estándar.
- El ink `#231a14` tiene buen carácter editorial/técnico.
- Los bordes `#ead8cd` y superficies peach aportan precisión sin parecer wireframe.
- El orange signal `#e6813a` está asociado a alerta, acción y lectura de dato, lo cual es correcto para un producto energético.

**Riesgos:**

- El orange signal aparece mucho: CTAs, iconos, barras, anomalías, bordes, recomendaciones. Sigue siendo usable, pero empieza a perder jerarquía semántica. Si todo es señal, nada es señal.
- El teal `#00677f` está definido, pero apenas participa. Falta una segunda voz cromática para estados secundarios, integraciones, "ok técnico" o capas de sistema. Ahora el diseño depende demasiado del eje cream/orange.
- Hay verdes nativos (`green-500`, `green-600`) y grises Tailwind (`gray-400`) fuera del sistema. No rompen, pero bajan la sensación de producto diseñado.

**Recomendación:** mantener `#e6813a` solo para acción principal, anomalía/recomendación importante y uno o dos datos críticos por pantalla. Usar `#00677f` para integraciones/sistema/telemetría y normalizar verdes/grises como tokens propios.

## Tipografía

La combinación **Plus Jakarta Sans + Inter + JetBrains Mono** es adecuada y coherente con el brief. Plus Jakarta da presencia contemporánea sin parecer consumer. Inter resuelve cuerpo y formularios. JetBrains Mono aporta credibilidad en KPIs, códigos de propiedad, CUPS, precios, fechas y tablas.

**Lo que funciona:**

- Los labels caps en JetBrains Mono ayudan a que los módulos parezcan instrumentación.
- Los datos (`18.4 kW`, `0.142 €/kWh`, `MAYO 2026`, códigos tipo `VGO-014`) están bien colocados en mono.
- La jerarquía de H1, H2, cards y dashboard es clara.

**Lo que ajustaría:**

- Hay demasiado uppercase pequeño (`text-[10px]`) repartido por toda la landing. Es parte del lenguaje industrial, pero usado en exceso puede fatigar y parecer plantilla.
- El `display-lg` con letter spacing negativo en la config contradice la regla de diseño base de mantener letter spacing a 0. No es dramático, pero conviene corregirlo si esto pasa a producción.
- Algunos bloques mezclan `font-label-caps` con overrides manuales (`text-[10px]`, `tracking-widest`, `font-black`), reduciendo consistencia.

## Logo

La intención del logo es buena: monoline bracket segmentado con punto naranja. Encaja con "tramo", medición por intervalos, infraestructura y energía operacional.

El problema está en el asset final: aparece como PNG base64 enorme, no como SVG limpio. Eso se siente menos premium y menos controlado. Además, el mismo logo se repite en header y footer con una cadena base64 gigantesca, lo que es mala señal para mantenibilidad y nitidez.

**Recomendación:** convertir el logo a SVG real, auditable y optimizado. Debe renderizar nítido a 24, 32 y 48 px. El punto orange tiene que leerse como "signal", no como adorno accidental.

## Jerarquía Visual

La secuencia narrativa está bien construida:

1. Hero con promesa y dashboard.
2. Tríptico de dolores.
3. Arquitectura de datos.
4. Módulos.
5. Dashboard de prueba.
6. Seguridad/piloto.
7. Formulario cualificado.

Esto tiene lógica comercial y reduce la sensación de landing decorativa. La jerarquía más fuerte está en el hero y en el dashboard consolidado. El usuario entiende rápido que Tramo cruza reservas, CUPS, sensores y tarifas para operar cartera turística.

**Problema principal:** el headline final del hero no coincide con el brief. El brief pide "Controla la energía de tu cartera turística"; el HTML usa "Convierte la energía de tu cartera turística en margen operativo." Es una frase buena, pero más abstracta y más cercana a SaaS de conversión. Para Tramo, "controla" es más directo, más operacional y más defendible.

## Densidad de Datos

La densidad es uno de los puntos fuertes. El diseño muestra suficientes datos para parecer producto real: propiedades (`VGO-014`, `COR-007`), estados, consumo, precio OMIE, kWh fuera de reserva, ahorro estimado, CUPS, PMS, Datadis, alertas.

No se siente vacío ni "dashboard decorativo". Hay una capa de operación real: incidencias, limpieza, propietarios, potencia contratada, informes mensuales.

**Pero:** algunos datos todavía parecen maqueta:

- `42 EUR EST.` debería localizarse como `42 € est.` o `42,00 € est.`.
- `Real-time` y "Industrial Precision in Energy Operations" mezclan inglés innecesario.
- "Atribución 100% verificable" es fuerte; mejor "Atribución trazable" o "Datos trazables por reserva".
- "Monitorización en tiempo real segundo a segundo" puede sonar excesivo si no es técnicamente cierto.

## Uso del Orange Signal `#e6813a`

El naranja está bien elegido. Da energía sin parecer warning rojo ni sostenibilidad verde. En botones principales y anomalías funciona especialmente bien.

El uso actual es algo amplio. Aparece como:

- CTA principal.
- KPI grande.
- Iconos de sistema flow.
- Barras de gráfico.
- Bordes hover.
- Recomendaciones.
- Estado anomalía.
- Radio/focus de formulario.

Esto hace que el color pase de "signal" a "color de marca genérico". Para mantener precisión industrial, el naranja debe ser más escaso y más significativo.

**Regla recomendada:** orange = acción/recomendación/anomalía. Teal = integración/sistema/flujo. Ink/border/surface = estructura. Error red solo para riesgo operativo real.

## Consistencia

La consistencia visual general es alta: bordes rectos, cards sin radius, grid sutil, superficies cálidas, tipografía por rol y módulos con patrón repetido.

Puntos que bajan consistencia:

- Doble import de Material Symbols.
- Logo en PNG base64 en vez de SVG.
- Uso de colores Tailwind directos fuera de tokens (`green-500`, `gray-400`, `green-600`).
- Sombras puntuales (`shadow-xl`, `shadow-sm`) que a veces suavizan demasiado la estética industrial.
- Iconos grandes en módulos 2-4 con color muy apagado; parecen placeholders.
- El footer dice `© 2024` aunque el resto usa mayo 2026.

## ¿Evita AI Slop?

**Mayormente sí, con excepciones claras.**

Evita AI slop porque:

- Hay dominio específico: PMS, Datadis, CUPS, OMIE, reservas, alojamientos, propietarios.
- La propuesta visual no es genérica: no hay gradientes morados, blobs, cards redondeadas sin criterio ni claims climate vagos.
- La estructura cuenta un flujo operacional concreto.
- La densidad de datos parece pensada para una gestora, no para una landing de plantilla.

Todavía huele a Stitch/AI en:

- Asset base64 enorme del logo.
- Copy algo grandilocuente: "Inteligencia Operativa Energética", "Seguridad y Confianza Industrial", "Arquitectura de Datos Unificada".
- Algunos iconos Material usados como relleno visual.
- Dashboard sin suficientes controles reales de producto: filtros, selector de propiedad, intervalo temporal, acciones de alerta.
- Batería/arbitraje aparece solo como pregunta en formulario, no como upsell visual en el producto, pese al brief.

## Encaje B2B Profesional

El diseño sí se siente B2B profesional para gestoras de apartamentos turísticos con 10-20+ unidades. Es más cercano a herramienta operativa que a página aspiracional. La ausencia de ilustraciones genéricas y el uso de datos ayudan mucho.

Para subir de 8.2 a 9:

1. Sustituir el logo PNG base64 por SVG limpio.
2. Reducir el uso del orange signal y activar el teal como color secundario funcional.
3. Reescribir claims demasiado absolutos o genéricos.
4. Añadir una presencia clara de batería/arbitraje como upsell, no como promesa core.
5. Convertir el dashboard simulado en una vista más "producto": filtros, tabs, acciones, estados y microcopy operativo.

## Conclusión

Tramo tiene una dirección visual sólida y diferenciada. La paleta, tipografía y densidad de datos sostienen una identidad industrial-profesional creíble. No parece una landing SaaS de IA genérica. El trabajo pendiente está en limpiar ejecución, afinar semántica cromática, bajar claims y reforzar producto real.

**Decisión recomendada:** avanzar con esta dirección, pero hacer una pasada de producción visual antes de usarla como referencia definitiva.
