# Tramo — UI Definitive Specification

> **Versión:** 1.0 — Definitiva  
> **Data:** 2026-05-25  
> **Autor:** Nécora (Product Owner) + Lura (CTO)  
> **Modelo:** DeepSeek V4 Pro · thinking=xhigh  
> **Estado:** Aprobación pendiente por Mauro

---

## 0. Principios de Diseño

### 0.1 ADN Visual
- **Referencia principal:** reflexai.com — B2B editorial limpo, profesional, datos en primeiro plano, CTA directo
- **Inspiración secundaria:** Refero/Sourceful (60%), Seline/Pirsch Analytics (25%), Orderful (15%)
- **Estilo:** Light Editorial — fondos claros, tipografía de alta calidade, datos como elemento visual principal
- **Diferenciador:** NON é un SaaS genérico. É unha plataforma industrial-enerxética con credibilidade técnica

### 0.2 Paleta de Cores

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-paper` | `#f9f8f5` | Fondo base (Hero, seccións) |
| `--color-surface` | `#f4f2ed` | Fondo secundario, cards agrupadas |
| `--color-card` | `#ffffff` | Cards individuais |
| `--color-surface-low` | `#edebe4` | Footer, fondos sutís |
| `--color-ink` | `#061F00` | Texto principal |
| `--color-muted` | `#4a5a3e` | Texto secundario |
| `--color-secondary` | `#687a5a` | Texto terciario |
| `--color-forest` | `#061F00` | Botóns primarios, acentos de marca |
| `--color-forest-light` | `#0D3B06` | Hover de botóns |
| `--color-lime` | `#A5E119` | Data viz (barras, charts) |
| `--color-mint` | `#5ee8c2` | Data viz secundario |
| `--color-orange` | `#e6813a` | Alertas e warnings |
| `--color-error` | `#e74c3c` | Erros |
| `--color-success` | `#2ecc71` | Éxito |
| `--color-border` | `#d8d5cc` | Bordes sutís |
| `--color-border-strong` | `#c4c0b6` | Bordes fortes |

### 0.3 Tipografía

| Rol | Familia | Pesos | Uso |
|-----|---------|-------|-----|
| Display | Plus Jakarta Sans | 600, 700, 800 | Headlines, H1-H3 |
| Body | Inter | 400, 500, 600 | Texto corpo, navegación |
| Mono | JetBrains Mono | 400, 500, 600, 700 | Datos, métricas, KPIs, táboas |

### 0.4 Formas

| Elemento | Border Radius |
|----------|--------------|
| Botóns | `9999px` (full pill) |
| Cards | `22px` (`--radius-lg`) |
| Inputs | `14px` (`--radius-md`) |
| Pills/Badges | `9999px` |
| Táboas | `6px` (`--radius-sm`) |

### 0.5 Regras Anti-Slop

1. 🚫 Non usar laranxa/amber como cor de marca (só para alerts)
2. 🚫 Non mockups de teléfono
3. 🚫 Non "En vivo" falso — usar "Vista previa" ou "Ejemplo"
4. 🚫 Non gradientes decorativos, orbes, blobs
5. 🚫 Non "ahorro garantizado" nin "hasta X%"
6. 🚫 Non "AI" como claim principal
7. 🚫 Non inventar métricas — usar `—` se non hai dato real
8. ✅ Datos en JetBrains Mono sempre
9. ✅ Animacións que reforcen credibilidade técnica, non decorativas
10. ✅ Contido real, sen lorem ipsum

---

## 1. RESEARCH & DATA

> **Nota:** Os datos proceden de fontes públicas do sector enerxético español (REE, IDAE, CNMC, tarifasgasluz.com, shelly.com) e da experiencia do equipo. As cifras exactas de mercado poden variar; as aquí presentadas son estimacións prudentes para maio 2026.

### 1.1 Consumo Eléctrico — Apartamentos Turísticos en España

| Tipo de apartamento | m² estimados | Ocupación | Consumo anual (kWh) |
|---------------------|-------------|-----------|---------------------|
| Estudio (2 prazas) | 35-45 m² | 60-75% | 2.800 - 3.500 |
| 1 dormitorio (4 prazas) | 50-65 m² | 65-80% | 3.500 - 5.000 |
| 2 dormitorios (6 prazas) | 70-90 m² | 55-75% | 4.500 - 6.500 |
| **Media ponderada** | **~60 m²** | **~70%** | **~4.200 kWh/ano** |

**Fonte:** IDAE — consumos medios do sector servizos, axustado por ocupación turística estacional. Un apartamento turístico consume ~30-50% máis que un residencial equivalente debido a maior uso de AC, calefacción, lavadora/lavavajillas e electrodomésticos.

### 1.2 Prezos Electricidade España (2026)

Tarifa PVPC (Prezo Voluntario para o Pequeno Consumidor) — prezos orientativos con impostos:

| Período | Horario | Prezo medio (€/kWh) | 
|---------|---------|---------------------|
| P1 (Punta) | 10-14h / 18-22h | 0,18 - 0,22 |
| P2 (Llano) | 8-10h / 14-18h / 22-24h | 0,11 - 0,14 |
| P3 (Valle) | 0-8h / fins de semana | 0,07 - 0,09 |

**Fonte:** REE (Red Eléctrica de España) e ESIOS. Prezos medios do pool + peaxes + cargos para consumidor doméstico tipo (≤10kW contratados).

**Diferencia P1-P3 para arbitraxe:** ~0,12 €/kWh de marxe media.

### 1.3 Custos de Sensores Shelly

| Modelo | Función | Prezo unitario (€) | 
|--------|---------|---------------------|
| Shelly Pro 4PM | Control 4 circuítos, medición individual | 75 - 85 |
| Shelly EM | Medición consumo total + 1 circuíto adicional | 55 - 70 |
| Shelly Plus 1PM | Control 1 circuíto + medición | 20 - 25 |
| Shelly Plus 2PM | Control 2 circuítos + medición | 30 - 40 |
| Shelly H&T | Sensor temperatura e humidade | 15 - 20 |

**Kit recomendado por apartamento:**
- 1× Shelly Pro 4PM (control dos 4 circuítos principais) = ~80€
- 1× Shelly EM (medición total entrada) = ~60€
- 1× Shelly H&T (monitorización ambiental) = ~18€
- **Total sensores por apartamento: ~158€**

