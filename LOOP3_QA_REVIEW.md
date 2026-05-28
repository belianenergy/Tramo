# LOOP3 QA Review - Tramo Landing

Revisión sobre `LOOP3_BRIEF.md` y `stitch-tramo-definitivo.html`. No se hicieron cambios de código.

## Veredicto

La landing tiene una buena base visual y narrativa, pero no está lista para producción ni para tráfico pagado sin una pasada de hardening. Los riesgos principales son: dependencia de Tailwind CDN, formulario no funcional/no validado, navegación rota, claims numéricos sin soporte, accesibilidad floja en formularios/iconos/contraste, y responsive móvil incompleto en zonas críticas.

## Bloqueantes antes de publicar

1. **Formulario no envía a ningún sitio**
   - `<form>` no tiene `action`, `method`, handler JS, integración CRM ni feedback de éxito/error.
   - El botón submit recarga la página por defecto o no hace nada útil según entorno.
   - No hay consentimiento real enlazado a privacidad.

2. **Campos sin validación**
   - Ningún campo usa `required`.
   - Email solo tiene `type="email"`, insuficiente si no hay validación de negocio.
   - `Nº Alojamientos` no tiene `min`, `step`, placeholder ni ayuda. Para el target 10-20+ debería filtrar o avisar.
   - Radios sin valor (`value`) y sin opción por defecto. Si se enviara el formulario, `datadis=on` y `batteries=on` serían datos pobres.

3. **Labels mal asociados**
   - Los `<label>` del formulario no tienen `for`, y los inputs no tienen `id`/`name`.
   - Salvo los radios envueltos en label, la mayoría de campos no quedan correctamente conectados para lectores de pantalla ni para envío de datos.

4. **Navegación rota**
   - Navbar y footer usan `href="#"`.
   - “Diagnosticar”, “Diagnosticar mi cartera” y “Ver dashboard demo” son botones sin acción.
   - Solo existe `id="contacto"`, pero ningún CTA apunta ahí.

5. **Tailwind CDN en producción**
   - `https://cdn.tailwindcss.com` está pensado para prototipos, no producción.
   - Genera CSS en runtime, penaliza rendimiento, estabilidad visual y CSP.
   - La config inline impide cachear bien el CSS.

6. **Logo inline enorme duplicado**
   - Hay dos imágenes base64 muy grandes en el HTML, una en header y otra en footer.
   - El archivo pesa 105 KB según brief, pero el HTML contiene blobs base64 muy extensos y duplicados; esto bloquea parsing, no cachea como asset independiente y complica mantenimiento.

## Accesibilidad

1. **Iconos Material no ocultos**
   - Muchos `<span class="material-symbols-outlined">` son decorativos pero no tienen `aria-hidden="true"`.
   - Los iconos de settings/account son interactivos visualmente (`cursor-pointer`) pero no son botones, no tienen `tabindex`, `aria-label`, ni acción.

2. **Contraste potencialmente insuficiente**
   - Textos pequeños `text-[10px]` y `text-[11px]` sobre fondos crema/grises pueden fallar WCAG, especialmente `opacity-50`, `opacity-60`, `text-on-surface-variant`, `bg-primary-container/10`.
   - `primary-container #e6813a` con texto blanco parece flojo para CTAs y métricas. Revisar ratio exacto; probablemente no llega a AA para texto normal.
   - Estados codificados solo por color en dashboard: verde/gris/naranja/error. Hay texto en tabla, pero la curva y leyenda dependen mucho del color.

3. **Foco visible debilitado**
   - Inputs usan `outline-none` y solo cambian borde. Falta `focus:ring` claro y consistente.
   - Botones y enlaces dependen de hover; no hay estilos `focus-visible`.

4. **Estructura semántica parcial**
   - Hay `h1`, `h2`, `h3`, pero algunos títulos visuales usan `h4` o `p` sin estructura clara.
   - La tabla del dashboard tiene `<th>`, pero le falta `scope="col"` y caption/descripción.
   - Gráficas construidas con divs no tienen alternativa textual.

5. **Idioma**
   - `lang="es"` correcto.
   - Mezcla de inglés: “Status”, “Real Time”, “Industrial Precision in Energy Operations”. Puede ser deliberado, pero para España B2B conviene reducir si no aporta.

## Responsive / Layout

1. **Header móvil sobrecargado**
   - Navbar se oculta en mobile, pero siguen visibles CTA “Diagnosticar” + settings + account. En pantallas estrechas puede apretar logo y texto.
   - No hay menú móvil ni navegación alternativa.

2. **Hero con tipografía fija grande**
   - `display-lg` es 48px fijo. En móvil puede ocupar demasiado y crear cortes incómodos.
   - El brief pedía headline “Controla la energía de tu cartera turística”, pero el HTML usa otro headline más largo. La versión actual puede desbordar mejor/peor según viewport.

