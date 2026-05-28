# 👑 CEO Review: EnergyOS 2.0

## Modo: SELECTIVE EXPANSION

### Fecha: 2026-04-26

---

## 🎯 Decisiones Estratéxicas Aprobadas

### 1. Axente Recomendador ✅
**Decisión:** Calcula aforro EXACTO e recomenda tarifa óptima

**Especificación:**
- Input: Datos de consumo histórico (CSV upload ou manual)
- Procesamento: Análise de patróns por horas/franxas
- Output: 
  - Tarifa recomendada con nome específico (ex: "Tarifa 2.0 DH")
  - Aforro exacto anual/mensual en €
  - Comparativa visual: actual vs recomendado
  - Payback period se hai cambio de contrato

**MVP Scope:**
- [ ] Upload CSV con consumo horario
- [ ] Cálculo de 3 tarifas estándar (PVPC, Fixed, Time-of-Use)
- [ ] Resultado con gráfico de comparación
- [ ] Botón "Aplicar" (simulado, non real por agora)

---

### 2. Simulación Arbitraxe ✅
**Decisión:** Datos REAIS de mercado + IA dimensiona batería

**Especificación:**
- Datos: API OMIE (precios mayorista España) ou simulación realista
- IA Battery Sizing:
  - Input: Consumo histórico, peak hours, ubicación
  - Output: Capacidade óptima de batería (kWh)
  - Razoado: explica por que esa capacidade
- Simulación:
  - Visualiza ciclos carga/descarga sobre gráfico de prezos
  - Calcula profit mensual/ano
  - ROI con custo estimado da batería

**MVP Scope:**
- [ ] Datos simulados pero realistas (precios OMIE históricos)
- [ ] Algoritmo simple: comprar barato (<€40/MWh), vender caro (>€100/MWh)
- [ ] Input: capacidade batería, potencia máxima
- [ ] Output: profit estimado, ciclos por día

---

### 3. UI/UX ✅
**Decisión:** Rebuild desde 0 con Stitch

**Especificación:**
- Novo DESIGN.md creado (ver arquivo)
- Prompt para Stitch: STITCH_PROMPT.md
- Foco: Premium dark theme, data-dense, actionable
- Referencias visuais: Linear.app, Vercel dashboard, trading platforms

**MVP Scope:**
- [ ] Stitch xera dashboard inicial
- [ ] Refactor a React + TypeScript
- [ ] Responsive: desktop first, mobile adaptado
- [ ] Dark mode único (sen light mode por agora)

---

## 🗺️ Roadmap EnergyOS 2.0

### Fase 1: Foundation (Semana 1)
- [ ] Setup novo proxecto Next.js 15 + Tailwind 4
- [ ] Configurar Stitch con prompt
- [ ] Xerar dashboard base (layout + componentes)
- [ ] Sistema de deseño implementado (cores, tipografía)

### Fase 2: Core Features (Semana 2)
- [ ] AI Advisor: upload CSV + cálculo de tarifas
- [ ] Property management: CRUD de propiedades
- [ ] Dashboard con datos reais (ou mock realistas)

### Fase 3: Arbitrage (Semana 3)
- [ ] Integrar datos OMIE (ou mock)
- [ ] Algoritmo de sizing de batería
- [ ] Simulador visual con gráficos
- [ ] ROI calculator

### Fase 4: Polish (Semana 4)
- [ ] Animacións e micro-interactions
- [ ] Testing e bug fixes
- [ ] Documentación
- [ ] Deploy (Vercel)

---

## 🎨 Design Priority

**CRÍTICO:** A UI debe transmitir:
1. **Intelixencia** — Non é un dashboard, é un asesor
2. **Acción** — Cada pantalla ten un CTA claro
3. **Confianza** — Datos transparentes, explicacións claras
4. **Premium** — Calidade visual de producto profesional

---

## 📝 Notas de Implementación

### Stack Tecnolóxico:
- Next.js 15 (App Router)
- Tailwind CSS 4
- shadcn/ui (componentes base)
- Recharts (gráficos)
- Framer Motion (animacións)
- React Hook Form (formularios)

### APIs a integrar:
- OMIE (precios mercado español)
- Open-Meteo (datos climáticos para predición)
- Esios (REE - Red Eléctrica España)

### Decisions técnicas:
- **Sen backend propio por agora** — usar localStorage + JSON
- **Mock data realista** — baseada en datos reais do mercado español
- **Cliente unicamente** — toda a lóxica no frontend

---

## ✅ Checklist de Inicio

- [x] CEO Review completado
- [x] DESIGN.md creado
- [x] STITCH_PROMPT.md creado
- [ ] Aprobar plan (Mauro)
- [ ] Setup novo proxecto
- [ ] Stitch xera dashboard
- [ ] Implementar features core

---

*Documento creado por: Nécora (AI Product Owner)*
*Data: 2026-04-26*
*Versión: 2.0*