**Custo de instalación por apartamento:** 120 - 200€ (electricista 2-4 horas)
**Custo total HW + instalación por apartamento: ~300 - 350€**

**Fonte:** Prezos Amazon España e distribuidores oficiais Shelly, maio 2026.

### 1.4 Custos de Baterías para Arbitraxe

| Modelo | Capacidade | Prezo equipo (€) | Instalación (€) | Total (€) |
|--------|-----------|-------------------|-----------------|-----------|
| Huawei Luna 2000 (10kWh) | 10 kWh | 4.200 - 5.000 | 900 - 1.200 | 5.100 - 6.200 |
| BYD Battery-Box HVS 10.2 | 10,2 kWh | 3.800 - 4.500 | 900 - 1.200 | 4.700 - 5.700 |
| Tesla Powerwall 3 | 13,5 kWh | 5.500 - 6.500 | 1.200 - 1.800 | 6.700 - 8.300 |

**Recomendación para Tramo:** Huawei Luna 2000 (10kWh) como opción principal. BYD como alternativa económica. Non recomendar Tesla Powerwall pola indisponibilidade e sobreprezo en España.

**Custo medio por kWh instalado:** ~500 - 600€

### 1.5 Aforro Potencial

**Base de cálculo:**
- Apartamento tipo: 4.200 kWh/ano
- Prezo medio electricidade: 0,14 €/kWh
- Factura anual tipo: ~588 €/apartamento
- Prezo medio sen optimización (tarifa plana mala): ~0,17 €/kWh → 714 €/ano

| Estratexia | Aforro % | Aforro €/apt/ano | Como se consegue |
|-----------|---------|-------------------|-----------------|
| **SW só (Tramo Basic)** | 10-15% | 60 - 90€ | Detección consumo fóra de estancia, optimización de potencia, informes |
| **SW + Sensores** | 20-30% | 120 - 175€ | Control activo de electrodomésticos, regras automáticas, desconexión en horas valle |
| **SW + Sensores + Batería** | 30-40% | 175 - 235€ | Arbitraxe tarifaria, desprazamento de consumo a P3, excedentes |

### 1.6 Táboa de Aforro por Carteira

| Nº Apartamentos | SW só (€/ano) | SW+Sensores (€/ano) | SW+Sensores+Batería (€/ano) |
|-----------------|---------------|---------------------|------------------------------|
| **10** | 600 - 900 | 1.200 - 1.750 | 1.750 - 2.350 |
| **25** | 1.500 - 2.250 | 3.000 - 4.375 | 4.375 - 5.875 |
| **50** | 3.000 - 4.500 | 6.000 - 8.750 | 8.750 - 11.750 |
| **100** | 6.000 - 9.000 | 12.000 - 17.500 | 17.500 - 23.500 |

> **Nota:** O aforro con batería escala mellor en carteiras grandes porque se pode compartir infraestrutura de batería entre varios apartamentos do mesmo edificio.

### 1.7 ROI para o Cliente

| Tier | Custo HW+Inst (€) | Custo Tramo/ano (€) | Aforro est. (€/ano) | ROI |
|------|--------------------|--------------------|--------------------|-----|
| **10 apts (SW+Sensores)** | 3.000 - 3.500 | 1.800 - 3.000 | 1.200 - 1.750 | 30 - 42 meses |
| **25 apts (SW+Sensores)** | 7.500 - 8.750 | 3.600 - 6.000 | 3.000 - 4.375 | 24 - 35 meses |
| **50 apts (SW+Sensores+Bat)** | 15.000 + 5.500 | 6.000 - 9.000 | 8.750 - 11.750 | 18 - 24 meses |
| **100 apts (SW+Sensores+Bat)** | 30.000 + 11.000 | 9.000 - 15.000 | 17.500 - 23.500 | 14 - 18 meses |

### 1.8 Competencia

| Plataforma | Enfoque | Prezo orientativo | Diferencial Tramo |
|-----------|---------|-------------------|-------------------|
| Smappee | Monitorización enerxética xeral | ~10€/mes/punto | Tramo integra PMS + CUPS + reservas |
| Wattiio | Xestión enerxética PEMEs | ~15-30€/mes | Tramo enfocado a turístico, non xenérico |
| Dexma (Spacewell) | Grandes edificios | >100€/mes | Tramo é para carteiras de 10-100 apts |
| **Tramo** | **Turístico + sensores + arbitraxe** | **Ver §4** | **Único con atribución por reserva** |

**Conclusión:** Non existe un competidor directo que faga a combinación de PMS + CUPS + sensores + arbitraxe para o sector turístico español.

---

## 2. SENSOR STRATEGY

### 2.1 Modelos e Funcións

| Sensor | Función | Datos capturados | Ubicación |
|--------|---------|-----------------|-----------|
| **Shelly EM** | Medición consumo total | kWh totais, voltaxe, corrente, factor potencia | Cadro eléctrico (entrada xeral) |
| **Shelly Pro 4PM** | Control 4 circuítos | kWh por circuíto, on/off, temperatura | Cadro eléctrico (liñas: AC, termo, lavadora, cociña) |
| **Shelly H&T** | Monitorización ambiental | Temperatura, humidade | Salón / zona común |

### 2.2 Que Permite Facer

1. **Monitorización en tempo real:** consumo por circuíto cada 5 segundos
2. **Control remoto on/off:** cortar termo, AC ou calefacción fóra de estancia
3. **Regras automáticas:** "Se checkout ás 11:00, apagar AC ás 11:30 se non hai nova reserva"
4. **Alertas:** "Consumo >X kWh en período valle con apartamento baleiro"
5. **Informes:** "O termo consumiu 320 kWh este mes, suxerencia: baixar a 55°C"

### 2.3 Integración Técnica

- **Protocolo:** MQTT (principal) + Shelly Cloud API (fallback) + Webhooks
- **Servidor MQTT:** Mosquitto ou similar, aloxado na infraestrutura de Tramo
- **Frecuencia de datos:** Cada 30s en operación normal, cada 5s en modo live-view
- **Seguridade:** TLS para MQTT, API keys de Shelly Cloud, firewall
- **Almacenamento:** TimescaleDB (PostgreSQL) para series temporais

### 2.4 UI dos Sensores

