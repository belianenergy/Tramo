# GStack AutoPlan — Auditoría visual completa Tramo

**Data:** 2026-06-01  
**Scope:** `/home/mauro/.openclaw/workspace-local/energyos`  
**Servidor auditado:** `http://localhost:3001`  
**Modo:** CEO -> Design -> Eng -> DX, con 12 ciclos de revisión  
**Veredicto:** Non está en 96/100. Estado real estimado: **72/100 visual**, **78/100 produto/copy**, **70/100 mobile/app polish**.

## Evidencia capturada

- Folla de contacto de páxinas: [contact-sheet-pages.jpg](visual-audit-2026-06-01/contact-sheet-pages.jpg)
- Folla de contacto de seccións: [contact-sheet-sections.jpg](visual-audit-2026-06-01/contact-sheet-sections.jpg)
- JSON técnico de capturas: [capture-report.json](visual-audit-2026-06-01/capture-report.json)
- Carpeta completa: [screenshots/](visual-audit-2026-06-01/screenshots/)

Capturáronse **68 imaxes**: páxinas completas, viewport desktop/mobile e seccións individuais de landing e prezos.

## Resumo executivo

A web ten unha base funcional e unha dirección prometedora, pero aínda non parece unha web de produto B2B premium. O maior problema non é só un bug visual puntual: é que a landing, `/precios` e a app interna parecen saír de iteracións distintas. Hai inconsistencias de tipografía, densidade, cor, xerarquía, nomes, acentos e promesa comercial.

O posicionamento correcto debería ser:

> Tramo é unha capa operativa para xestoras de apartamentos turísticos que converte datos de CUPS, reservas e tarifas nunha cola diaria de decisións: que consumo se atribúe, que custo se pode reducir e que informe pode defenderse ante propietario.

Agora mesmo a web ás veces vende isto, pero tamén se dispersa en claims soltos, hardware, batería, “todo para gestoras”, CRM, comunidades de vecinos e pricing sen unha historia única.

## Premise Challenge

**Premisa actual implícita:** “A web xa está case lista, só falta pulido visual.”  
**Corrección:** Non. Falta unha pasada de produto e narrativa. O visual evidencia que a arquitectura de mensaxe non está pechada.

**Premisa correcta:** “Antes de lanzar, hai que unificar a historia comercial e converter a web nun fluxo de compra B2B: problema -> método -> evidencia -> diagnóstico -> piloto.”

## 12 ciclos de revisión

### Ciclo 1 — CEO / ICP e modelo de negocio

**Achado:** A landing fala de carteras turísticas, pero a app tamén mostra fincas/comunidades de vecinos. Iso abre demasiado o ICP e reduce precisión.

**Decisión:** O ICP público debe ser xestoras profesionais de apartamentos turísticos con 15-100 unidades. Fincas pode existir como módulo futuro ou demo interna, pero non debe contaminar a narrativa inicial.

**Acción:** Retirar ou ocultar `/app/fincas` do fluxo público/demo principal ata que exista unha narrativa separada.

### Ciclo 2 — CEO / Oferta

**Achado:** “Calcula tu ahorro antes de decidir” é correcto, pero débil como headline de pricing. Parece calculadora SaaS xenérica.

**Novo enfoque recomendado:**

> Diagnostica cuánto margen energético pierde tu cartera cada mes.

Subcopy:

> Tramo cruza consumo, reservas y tarifa para estimar ahorro por apartamento, detectar consumo fuera de estancia y preparar un piloto accionable sin instalar hardware al inicio.

### Ciclo 3 — Hero

**Achados visuais:** O hero da landing está máis afinado que o resto, pero ten un bug de texto: `turísticaen` aparece unido no heading extraído. O hero comunica marxe, pero a visual dereita é demasiado pálida e pouco contundente.

**Acción:** Corrixir espazo no H1 e facer que o bloque visual pareza unha “cola de decisións” real, non unha maqueta suave.

### Ciclo 4 — Sección problema

**Achado:** “Pagas energía que nadie te atribuye” é boa idea, pero a sección queda demasiado baleira e centrada. Non aproveita exemplos concretos.

**Copy recomendado:**

> El problema no es gastar energía. Es no saber qué reserva, apartamento o hábito operativo la generó.

Engadir 3 probas:

- Checkout rematado, termo aceso 4 horas.
- Potencia contratada igual en tempada baixa e alta.
- Propietario pide explicación e só hai factura agregada.

### Ciclo 5 — Workflow “Detectar, priorizar, aprobar, informar”

**Achado:** Esta é a mellor sección conceptual da landing. Pero sofre overflow e non ten suficiente presenza visual.

