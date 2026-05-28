# EnergyOS — Landing Brief v5

**Fecha:** 2026-05-16  
**Versión:** 5 (basada en validación de mercado + análisis estilo Restro)  
**Enfoque:** Gestoras de apartamentos turísticos en España (10-100 unidades)

---

## 1. Análisis de Validación (Key Insights)

### Desde validación de mercado:
- El dolor #1: **Facturas sin explicación** — la gestora no sabe por qué ciertos apartamentos disparan el consumo. Esto es un problema de control operativo y transparencia, no solo de ahorro.
- Dolor #2: **Obras e instalación** — el mercado rechaza soluciones que requieren hardware nuevo o obra. "Sin hardware" debe ser prominente.
- Dolor #3: **Sin visibilidad en tiempo real** — ninguna gestora tiene datos por alojamiento.
- Dolor #4: **Mercado eléctrico complexo** — PVPC, períodos horários, peajes... necesitan simplicidad.
- Dolor #5: **Tempo operativo** — no quieren añadir herramientas complexas.

### Desde análisis estilo Restro:
- Paleta: terracota/rust (#A05A18) + beige crema (#F5F0EB) + branco puro
- Tipografía: Inter + JetBrains Mono para métricas
- Diseño: flat, sin sombras, border-radius 16px, badge pills
- Gráficos: línea suave sin área fill, barras pill-shaped

---

## 2. Estrategia de Contenido

### Hero — Mensaxe Principal

**Problema específico:**
"La mayoría de las gestoras de apartamentos vacacionales pagan de más en energía sin saberlo. Un apartamento con climatización mal gestionada puede costar €400-800/año de más."

**Solución clara:**
"EnergyOS conecta tus reservas con el consumo real para que cada apartamento gaste solo lo necesario: apagando cuando no hay reservas, alertando cuando algo consume de más, y optimizando la tarifa para que pagues menos."

### Badges de confianza (prominentes cerca del hero):
- 🏠 **Sin hardware** — usa tus contadores existentes
- ⚡ **Ahorra desde el primer mes** — resultados en tu próxima factura
- 🔌 **Sin obra** — configuración en 48h

### Prueba social:
- "+X gestoras ya confían en EnergyOS"
- "Ahorro medio: 15-22% en climatización (datos de pilotos)"
- Logos de gestoras (placeholder si no hay reales)

### Cuantificación del ROI:
- "Ahorra €300-600 por apartamento al año"
- "Un apartamento de 2 dormitorios con AA mal gestionado: €600/año de más"

### Ejemplo de optimización de tarifa (en hero o cerca):
"Ejemplo: misma consumo, mismo apartamento — cambia a tarifa óptima → -22% en tu factura"

### Pricing hint:
- "Desde €X/mes por apartamento"
- Piloto gratuito con diagnóstico incluido

---

## 3. Estructura de Secciones

### Sección 1: Hero
- Headline: "Controla y reduce la energía de tus apartamentos turísticos"
- Subheadline problema: ROI quantification + dolor específico
- Badge row: sin hardware | sin obra | configuración 48h
- Hero visual: mockup con gráfico de línea suave + progress bars pill
- CTA: "Solicitar piloto gratuito" (único CTA)

### Sección 2: Problema/Dolor
- "El problema que ninguna gestora ve venir"
- Datos concretos: €300-600/apartamento/año desperdiciado
- No saber por qué = pérdida de control con propietarios

### Sección 3: Cómo funciona (3 pasos)
1. Conectas tus datos (reservas + contadores)
2. EnergyOS analiza y propone acciones
3. Mides el ahorro en tu próxima factura

### Sección 4: Beneficios clave
- Ahorro 15-22% en climatización
- Alertas en tiempo real
- Informes para propietarios
- Optimización de tarifas automática

### Sección 5: Social proof
- Logos de gestoras (placeholder)
- Métricas: X gestoras | Y apartamentos | Z% ahorro medio
- Testimonios (si hay datos reales de pilotos)

### Sección 6: Pricing
- "Desde €X/mes por apartamento"
- Piloto gratuito
- Sin compromisos

### Sección 7: CTA final
- Formulario corto: Nombre, Email, Nº Apartamentos, Dolor principal
- O mejor: "Solicitar diagnóstico gratuito"

---

## 4. Visual Style (Restro-inspired)

### Colores exactos:
```
--color-primary: #A05A18       (terracotta/rust - accent)
--color-secondary: #B8621B     (lighter terracotta)
--color-background: #F5F0EB    (warm beige cream)
--color-surface: #FFFFFF       (pure white cards)
--color-alert: #DC2626        (deep crimson)
--color-text-primary: #1C1917  (near black)
--color-text-secondary: #78716C (warm gray)
```

### Tipografía:
- Body: Inter
- Métricas/Números: JetBrains Mono
- Títulos: Inter 700

### Diseño:
- Border-radius: 16px para cards, full (pill) para badges/buttons
- NO sombras (flat design con whitespace depth)
- Gráficos: línea suave (sin área fill), barras pill-shaped
- Espaciado generoso

---

## 5. Elementos Técnicos

### Font:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>
```

### Tailwind config (custom colors):
```js
colors: {
  primary: '#A05A18',
  secondary: '#B8621B',
  cream: '#F5F0EB',
  surface: '#FFFFFF',
  alert: '#DC2626',
  text: '#1C1917',
  muted: '#78716C',
}
```

### Gráfico SVG (hero):
- Línea suave (smooth curve)
- Sin área fill
- Color: primary (#A05A18)
- Animación sutil de entrada

### Progress bars (pill-shaped):
```css
.rounded-full { border-radius: 9999px; }
bg-primary para fill, bg-cream para background
```

---

## 6. Copy Clave

### Hero headline:
"Controla y reduce la energía de tus apartamentos turísticos"

### Hero sub:
"EnergyOS conecta tus reservas con el consumo real. Ahorra €300-600 por apartamento al año — sin hardware, sin obras."

### Badge 1:
"🏠 Sin hardware adicional"

### Badge 2:
"⚡ Ahorra desde el primer mes"

### Badge 3:
"🔌 Configuración en 48h"

### CTA:
"Solicitar piloto gratuito →"

### Problema section:
"Una apartamento con climatización sin control puede costar €600/año de más en temporada alta. Y la mayoría de las gestoras no lo descubren hasta que llega la factura."

### Cómo funciona:
- Paso 1: "Conectamos tus datos (reservas y contadores)"
- Paso 2: "Analizamos y proposemos acciones de ahorro"
- Paso 3: "Mides el ahorro en tu próxima factura"

### Social proof:
"+X gestoras ya confían en EnergyOS"
"Ahorro medio en climatización: 15-22%"

### Pricing:
"Desde €X/mes por apartamento"
"Piloto gratuito — sin compromiso"

---

## 7. Ejemplo de optimización de tarifa (visualmente)

```
Tarifa actual                    Tarifa optimizada
─────────────────────────────────────────────────
P1 (cara): 8h-10h    ████       P1: 4h menos (-€X)
P2 (media): 10h-14h  ████████   P2: sin cambios
P3 (barata): 22h-8h ████████████ P3: +6h (+€Y)

→ Ahorro mensual: €45
```

---

## 8. Formulario (simplificado)

**Campos:**
1. Nombre (text)
2. Email (email)
3. Nº de apartamentos (number, range 1-100+)
4. Principal dolor (select: facturas, optimización, reporting propietarios, otro)

**Botón:** "Solicitar diagnóstico gratuito"

**Nota:** Máximo 4 campos para no matar la conversión

---

*Brief preparado para generación en Stitch*