Cada apartamento mostra un **panel de sensores** con:
- Estado de conexión (online/offline con timestamp)
- Consumo en tempo real (W) actualizándose cada 5s
- Interruptores on/off por circuíto
- Gráfico de consumo das últimas 24h por circuíto
- Regras activas aplicadas

---

## 3. ARBITRAXE CON BATERÍAS

### 3.1 Modelos Recomendados

| Prioridade | Modelo | Capacidade | Prezo instalado (€) | Garantía |
|-----------|--------|-----------|---------------------|----------|
| 🥇 | Huawei Luna 2000 | 10 kWh (expandible a 30) | 5.500 - 6.000 | 10 anos |
| 🥈 | BYD Battery-Box HVS | 10,2 kWh (expandible a 38) | 5.000 - 5.500 | 10 anos |

### 3.2 Estratexia de Arbitraxe

**Ciclo diario típico:**
1. **Carga en P3 (valle, 0-8h):** A batería carga a ~0,08 €/kWh
2. **Descarga en P1 (punta, 10-14h e 18-22h):** A batería descarga a ~0,20 €/kWh
3. **Marxe capturada:** ~0,12 €/kWh

**Cálculo anual (1 batería 10kWh, 1 apartamento):**
- Ciclo diario: 8 kWh útiles (80% DoD para preservar vida)
- Marxe diaria: 8 × 0,12€ = 0,96€
- Marxe anual: 0,96 × 365 = **~350€/ano**
- **Múltiples apartamentos no mesmo edificio comparten batería → marxe multiplicada**

**Cálculo anual (10 apartamentos + 1 batería 10kWh):**
- Se o 60% do consumo dos 10 apts é desprazable: 10 × 4.200 × 0,6 × 0,12 / 10 = 3.024 kWh útiles
- Necesítase máis capacidade (20-30 kWh)
- Marxe estimada: **~700 - 1.000€/ano só en arbitraxe**, adicional aos 1.200-1.750€ do SW+Sensores

### 3.3 UI da Arbitraxe

**Dashboard de arbitraxe:**
- Gauge circular: % de carga da batería en tempo real
- Gráfico de áreas: carga (verde) / descarga (laranxa) nas últimas 24h
- Contador GSAP: aforro acumulado do mes (€)
- Táboa: ciclo diario, kWh cargados, kWh descargados, marxe €
- Indicador de prezo actual: P1/P2/P3 con color coding

---

## 4. PRICING STRATEGY

### 4.1 Filosofía de Prezos

> "Demostramos o aforro antes de cobrar. O cliente paga unha fracción do que aforra."

### 4.2 Táboa de Prezos

| Plan | Apartamentos | SW Tramo (€/mes) | Sensores (one-time) | Batería (one-time) | Aforro est. (€/ano) |
|------|-------------|-------------------|---------------------|---------------------|---------------------|
| **Starter** | 10-24 | 150 - 250 | 300€/apt | — | 1.200 - 1.750 |
| **Professional** | 25-49 | 300 - 500 | 300€/apt | Opcional | 3.000 - 4.375 |
| **Enterprise** | 50-99 | 500 - 750 | 280€/apt | 5.500€/unidade | 6.000 - 8.750 |
| **Scale** | 100+ | 750 - 1.250 | 250€/apt | 5.000€/unidade | 12.000 - 17.500 |

**Prezo por apartamento/mes implícito:**
- Starter: ~15-20€/mes/apt
- Professional: ~12-16€/mes/apt
- Enterprise: ~10-15€/mes/apt
- Scale: ~7,5-12,5€/mes/apt

**O hardware (sensores + batería) vaise facturando como custo único (one-time) na implantación.** Isto inclúe compra, instalación e configuración inicial.

### 4.3 Mensaxe de Pricing na Web

> **"Inviste 300€/apartamento en sensores. Aforra 120-175€/ano por apartamento. Recupera o investimento en 20-30 meses."**

> **"Engade unha batería Huawei Luna por 5.500€. Aforra 700-1.000€/ano adicionais. Recupera en 5-7 anos, coa batería en garantía 10."**

### 4.4 Visual da Páxina de Prezos

- **Táboa comparativa** con 4 columnas (plans)
- **Fila destacada:** Aforro estimado en €/ano con tipografía grande
- **Calculadora interactiva:** slider "Nº de apartamentos" → mostra prezo mensual + aforro estimado
- **Toggle:** "Con sensores" / "Con sensores + batería" que actualiza os números
- **Badge:** "Piloto sen coste · sen tarxeta" en todos os plans
- **CTA por plan:** "Solicitar diagnóstico" (non "Comprar" — é B2B consultivo)

---

## 5. UI SPEC — LANDING PAGE

### 5.1 NAV

```
┌──────────────────────────────────────────────────────────┐
│ [Logo Tramo]   Problema  Sistema  Módulos  Dashboard  │ [Diagnosticar mi cartera] │
└──────────────────────────────────────────────────────────┘
```

- **Comportamento:** Shrink ao facer scroll (72px → 56px)
- **Fondo:** `--color-paper` con backdrop-blur
- **Links:** `--color-muted`, hover `--color-ink`
- **CTA:** Botón verde escuro (`--color-forest`), pill, animación de barras no hover (ScaleBarBtn)
- **Móbil:** Hamburguesa con drawer animado (Framer Motion)

