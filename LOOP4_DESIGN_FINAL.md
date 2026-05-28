## Design Final Validation — Loop 4

### Veredicto: CAMBIOS PENDENTES

### Issues visuais

1. **Headline**

O headline actual, "Convierte la energía de tu cartera turística en margen operativo.", funciona mellor como promesa comercial ca o headline de Loop 2. Ten foco en negocio e encaixa co wedge de Tramo.

Visualmente ten peso suficiente: `Plus Jakarta Sans`, `font-semibold`, `text-4xl` en mobile e `md:text-6xl`, cun leading axustado. Non parece débil nin xenérico. O único matiz é o punto final: dálle unha sensación editorial sobria, pero tamén reduce algo o impacto de claim. Non é bloqueante.

2. **Paleta cream / paper / ink / orange**

A paleta está bastante consistente na landing principal:

- Fondo base: `#fcf9f8`.
- Cards: branco.
- Bordes: `#ead8cd` e `#dbc1b3`.
- Texto ink/muted: `#1c1b1b`, `#554338`, `#755c4f`.
- Signal/deep orange: `#e6813a`, `#984700`.
- Success puntual: `#0f766e`.

O sistema xa se le como Tramo e non como SaaS verde xenérico. A excepción principal é a banda escura `#1c1b1b` en "Sistema operativo". Pode funcionar como contraste, pero segue sendo unha decisión forte: debería quedar como única banda ink e non contaminar a UI de produto.

Hai pequenos escapes de token:

- `text-red-700` para erro no formulario, en vez de `#ba1a1a`.
- `#bdc9c6` no gráfico, máis frío ca o sistema warm.
- `#c8eadf` / `#edf8f4` para success, aceptables pero deberían estar tokenizados.

3. **Logo / marca**

Non cumpre o brief final. O logo segue sendo un `Bolt` de Lucide:

- Import: `Bolt`.
- Uso no header: `<Bolt className="h-4 w-4" />`.

Isto contradí a dirección definida en Loop 2: evitar lightning/bolt como identidade principal e usar un monoline segmented bracket/path con tres segmentos, punto orange e ticks opcionais. Este é o blocker visual máis claro.

4. **Tipografía**

A aplicación das familias está ben:

- `Inter` como base en `html`.
- `Plus Jakarta Sans` vía `.font-display` para headlines e marca.
- `JetBrains Mono` vía `.font-mono` para métricas, P1/P2, CUPS, kWh e numeración.

Non vin `tracking` negativo en `page.tsx` nin en `globals.css`, así que a restrición de letter spacing está respectada. A xerarquía é clara e profesional.

5. **Radius / shadow / elevation**

O sistema é coherente pero aínda demasiado redondo para un produto operativo:

- Hero proof: `rounded-[2rem]` + shadow correcto.
- Inner panels: `rounded-[1.5rem]`.
- Cards/rows: moito `rounded-2xl`.
- Form fields: `rounded-xl`.
- CTAs/pills: `rounded-full`.

A elevación está controlada: só o panel hero usa unha sombra forte (`0_16px_60px_rgba(86,37,0,0.08)`), o resto descansa en bordes. Isto é bo.

O axuste pendente é baixar filas, cards operativas e módulos a 12-16px para que a UI pareza menos "marketing card" e máis sistema de operacións. Agora é consistente, pero un pouco branda.

6. **Mobile 375px**

Por estrutura, a landing debería funcionar en 375px:

- O hero pasa a unha columna antes de `lg`.
- CTAs apilan en mobile e pasan a fila en `sm`.
- O panel de produto queda despois do texto.
- O formulario pasa a unha columna antes de `md`.
- O nav central desaparece en mobile.

Risco non bloqueante: o panel hero ten moitos cards, gráfico SVG e timeline dentro dun contedor con `rounded-[2rem]` e padding. Debería renderizar sen horizontal scroll porque usa `w-full`, grid responsive e `overflow-hidden` no hero, pero falta validación visual real con screenshot 375px. Eu non aprobaría mobile como "verificado" sen unha captura Playwright.

7. **Textos internos visibles**

Non quedan referencias visibles a "Precision Operations", Sourceful, Seline, Pirsch ou Orderful en `app/page.tsx`.

Si queda "dashboard demo" no CTA secundario. Non é unha referencia interna, pero mestura inglés nunha landing en español. Recomendo cambialo a "Ver panel demo" ou "Ver demo operativa".

### Cambios requeridos (se hai)

1. Substituír o logo `Bolt` por un SVG inline de marca: monoline segmented bracket/path, tres tramos, punto orange e ticks opcionais. Eliminar o import de `Bolt`.

2. Cambiar o CTA "Ver dashboard demo" por unha opción 100% española: "Ver panel demo" ou "Ver demo operativa".

3. Unificar tokens menores:

- `text-red-700` → `text-[#ba1a1a]`.
- `#bdc9c6` → un neutro warm do sistema ou un token explícito.
- Success colors en variables CSS se se van manter.

4. Axustar radius do produto:

- Hero/proof container: 24px aprox.
- App panels/cards: 16px.
- Rows/form fields: 10-12px.
- Reservar `rounded-full` para pills e CTAs.

5. Validar visualmente en 375px con screenshot antes de aprobación final. A estrutura apunta ben, pero non está probado no artefacto.

### Nota

Loop 4 está moi preto: a dirección visual de Tramo xa é clara, profesional e diferenciada. O headline, a paleta e a tipografía funcionan. O que impide aprobar é principalmente marca: mentres o header siga usando un bolt de Lucide, a landing non cumpre o brief de identidade. O segundo punto é menor pero visible: pequenos tokens e radius aínda deben endurecerse para que a interface pareza máis sistema operativo ca landing SaaS.