3. **System flow puede romper en mobile**
   - La salida final usa `flex justify-center gap-24` sin breakpoint; tres bloques con gap fijo pueden desbordar en móvil.

4. **Dashboard product proof**
   - Contenedor `h-[500px]` fijo. En móvil, tabla + panel en columna dentro de altura fija puede cortar contenido.
   - `overflow-hidden` en la sección y contenedores puede ocultar información en pantallas pequeñas.

5. **Formulario**
   - El bloque interno `md:col-span-2 grid grid-cols-2 gap-6` no baja a una columna en móvil. Las dos preguntas de radio quedan apretadas.
   - `p-12` del card de formulario es alto para mobile.

6. **Footer**
   - Links en `flex gap-8` sin `flex-wrap`; pueden desbordar en móvil.

## Copy / Claims / Integridad de datos mock

1. **Claims demasiado fuertes para un producto en validación**
   - “elimina el desperdicio energético sin intervención manual” suena absoluto y difícil de defender.
   - “Visibilidad total segundo a segundo” promete granularidad técnica que puede depender de hardware, Datadis, APIs o polling.
   - “Atribución 100% verificable” es un claim fuerte. Mejor “trazable” o “basada en datos”.

2. **Métricas mock parecen reales**
   - 18.4 kW, 0.142 €/kWh, 4.2 kWh, 42 EUR, 180 €/año, 342,10 €/mes, 412 kWh, 3 acciones, 32 alojamientos.
   - No hay disclaimer de “datos simulados” en dashboards ni ejemplos.
   - Si se usa para validar mercado, estos números pueden inducir expectativas falsas.

3. **Inconsistencias de posicionamiento**
   - Brief dice headline definido: “Controla la energía de tu cartera turística”. HTML usa “Convierte la energía de tu cartera turística en margen operativo.”
   - Brief dice batería como upsell visual, no promesa core. El formulario pregunta “¿Usas baterías?”, pero no hay explicación suficiente de que es opcional/upsell.
   - Brief dice target 10-20+ unidades; hero dice 10+ y dashboard dice 32. Está bien como ejemplo, pero conviene alinear.

4. **“Casos de éxito” en navegación**
   - Hay enlace a “Casos de éxito” pero no existe sección ni casos reales. Riesgo de parecer humo.

5. **Datos sensibles**
   - Copy dice “No solicitamos credenciales sensibles”, bien.
   - Pero “Acceso a Datadis vía autorización CUPS” puede requerir explicar autorización, consentimiento y protección de datos con más precisión.

## SEO básico

1. **Faltan metas esenciales**
   - No hay `meta name="description"`.
   - No hay canonical.
   - No hay Open Graph/Twitter cards.
   - No hay favicon.

2. **Title mejorable**
   - “Inteligencia Operativa Energética para Gestión Turística” es claro, pero podría incluir “apartamentos turísticos” para búsqueda.

3. **Enlaces vacíos**
   - `href="#"` da mala señal de calidad y UX.

4. **Sin datos estructurados**
   - No hay schema `Organization`/`SoftwareApplication`, opcional pero útil cuando haya contenido estable.

## Rendimiento / Técnica

1. **Dependencias externas bloqueantes**
   - Tailwind CDN, Google Fonts y Material Symbols cargan desde terceros.
   - Material Symbols está duplicado dos veces.
   - No hay `preconnect` a `fonts.googleapis.com` / `fonts.gstatic.com`.

2. **HTML monolítico**
   - CSS config, imágenes base64 y markup están todo en un único archivo.
   - Esto sirve para Stitch/prototipo, pero dificulta cache, minificación, CSP y mantenimiento.

3. **Animaciones**
   - `animate-pulse` en alerta puede ser molesto y no respeta `prefers-reduced-motion`.

4. **Sin lazy loading**
   - Las imágenes base64 no aplican `loading="lazy"` ni cache externa.

## Recomendaciones prioritarias

1. Conectar CTAs: botones principales a `#contacto`, demo a sección dashboard, navbar a anchors reales.
2. Convertir formulario en funcional: `name`, `id`, `for`, `required`, `value`, `min`, validación, endpoint/CRM, mensajes de estado y enlace real a privacidad.
3. Marcar todo dato simulado como demo o sustituir por rangos/ejemplos conservadores.
4. Rebajar claims absolutos: “elimina”, “segundo a segundo”, “100% verificable”.
5. Compilar Tailwind en build estático y extraer logo/fuentes/assets.
6. Corregir responsive móvil: header, system flow, dashboard fijo, radios, footer.
7. Pasar auditoría de contraste real con colores finales; especialmente naranja sobre blanco/texto blanco.
8. Añadir SEO mínimo: description, canonical, OG, favicon.

## Estado

Como prototipo de validación visual: aceptable. Como landing pública captadora: no publicaría todavía sin resolver los bloqueantes de formulario, navegación, claims y rendimiento.