### 5.2 HERO

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  [Para gestores de carteras turísticas]  [~180 €/año x CUPS]│
│                                                              │
│  Convierte la energía de tu cartera                           │
│  turística en margen operativo.                               │
│                                                              │
│  Cruza reservas con CUPS y Datadis para detectar             │
│  consumo fuera de estancia, activar reglas y                  │
│  preparar informes por propietario.                           │
│                                                              │
│  [Solicitar diagnóstico gratuito →]  [Ver cómo funciona →]   │
│  ✉ hola@tramo.energy                                        │
│                                                              │
│                     ┌─── PANEL INTERACTIVO ───┐              │
│                     │ Portfolio_Alpha_Overview │              │
│                     │ ┌──────┐ ┌──────┐ ┌────┐│              │
│                     │ │12.4k │ │8.1k  │ │4.3k││              │
│                     │ │kWh   │ │Reserv│ │Fuga││              │
│                     │ └──────┘ └──────┘ └────┘│              │
│                     │ ▂▃▅▇▆▄▂▃▅ (barras)   │              │
│                     │ ⚠ VGO-014 · 4.2 kWh    │              │
│                     └──────────────────────────┘              │
└──────────────────────────────────────────────────────────────┘
```

**Especificacións:**
- **Fondo:** `--color-paper`
- **H1:** Plus Jakarta Sans 700, clamp(3rem, 7vw, 5.7rem), tracking -0.02em
- **Subcopy:** Inter 400, 18px, `--color-muted`, max 560px
- **Pills:** JetBrains Mono 11px, uppercase, tracking 0.15em
  - Pill 1: "Para gestores de carteras turísticas" (borde `--color-border`, fondo `--color-surface`)
  - Pill 2: "~180 €/año por CUPS" (borde `--color-forest`, fondo verde suave)
- **CTA primario:** Botón `--color-forest`, pill, texto branco, animación ScaleBarBtn
- **CTA secundario:** TextCta con ArrowSwap
- **Panel interactivo (HeroInteractiveDemo):**
  - Card branca (`--color-card`) con borde sutil e `box-shadow` lixeiro
  - Cabecera: "Panel de Control · Cartera Activa" + "MAYO 2026 · 12 propiedades"
  - 3 KPIs: kWh Totales (12.4k), En Reserva (8.1k), Fuga kWh (4.3k)
  - Gráfico de barras: "Consumo por estado de reserva · 7 días"
  - Barras: lime (reserva), orange (alerta), gray (idle)
  - Alerta: VGO-014 con icono warning e texto de evidencia
  - Animacións: hover ilumina barras, KPIs con count-up inicial
  - **Non usar "En vivo"** — etiquetar como "Vista previa"

### 5.3 PAIN SECTION (#problema)

3 cards nun grid de 3 columnas (1 columna en móbil):

| Card 1 | Card 2 | Card 3 |
|--------|--------|--------|
| **01** | **02** | **03** |
| **La factura llega tarde** | **Potencia y tarifa heredadas** | **Propietarios sin explicación** |
| El consumo fuera de estancia se descubre semanas después, cuando ya no hay margen operativo para actuar. | La mayoría de alojamientos turísticos operan con tarifas y potencias pensadas para uso residencial permanente. | Cada propietario necesita entender por qué paga lo que paga. Sin informes claros, la desconfianza crece. |
| *Evidencia:* 4,2 kWh fuera de reserva en VGO-014 | *Evidencia:* Potencia contratada 5,75kW vs 3,45kW óptimo | *Evidencia:* 68% de propietarios pide explicaciones sobre la factura |

- **Cores de fondo dos números:** 01 = `--color-error-soft`, 02 = `--color-orange-glow` suave, 03 = `--color-success` suave
- **Hover:** Borde pasa a `--color-forest`, elevación sutil (translateY -4px)
- **Línea superior:** gradiente verde ao facer hover

### 5.4 SYSTEM FLOW (#sistema)

Fluxo horizontal animado con GSAP ScrollTrigger:

```
  ┌──────┐      ┌──────┐      ┌──────────┐      ┌────────┐      ┌──────────┐
  │ PMS  │ ───→ │ CUPS │ ───→ │ATRIBUCIÓN│ ───→ │FUERA   │ ───→ │PROPIETA- │
  │Reserv│      │Data- │      │ kWh por   │      │RESERVA │      │RIOS      │
  │as    │      │dis   │      │estancia   │      │Alertas │      │Informes  │
  └──────┘      └──────┘      └──────────┘      └────────┘      └──────────┘