**Decisión:** Debe converterse no eixo principal da web. É o produto real.

**Acción:** Elevala despois do hero ou como continuación inmediata do problema. Facela máis densa e menos decorativa.

### Ciclo 6 — Sección “Todo lo que necesita una gestora profesional”

**Achado:** Non aporta o suficiente. Visualmente aparece moi pálida e comercialmente é xenérica.

**Decisión:** Eliminar ou fusionar. Se queda, debe converterse en “Qué decisiones genera Tramo cada mañana” con outputs reais.

### Ciclo 7 — Hardware / batería

**Achado:** A sección hardware está demasiado presente para unha venda que debería entrar por diagnóstico de datos. Pode facer pensar que Tramo require instalación física desde o día 1.

**Decisión:** Hardware e batería deben ser expansión, non promesa inicial.

**Copy recomendado:**

> Empieza con datos. Añade sensores solo donde el diagnóstico demuestre fuga.

### Ciclo 8 — Integracións

**Achado:** “Conecta con tu ecosistema actual” aparece baleira. Non dá confianza técnica.

**Acción:** Cambiar por unha sección concreta:

> Datos que cruzamos en el piloto

Cards:

- CUPS / Datadis: curva horaria.
- PMS / reservas: estancia, checkout, ocupación.
- Tarifa / potencia: P1/P2/P3, término fijo.
- Reglas operativas: ACS, climatización, standby.

### Ciclo 9 — Pricing

**Achado crítico:** `/precios` non comparte estilo nin xerarquía coa landing. A páxina de prezos tiña overflow grave no texto `€/apartamento/mes`; xa foi corrixido, pero segue visualmente máis bruta que a landing.

**Decisión:** Crear unha fonte única de pricing e compoñente compartido para landing + `/precios`.

**Nova estrutura:**

- Headline: “Diagnóstico primero. Plan por apartamento después.”
- Calculadora máis compacta.
- Plans como “desde X €/apartamento/mes”.
- Aforro como rango mensual por tramo, non un número anual solto.
- Método de cálculo xusto debaixo.

### Ciclo 10 — Proba e confianza

**Achado:** Falta unha sección clara de método e evidencia. Os claims aparecen, pero o comprador B2B precisa saber como se calculan.

**Acción:** Engadir sección “Cómo calculamos el ahorro”:

1. Consumo horario real.
2. Reserva/ocupación.
3. Tarifa e potencia.
4. Acción recomendada.
5. Estimación prudente.

### Ciclo 11 — App interna

**Achado:** As páxinas internas teñen máis densidade operativa, pero hai problemas:

- App interna e landing non comparten calidade visual.
- Varias páxinas teñen acentos ausentes: “anomalia energetica”, “Bateria”, “Configuracion”, “decision”, “critica”.
- `/app/fincas` parece outra liña de produto.
- Mobile é utilizable nalgunhas páxinas pero non refinado.

**Acción:** Pasada de localización/acento e navegación: demo principal debe centrarse en Dashboard, Operacións, Informe, Advisor e Leads. Fincas queda fóra do relato inicial.

### Ciclo 12 — Responsive, DX e QA visual

**Achado técnico:** Build e typecheck non bastan. A páxina de prezos pasaba build mentres estaba rota visualmente. Detectáronse overflows en landing, dashboard, advisor, arbitrage e fincas móbil.

**Acción obrigatoria:** Engadir script de QA visual con Playwright:

- Desktop 1440.
- Tablet 768.
- Mobile 390.
- Check de `scrollWidth > clientWidth`.
- Capturas de landing, `/precios`, dashboard e operacións.

## Páxinas revisadas

### `/`

**Estado:** 74/100.  
**Fortalezas:** hero, narrativa de marxe, workflow.  
**Debilidades:** pálida, seccións xenéricas, overflows, pricing e hardware con demasiada presenza, algunhas seccións non aportan.

### `/precios`

**Estado:** 68/100 antes do fix, 76/100 despois do fix de overflow.  
**Problema:** Non parece a mesma marca que a landing. Necesita compoñente compartido e máis método.

### `/app/dashboard`

**Estado:** 78/100 desktop, 68/100 mobile.  
**Problema:** Boa intención de command center, pero falta acabado mobile e hai pequenos overflows.

### `/app/operations`

**Estado:** 76/100.  
**Problema:** É unha das páxinas máis importantes para explicar valor, pero o copy ten acentos ausentes e a xerarquía aínda non parece “cola de decisións aprobables”.

### `/app/informe`

**Estado:** 80/100.  
**Fortaleza:** Encaixa moi ben co modelo de negocio: informes defendibles para propietarios.

### `/app/advisor`

