## Deseño — Loop 1

### Veredicto: CAMBIOS

O landing xa está na dirección correcta para Tramo: cream/paper/ink/orange, foco en carteira turística, "fuera de reserva" above the fold, módulos reais e narrativa máis madura que as versións xenéricas. Aínda así, visualmente queda por baixo da ambición marcada en `CEO_VISION_LANDING.md`: o hero dashboard non parece suficientemente vivo, os gráficos son máis decorativos que operativos e a enerxía visual queda demasiado plana fronte á referencia Aura v5.5.

### Puntuacións

1. **Impacto visual xeral — 6.5/10.** A composición é limpa e creíble, pero demasiado estática. O screenshot transmite produto serio, non "wow moment".
2. **Paleta cream/paper/ink/orange — 7.5/10.** Está ben aplicada: fondo paper, tinta marrón/ink e laranxa de acción. Falta máis contraste editorial e máis uso intencional do ink para dar gravidade Sourceful.
3. **Xerarquía Sourceful 60% / Analytics 25% / Orderful 15% — 7/10.** A estrutura e a paleta cumpren bastante Sourceful; os paneis de datos cobren Analytics; a secuencia CTA/pain/system/proof/form cobre Orderful. Pero o peso visual do dashboard non chega ao 25% prometido porque os datos non se senten interactivos.
4. **Hero — 6/10.** O mock dashboard ten vocabulario real: 32 alojamientos, 18.4 kW, OMIE, VGO-014, 4.2 kWh, informe Abril. Pero parece unha card estática, non un dashboard operativo. Hai `group-hover` só en sombra da alerta e non se ve conexión hover alerta-chart-row.
5. **Gráficos e datos — 5.5/10.** Hai barras, donut, mini chart e táboa, pero sen eixes, timestamps, tooltips, timeline de reserva nin relación clara entre alertas e consumo. Esteticamente correctos, funcionalmente superficiais.
6. **Tipografía — 8/10.** Cumpre ben: Plus Jakarta Sans para headings, Inter para corpo e JetBrains Mono para métricas/labels. A xerarquía é consistente, aínda que algunhas labels pequenas perden presenza no screenshot.
7. **Módulos — 6.5/10.** Os módulos están ben seleccionados e con microdatos útiles, pero visualmente son bloques similares. Precisan máis variedade, mellor densidade de produto e estados accionables.
8. **Comparación con Aura v5.5 — 6/10.** É máis acertado para Tramo pola paleta clara e a narrativa específica, pero é peor visualmente: Aura ten máis intensidade, contraste, sensación live e produto máis premium.
9. **Comparación con Restro v5 — 7/10.** Ten máis detalle funcional real que Restro: CUPS, OMIE, alertas, carteira, módulos e dashboard consolidado. Restro segue sendo máis pulido no hero e máis comercialmente lixeiro.
10. **Secuencia narrativa — 7.5/10.** Flúe ben: hero, pains, system flow, módulos, dashboard proof, trust e form. A orde está mellor que antes; falta que cada sección suba de intensidade visual en vez de manter o mesmo ritmo plano.

### Top 3 issues visuais

1. **O hero non ten o momento interactivo central.** A visión pedía hover conectando alerta, segmento de chart e row de propiedade. Agora só hai unha alerta con sombra e un punto live, insuficiente para vender o "decision system".
2. **Os gráficos parecen placeholders.** As barras e donuts dan lectura rápida, pero non teñen timestamps, contexto de reserva, P1/P2 real nin comparación actual/recomendado suficientemente visual.
3. **A páxina é demasiado uniforme.** Cream + bordes + cards funciona, pero todas as seccións teñen unha cadencia parecida. Falta unha sección proof máis memorable e máis contraste entre historia editorial, produto live e conversión.

### Cambios requeridos

- Converter o hero dashboard nun estado interactivo visible: row VGO-014, alerta "4.2 kWh fuera de reserva", curva horaria e impacto "42 EUR est." deben iluminarse xuntos en hover.
- Engadir timeline de reserva no hero: `checkout 11:00`, `consumo 13:10-16:40`, `vacío`, `sin reserva activa`.
- Mellorar o bloque OMIE/tarifa con barras P1/P2: `P2 actual 4.6 kW` vs `recomendado 3.3 kW`, con hover propio.
- Facer o dashboard de proof máis real: eixes, rangos horarios, cola de accións, owner report preview e estados máis accionables.
- Dar máis contraste Sourceful: máis ink para títulos/separadores, menos cards brancas repetidas, máis sensación de infraestrutura editorial.
- Elevar os módulos con microinteraccións ou estados diferenciados: anomalía, recomendación tarifaria, regra por reserva e informe propietario non deben parecer a mesma card con distinto icono.
- Manter a secuencia actual, pero facer que cada bloque teña unha función visual clara: pain emocional, sistema explicativo, módulos concretos, proof operativo, trust e captura.