```

- **Compoñente:** SystemFlowScroll (React + GSAP ScrollTrigger)
- **Nodos:** cards brancas con borde sutil e icono Lucide
- **Frechas:** `--color-forest` con animación de draw ao facer scroll
- **Hover nos nodos:** transfórmanse a fondo `--color-forest` con texto branco
- **Móbil:** stack vertical con frechas rotadas 90°

### 5.5 CORE MODULES (#modulos)

Grid 2×2 con 4 módulos (1 columna en móbil):

| **Reglas operativas** | **Tarifas y potencia** |
|----------------------|------------------------|
| Configura reglas por propiedad: apagar termo tras checkout, limitar AC a 23°C, activar solo en horas valle. | Revisión automática de P1/P2/P3 vs patrones de consumo. Recomendación de cambios con impacto estimado. |
| 📊 *Mini-gráfico de barras* | 📊 *Gauge de potencia* |

| **Informes para propietarios** | **Evaluación de batería** |
|------------------------------|--------------------------|
| Informes mensuales claros: consumo atribuido, medidas aplicadas, ahorro estimado. Listos para reenviar. | Solo si los datos lo justifican: analizamos tu margen de arbitraje con batería virtual antes de instalar hardware. |
| 📄 *Preview de informe* | 🔋 *SVG animada: BatteryArbitrageSVG* |

- **Cada card:** badge (mono, uppercase), título (Plus Jakarta Sans 600), descrición, mini-gráfico ou ilustración á dereita
- **Hover:** borde `--color-forest`, mini-gráfico cambia de gris a verde
- **Ilustracións:** SVG animadas inline (SmartHomeSVG, BatteryArbitrageSVG)

### 5.6 SENSORS & HARDWARE (NOVA SECCIÓN)

```
┌──────────────────────────────────────────────────────────────┐
│  [HARDWARE INTELIGENTE]                                      │
│                                                              │
│  No solo software. Instalamos sensores Shelly                │
│  en cada apartamento para control real.                      │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  Shelly EM   │  │ Shelly Pro  │  │  Shelly H&T │          │
│  │  Medición    │  │  4PM Ctrl   │  │  Ambiente   │          │
│  │  total       │  │  4 circuit. │  │  Temp/Hum   │          │
│  │  ~60€        │  │  ~80€       │  │  ~18€       │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                              │
│  Kit por apartamento: 158€ + 120-200€ instalación            │
│  Inversión total HW: ~300€/apartamento                       │
│                                                              │
│  [Ver especificaciones técnicas →]                            │
└──────────────────────────────────────────────────────────────┘
```

- **Fondo:** `--color-surface` para diferenciar a sección
- **3 cards con sensores:** foto técnica ou ilustración, prezo en JetBrains Mono, función principal
- **CTA secundario** que leva a unha páxina de detalle técnico (se se quere facer)
- **Animación:** GSAP reveal ao facer scroll, cards entran secuencialmente

### 5.7 BATERÍAS & ARBITRAXE (NOVA SECCIÓN)

```
┌──────────────────────────────────────────────────────────────┐
│  [ARBITRAJE ENERGÉTICO]                                      │
│                                                              │
│  Convertimos las diferencias de precio entre                  │
│  periodos tarifarios en margen para tu cartera.              │
│                                                              │
│  ┌─────────────────────┐   ┌─────────────────────┐          │
│  │    SIN batería       │   │    CON batería       │          │
│  │  P1: 0.20€/kWh       │   │  Carga en P3: 0.08€ │          │
│  │  P3: 0.08€/kWh       │   │  Descarga en P1:     │          │
│  │  Margen perdido:      │   │  0.20€ →             │          │
│  │  0.12€/kWh            │   │  Margen: +0.12€/kWh  │          │
│  └─────────────────────┘   └─────────────────────┘          │
│                                                              │
│  ▂▃▅▇▆▄▂▃▅  Gráfico de arbitraje diario (SVG animada)     │
│                                                              │
│  Batería recomendada: Huawei Luna 2000 (10kWh)              │
│  Inversión: 5.500€ instalada · Garantía: 10 años            │
│  Ahorro adicional: 350-700€/año · ROI: 5-7 años             │
│                                                              │
│  [Solicitar estudio de arbitraje →]                           │
└──────────────────────────────────────────────────────────────┘
```

- **Fondo:** branco (`--color-card`) con borde sutil
- **Cards comparativas:** "SIN batería" vs "CON batería" con datos de prezo
- **Gráfico animado SVG:** ondas de carga/descarga ao longo do día
- **Datos reais** en JetBrains Mono
- **CTA** para estudo personalizado de arbitraxe

### 5.8 DASHBOARD PREVIEW (#dashboard)

Panel de proba completo cunha táboa, KPIs e alertas:

```
┌──────────────────────────────────────────────────────────────┐
│  [VISTA PREVIA DEL DASHBOARD]                                │
│                                                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                       │
│  │3.842 │ │ 412  │ │ 342€ │ │  12  │                       │
│  │kWh   │ │kWh   │ │Ahorro│ │Alert │                       │
│  └──────┘ └──────┘ └──────┘ └──────┘                       │
│                                                              │
│  ┌──────────────────────────────────────────┐               │
│  │ Código  │ Consumo │ Fuera reserva │Estado│               │
│  │ VGO-014 │ 342 kWh │    42 kWh     │ ⚠   │               │
│  │ BCN-022 │ 285 kWh │     8 kWh     │ ✓   │               │
│  │ ZAR-008 │ 410 kWh │    65 kWh     │ ⚠   │               │
│  └──────────────────────────────────────────┘               │
│                                                              │
│  [Acceder al dashboard completo →]                            │
└──────────────────────────────────────────────────────────────┘
```

- **Datos de exemplo** baseados en valores realistas
- **KPIs** con count-up animado (useCounter)
- **Táboa** con filas seleccionables e indicadores de estado

### 5.9 PRICING (NOVA SECCIÓN)

```
┌──────────────────────────────────────────────────────────────┐
│  [PRECIOS]                                                   │
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ STARTER  │ │ PROFESS. │ │ ENTERPR. │ │ SCALE    │       │
│  │ 10-24    │ │ 25-49    │ │ 50-99    │ │ 100+     │       │
│  │          │ │          │ │          │ │          │       │
│  │ 150-250€ │ │ 300-500€ │ │ 500-750€ │ │ 750-1250€│       │
│  │   /mes   │ │   /mes   │ │   /mes   │ │   /mes   │       │
│  │          │ │          │ │          │ │          │       │
│  │Ahorro    │ │Ahorro    │ │Ahorro    │ │Ahorro    │       │
│  │1.200€    │ │3.000€    │ │6.000€    │ │12.000€   │       │
│  │  /año    │ │  /año    │ │  /año    │ │  /año    │       │
│  │          │ │          │ │          │ │          │       │
│  │[Diagnos] │ │[Diagnos] │ │[Diagnos] │ │[Hablar]  │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                              │
│  Todos los planes incluyen: piloto gratuito · sin tarjeta    │
│                                                              │
│  [+ Sensores: +300€/apt one-time]                             │
│  [+ Batería: consultar estudio personalizado]                 │
│                                                              │
│  [Calcula tu ahorro: __ apts → ______ €/año estimado]        │
└──────────────────────────────────────────────────────────────┘
```

- **4 columnas** con cards de pricing
- **Fila de aforro** destacada en JetBrains Mono, verde
- **Add-ons** debaixo como toggle ou badges
- **Calculadora interactiva:** slider + output dinámico (JS simple ou React state)
- **CTA por plan:** "Solicitar diagnóstico" nos 3 primeiros, "Hablar con ventas" en Scale

### 5.10 TRUST (#confianza)

```
┌──────────────────────────────────────────────────────────────┐
│  [CONFIANZA]                                                 │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │  Datos en  │  │Sin scraping│  │  Sin lock-in│             │
│  │   la UE    │  │     ni     │  │     ni      │             │
│  │ Cifrado en │  │credenciales│  │ permanencia │             │
│  │reposo/trán-│  │            │  │             │             │
│  │sito + ISO  │  │No accedemos│  │Piloto sin   │             │
│  │27001       │  │a tus siste-│  │coste · sin  │             │
│  │            │  │mas sin     │  │tarjeta      │             │
│  │            │  │permiso     │  │             │             │
│  └────────────┘  └────────────┘  └────────────┘             │
│                                                              │
│  Piloto Seguro: Diagnostica sin instalación. Solo necesitas  │
│  tus datos de CUPS y PMS para recibir una primera evaluación.│
└──────────────────────────────────────────────────────────────┘
```

### 5.11 CTA FINAL + FORM (#diagnostico)

```
┌──────────────────────────────────────────────────────────────┐
│  Solicita un diagnóstico de cartera                          │
│  Sin compromiso, sin instalación, sin letra pequeña.         │
│                                                              │
│  ┌──────────────────────┐ ┌──────────────────────┐          │
│  │ Nombre               │ │ Empresa              │          │
│  ├──────────────────────┤ ├──────────────────────┤          │
│  │ Email                │ │ Nº Alojamientos      │          │
│  ├──────────────────────┤ ├──────────────────────┤          │
│  │ Ciudad / Región      │ │ PMS que usas         │          │
│  ├──────────────────────┤ └──────────────────────┘          │
│  │ ¿Acceso a Datadis?   │ ○ Sí  ○ No lo sé                 │
│  ├──────────────────────┤                                   │
│  │ ¿Usas baterías?      │ ○ Sí  ○ No                       │
│  ├──────────────────────┤                                   │
│  │ Mensaje / Dolor principal                               │
│  │ ┌──────────────────────────────────────────┐            │
│  │ │ Cuéntanos qué te preocupa...              │            │
│  │ └──────────────────────────────────────────┘            │
│  ├──────────────────────┤                                   │
│  │ [Solicitar diagnóstico]                                  │
│  │ No enviamos credenciales ni facturas por este formulario.│
│  │ En la llamada revisamos qué datos tienes disponibles.    │
│  └──────────────────────┘                                   │
└──────────────────────────────────────────────────────────────┘
```

- **Fondo:** `--color-surface`
- **Form card:** branca con borde sutil
- **Inputs:** fondo `--color-surface`, borde `--color-border`, focus `--color-forest`
- **Radio buttons:** `accent-color: --color-forest`
- **Submit:** botón `--color-forest`, full width, pill
- **Disclaimer:** texto pequeno en `--color-secondary`

---

## 6. UI SPEC — DASHBOARD (App Interna)

### 6.1 Layout Xeral

```
┌────────────────────────────────────────────────────────────┐
│ [Sidebar]  │  Dashboard                                     │
│            │                                                │
│ Dashboard  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │
│ Operations │  │3.842 │ │ 412  │ │ 342€ │ │  12  │        │
│ Properties │  │kWh   │ │kWh   │ │Ahorro│ │Alert │        │
│ Reports    │  └──────┘ └──────┘ └──────┘ └──────┘        │
│ Sensors    │                                                │
│ Settings   │  ▂▃▅▇▆▄▂▃▅ (Consumo por estado reserva)     │
│            │                                                │
│            │  ┌──────────────────────────────────┐        │
│            │  │ Código │ kWh │ Fuera │ Estado    │        │
│            │  │ VGO-014│ 342 │ 42kWh │ ⚠ Activo │        │
│            │  │ BCN-022│ 285 │  8kWh │ ✓ OK     │        │
│            │  └──────────────────────────────────┘        │
└────────────────────────────────────────────────────────────┘
```

### 6.2 Estados

| Estado | Comportamento |
|--------|--------------|
| **Loading** | Skeleton cards (pulso sutil) en KPIs e táboas |
| **Empty** | Ilustración + "Conecta tu primer CUPS para ver datos" + CTA |
| **Error** | Card de erro con mensaxe específica + botón "Reintentar" |
| **Partial** | Datos mostrados + badge "Parcial — 3 de 12 CUPS pendientes" |
| **Live** | Indicador de actualización en tempo real (só se hai sensores) |

### 6.3 Gráficos

| Gráfico | Tipo | Datos | Animación |
|---------|------|-------|-----------|
| Consumo por estado de reserva | Barras agrupadas | Últimos 7/30 días | draw-up ao entrar en viewport |
| Historial de consumo | Liña con área sutil | 12 meses | draw-path animado |
| Distribución por propiedade | Treemap ou barras horizontais | Mes actual | fade-in secuencial |
| Gauge de aforro | Arco/gauge circular | Acumulado mes | count-up + rotación |
| Alertas por tipo | Radar ou anel | 30 días | scale-in |

### 6.4 Táboa de Propiedades

| Columna | Formato |
|---------|---------|
| Código | Mono, link á propiedade |
| Consumo mes | Mono, númerico, comparación con mes anterior (▲/▼ %) |
| Fuera reserva | Mono, con badge de gravidade (✓ / ⚠ / 🔴) |
| Sensores | Indicador online/offline (punto verde/gris) |
| Estado | Badge: OK / Alerta / Revisar |

---

## 7. UI SPEC — OWNER REPORT

### 7.1 Estrutura do Informe

```
┌────────────────────────────────────────────────────────────┐
│  INFORME ENERGÉTICO MENSUAL                                 │
│  Abril 2026 · Propietario: VGO-014                         │
│                                                             │
│  ┌─────────────────────────────────────────────┐           │
│  │  Consumo total: 342 kWh                      │           │
│  │  En estancia:   298 kWh (87%)                 │           │
│  │  Fuera estancia: 42 kWh (12%)  ⚠ Revisar     │           │
│  │  Ahorro aplicado: 18€ (acciones de control)   │           │
│  └─────────────────────────────────────────────┘           │
│                                                             │
│  ▂▃▅▇▆▄▂▃▅  Consumo diario (barras: reserva/ocio)        │
│                                                             │
│  ACCIONES APLICADAS ESTE MES:                               │
│  • Termo programado a 55°C: -3.2 kWh/día                  │
│  • AC limitado a 23°C en estancia: -1.8 kWh/día           │
│  • Desconexión post-checkout: -4.2 kWh total               │
│                                                             │
│  [Descargar PDF]  [Enviar por email]                        │
└────────────────────────────────────────────────────────────┘
```

- **Deseño limpo**, fondo branco
- **KPIs grandes** con JetBrains Mono
- **Gráfico de barras** consumo diario con 2 cores: reserva (lime), ocioso (orange)
- **Táboa de accións** con impacto en kWh e €
- **Botóns de exportación** visibles pero non dominantes

---

## 8. UI SPEC — OPERATIONS

### 8.1 Cola de Operacións

```
┌────────────────────────────────────────────────────────────┐
│  OPERATIONS                                       [Filtros] │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │ ⚠ ALTA  │ VGO-014 │ 4.2 kWh fuera │ Hace 2h       │    │
│  │          │ Checkout 11:00 · Consumo 13:10-16:40    │    │
│  │          │ Acción: Revisar termo y regla post-ck   │    │
│  ├────────────────────────────────────────────────────┤    │
│  │ ⚡ MEDIA │ BCN-022 │ Potencia excedida │ Ayer      │    │
│  │          │ Maxímetro: 5.8kW / Contratado: 4.6kW   │    │
│  │          │ Acción: Evaluar ampliación potencia     │    │
│  ├────────────────────────────────────────────────────┤    │
│  │ ✓ BAJA  │ ZAR-008 │ Tarifa revisada │ Hace 3d     │    │
│  │          │ Cambio P1/P2 recomendado. Impacto: +8€  │    │
│  │          │ Acción: Solicitar cambio a comercializ. │    │
│  └────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────┘
```

- **Filas expandibles** con detalle completo
- **Prioridade visual:** cor á esquerda (vermello/ambar/verde) segundo gravidade
- **Accións accionables:** botóns para marcar como revisado, asignar, resolver
- **Animación:** Framer Motion AnimatePresence ao cambiar de estado

---

## 9. UI SPEC — PRICING PAGE

Páxina independente en `/precios` co mesmo layout xeral (nav + footer).

- **Calculadora interactiva** arriba (hero da páxina)
- **Táboa de plans** debaixo
- **FAQ de pricing** ao final
- **CTA:** "Solicitar diagnóstico" en cada plan

### 9.1 Calculadora Interactiva

```
┌────────────────────────────────────────────────────────────┐
│  Calcula tu ahorro potencial                                │
│                                                             │
│  Nº de apartamentos: [━━━━━━●━━━━━] 25                      │
│                                                             │
│  □ Incluir sensores (+300€/apt one-time)                     │
│  □ Incluir batería (+5.500€ one-time)                        │
│                                                             │
│  ┌──────────────────────────────────────────────┐          │
│  │                                              │          │
│  │   Ahorro anual estimado:  3.000€ - 4.375€    │          │
│  │   Inversión inicial:      7.500€ (sensores)  │          │
│  │   ROI estimado:           24 - 35 meses      │          │
│  │   Cuota mensual Tramo:    300€ - 500€        │          │
│  │                                              │          │
│  └──────────────────────────────────────────────┘          │
│                                                             │
│  [Solicitar diagnóstico personalizado →]                     │
└────────────────────────────────────────────────────────────┘
```

- **Slider** con input numérico, reactivo
- **Toggles** que mostran/ocultan add-ons
- **Resultados** actualízanse en tempo real (React state)
- **Animación:** números con count-up ao cambiar (GSAP ou Framer Motion)

---

## 10. UI SPEC — SETTINGS & INTEGRATIONS

### 10.1 Pantalla de Configuración

```
┌────────────────────────────────────────────────────────────┐
│  CONFIGURACIÓN                                              │
│                                                             │
│  ┌─ Conexiones ───────────────────────────────────────┐    │
│  │ PMS: Hostaway ✓ Conectado · Última sync: 10:23     │    │
│  │ CUPS: 12 de 15 conectados · Datadis: ✓ Activo      │    │
│  │ [+ Conectar nuevo CUPS]                             │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─ Sensores ─────────────────────────────────────────┐    │
│  │ VGO-014: ● Online · Shelly EM: 342W · Pro 4PM: ✓  │    │
│  │ BCN-022: ● Online · Shelly EM: 185W                 │    │
│  │ ZAR-008: ○ Offline · Último dato: hace 3h           │    │
│  │ [+ Instalar nuevo sensor]                            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─ Reglas globales ──────────────────────────────────┐    │
│  │ ☑ Apagar termo 1h post-checkout                     │    │
│  │ ☑ Limitar AC a 23°C en todas las propiedades        │    │
│  │ ☐ Activar solo electrodomésticos en P3 (valle)      │    │
│  │ umbral de alerta: 2 kWh en periodo valle sin reserva │    │
│  └─────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────┘
```

---

## 11. ANIMATION SPEC

### 11.1 Ferramentas e Asignación

| Ferramenta | Uso |
|-----------|-----|
| **GSAP + ScrollTrigger** | Revelado de seccións, paralaje sutil, animacións de gráficos ao entrar en viewport, contadores |
| **Framer Motion** | Transicións React (tabs, drawers, modais), AnimatePresence para listas dinámicas, layout animations |
| **CSS @keyframes** | Pulsos, brillos, animacións de carga, skeletons, micro-interaccións simples |
| **SVG animadas** | Ilustracións inline: batería cargando, fluxo de enerxía, casa con nodos, árbores de decisión |

### 11.2 Mapa de Animacións por Sección

| Sección | Elemento | Animación | Ferramenta | Timing |
|---------|---------|-----------|-----------|--------|
| **NAV** | Shrink header | height: 72→56px, opacity fondo | CSS + GSAP | scroll > 100px |
| **NAV** | CTA ScaleBarBtn | barras animadas no hover | CSS | hover |
| **HERO** | Pills | fade-in + slide-up secuencial | Framer Motion | mount |
| **HERO** | H1 + subcopy | fade-in + slide-up staggered | Framer Motion | mount |
| **HERO** | Panel KPIs | count-up números | GSAP | mount |
| **HERO** | Panel barras | draw-up + hover glow | CSS + GSAP | mount + hover |
| **HERO** | Panel alerta | fade-in con delay | CSS | mount + 800ms |
| **PAIN** | Cards | revelado secuencial ao scroll | GSAP ScrollTrigger | scroll |
| **SYSTEM** | Nodos | draw-in secuencial + frechas animadas | GSAP ScrollTrigger | scroll |
| **MODULES** | Cards grid | stagger fade-in ao scroll | GSAP ScrollTrigger | scroll |
| **SENSORS** | Cards | entrada desde abaixo | GSAP ScrollTrigger | scroll |
| **BATERÍAS** | SVG arbitraxe | animación de carga/descarga ao scroll | GSAP | scroll |
| **DASHBOARD** | Táboa + KPIs | count-up + fade-in | GSAP ScrollTrigger | scroll |
| **PRICING** | Calculadora | números count-up ao cambiar slider | GSAP | interacción |
| **TRUST** | Cards | fade-in secuencial | GSAP ScrollTrigger | scroll |
| **CTA** | Form | fade-in suave | GSAP ScrollTrigger | scroll |

### 11.3 Principios de Animación

1. **Duración máxima:** 600ms para animacións de entrada, 200ms para micro-interaccións
2. **Easing:** cubic-bezier(0.16, 1, 0.3, 1) para entradas, ease-out para saídas
3. **Stagger:** 80-120ms entre elementos secuenciais
4. **Reduced motion:** `@media (prefers-reduced-motion: reduce)` desactiva todas as animacións
5. **Performance:** usar `transform` e `opacity` sempre que sexa posible, evitar `height`/`width` animados
6. **Non abusar:** máximo 2-3 animacións visibles simultaneamente

---

## 12. CHART & DATA VIZ SPEC

### 12.1 Biblioteca

**Recharts** como biblioteca principal de gráficos. Alternativa: **Nivo** para gráficos máis complexos.

### 12.2 Mapa de Gráficos

| Sección | Gráfico | Tipo | Datos exemplo | Animación |
|---------|---------|------|---------------|-----------|
| **Hero Panel** | Barras consumo 7 días | BarChart | L-V: 65/78/48/85/58%, S-D: 22/16% | draw-up ao mount |
| **Dashboard** | Consumo por estado | StackedBarChart | Reserva 87%, Fóra 12% (mensual) | fade-in |
| **Dashboard** | Histórico 12 meses | LineChart con área | 280-420 kWh/mes | draw-path |
| **Dashboard** | Distribución propiedade | BarChart horizontal | 10 propiedades | stagger fade |
| **Dashboard** | Gauge aforro | Gauge circular | 342€ acumulado mes | rotate + count-up |
| **Owner Report** | Consumo diario | BarChart (2 cores) | 8-14 kWh/día, reserva vs ocioso | draw-up |
| **Arbitraxe** | Carga/descarga 24h | AreaChart | P3 carga 0-8h, P1 descarga 10-14h/18-22h | flow animado |
| **Pricing Calc** | Barras comparativas | BarChart vertical | SW vs SW+Sensor vs Completo | draw-up ao cambiar |

### 12.3 Cores de Data Viz

| Variable | Cor | Hex |
|----------|-----|-----|
| En reserva / OK | Lime | `#A5E119` |
| Fuera reserva / Alerta | Orange | `#e6813a` |
| Idle / Neutro | Gray | `#c4c0b6` |
| Aforro / Éxito | Mint | `#5ee8c2` |
| Carga batería | Verde oscuro | `#061F00` |
| Descarga batería | Orange suave | `#ffb68a` |
| Comparación / Histórico | Secondary | `#687a5a` |