**Estado:** 76/100.  
**Fortaleza:** Contratos e P1/P2/P3 son relevantes.  
**Problema:** Overflow pequeno en select; falta contexto comercial.

### `/app/arbitrage`

**Estado:** 70/100.  
**Problema:** Batería/OMIE é premium, pero agora parece unha promesa demasiado avanzada para o wedge inicial.

### `/app/fincas`

**Estado:** 55/100 dentro deste produto.  
**Problema:** Cambia o ICP. Recomendo sacala da demo principal.

### `/app/leads`

**Estado:** 70/100.  
**Problema:** Funciona como CRM interno, pero non aporta á demo comercial salvo que se explique como pipeline.

### `/privacidad` e `/aviso-legal`

**Estado:** suficiente para piloto, non final.  
**Problema:** ton provisional. Antes de produción deben ter datos reais e revisión legal.

## Seccións da landing que non aportan ou deben cambiar

1. **“Todo lo que necesita una gestora profesional”** — eliminar ou transformar en outputs diarios concretos.
2. **Integracións actuais** — demasiado baleira; transformar en “Datos que cruzamos”.
3. **Hardware como bloque forte** — mover máis abaixo e reformular como expansión tras diagnóstico.
4. **FAQ** — manter, pero ligar a piloto, datos, hardware opcional, permanencia e método.
5. **Compliance/datos** — manter, pero máis seco e B2B; evitar fraseo emocional.

## Novo fluxo recomendado da landing

1. Hero: marxe enerxética por carteira turística.
2. Problema: custo sen atribución por reserva/apartamento.
3. Método: datos que cruzamos.
4. Produto: detectar -> priorizar -> aprobar -> informar.
5. Demo visual: cola de decisións + informe propietario.
6. Método de cálculo de aforro.
7. Pricing resumido “desde €/apartamento/mes”.
8. Piloto: que pasa nos primeiros 14 días.
9. FAQ.
10. CTA diagnóstico.

## Copy CEO recomendado

### Hero

**Actual:** “Convierte la energía de tu cartera turística en margen operativo.”  
**Manter, con axuste:**

> Convierte el coste energético de tu cartera turística en decisiones de margen.

### Subcopy

> Tramo cruza CUPS, reservas y tarifa para detectar consumo fuera de estancia, priorizar acciones aprobables y generar informes defendibles para propietarios.

### CTA principal

> Diagnosticar mi cartera

### CTA secundario

> Ver cola de decisiones

### Pricing

> Diagnóstico primero. Plan por apartamento después.

### Piloto

> En 14 días identificamos fugas, potencia sobredimensionada y consumos fuera de reserva. Sin hardware obligatorio al inicio.

## Decisións

| Decisión | Tipo | Resultado |
|---|---|---|
| Non considerar 96/100 | User challenge | Aprobado pola evidencia visual |
| Unificar pricing landing + `/precios` | Mechanical | Obrigatorio |
| Sacar `/app/fincas` da demo principal | Taste | Recomendado |
| Reducir peso inicial de hardware/batería | CEO | Recomendado |
| Engadir método de cálculo | CEO | Obrigatorio |
| Engadir QA visual Playwright | Eng/DX | Obrigatorio |
| Reescribir landing por fluxo B2B | Design/CEO | Obrigatorio |

## Plan de implementación

### P0 — Arranxar credibilidade visual

1. Unificar estilo `/precios` coa landing.
2. Crear compoñente compartido de pricing.
3. Corrixir todos os overflows.
4. Corrixir acentos e localización en app interna.
5. Eliminar/ocultar `/app/fincas` da navegación principal.

### P1 — Reescribir enfoque CEO

6. Reordenar landing ao fluxo recomendado.
7. Eliminar ou fusionar seccións que non aportan.
8. Engadir “Datos que cruzamos”.
9. Engadir “Cómo calculamos el ahorro”.
10. Reformular hardware como expansión.

### P2 — QA e lanzamento

11. Script Playwright de capturas e overflow.
12. Checklist visual por viewport.
13. Rough review final antes de deploy.

## Score realista

| Área | Score actual |
|---|---:|
| Estratexia/ICP | 78 |
| Copy/CEO | 74 |
| Visual landing | 74 |
| `/precios` | 76 tras fix |
| App interna desktop | 76 |
| Mobile | 68 |
| QA visual | 55 |

**Score global realista:** 72-76/100.  
**Despois de P0:** 82/100.  
**Despois de P1:** 88-90/100.  
**Despois de P2 con screenshots verdes:** 92-94/100.

Non diría 96 ata que haxa consistencia visual total, copy máis afiado e QA visual automatizada.