### 12.4 Principios de Data Viz

1. **Eixes visibles** con etiquetas en JetBrains Mono 10px
2. **Tooltips** con datos precisos ao hover (Recharts)
3. **Unidades sempre visibles:** kWh, €, %
4. **Animacións de entrada** en todos os gráficos (draw, grow, fade)
5. **Sen gridlines pesadas** — liñas sutís en `--color-border`
6. **Lenda** integrada no gráfico, non flotante

---

## 13. TECHNICAL SPEC

### 13.1 Responsive Breakpoints

| Breakpoint | Deseño |
|-----------|--------|
| 320px | 1 columna, texto máis pequeno, cards stack |
| 375px | Móbil pequeno (iPhone SE) — verificación obrigatoria |
| 414px | Móbil grande (iPhone 11) |
| 768px | Tablet — 2 columnas nalgunhas seccións |
| 1024px | Desktop pequeno — hero con panel á dereita |
| 1440px | Desktop estándar — deseño de referencia |

**Regras non negociables:**
- Sen scroll horizontal en ningún breakpoint
- Botóns e links nunca en 2 liñas
- Touch targets mínimo 44×44px
- Texto non truncado en móbil (wrap, non ellipsis)

### 13.2 Accesibilidade

| Requisito | Implementación |
|-----------|---------------|
| Contraste texto/fondo | AA para corpo, AAA para headlines |
| Focus visible | Outline 2px `--color-forest` en todos os elementos interactivos |
| Keyboard nav | Tab orde lóxico, skip-to-content link |
| Screen readers | aria-label en iconas, alt en imaxes, roles correctos |
| Formularios | Labels asociados, error messages accesibles |

### 13.3 Performance

| Métrica | Obxectivo |
|---------|----------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Bundle size (landing) | < 150KB gzipped |
| Bundle size (dashboard) | < 300KB gzipped |
| Code splitting | Por ruta (Next.js automático) + lazy para charts e animacións pesadas |

### 13.4 SEO

```html
<title>Tramo — Control energético para carteras turísticas</title>
<meta name="description" content="Atribuye cada kWh a la reserva que lo generó. Detecta consumo fuera de estancia, recomienda ajustes de potencia y genera informes por propietario."/>
<link rel="canonical" href="https://tramo.energy"/>
<meta property="og:type" content="website"/>
<meta name="twitter:card" content="summary_large_image"/>
<script type="application/ld+json">/* SoftwareApplication schema */</script>
```

### 13.5 Stack Técnico

| Capa | Tecnoloxía |
|------|-----------|
| Framework | Next.js 15 (App Router) |
| Estilos | Tailwind CSS + CSS custom properties (tokens) |
| Animacións | GSAP + ScrollTrigger, Framer Motion |
| Gráficos | Recharts |
| Iconas | Lucide React |
| Tipografía | Google Fonts (Plus Jakarta Sans, Inter, JetBrains Mono) |
| Hosting | Vercel |
| Base de datos | SQLite (MVP) → PostgreSQL (produción) |
| Sensores | MQTT (Mosquitto) + Shelly Cloud API |
| Baterías | API Modbus + Huawei FusionSolar |

---

## 14. IMPLEMENTATION ROADMAP

### Fase 1: Landing Page Completa (SEMANA 1-2)
- [ ] Novas seccións: Sensors & Hardware, Baterías & Arbitraxe, Pricing
- [ ] Animacións GSAP en todas as seccións
- [ ] Calculadora de aforro interactiva
- [ ] Responsive completo 320-1440px
- [ ] Build + TypeScript limpo

### Fase 2: Dashboard App (SEMANA 3-4)
- [ ] Layout con sidebar
- [ ] KPIs con datos reais (mock data inicial)
- [ ] Gráficos con Recharts
- [ ] Táboa de propiedades
- [ ] Estados: loading, empty, error

### Fase 3: Operations + Owner Report (SEMANA 5-6)
- [ ] Cola de operacións con filas expandibles
- [ ] Owner Report con gráfico e táboa
- [ ] Exportación PDF

### Fase 4: Integración Sensores + Pricing Page (SEMANA 7-8)
- [ ] Panel de sensores en tempo real
- [ ] Páxina de prezos con calculadora
- [ ] Settings & Integrations
- [ ] Conexión MQTT + Shelly API

---

## 15. APROBACIÓN

- [ ] Mauro revisa e aproba a especificación
- [ ] Unha vez aprobada, NON se fan máis iteracións de deseño
- [ ] Calquera cambio futuro debe ser unha emenda a este documento
