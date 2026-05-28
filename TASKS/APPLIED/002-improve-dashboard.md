# Tarefa: 002 - Mellorar Dashboard EnergyOS

**Autor:** Nécora (OpenClaw)  
**Data:** 2026-04-25  
**Prioridade:** Alta  
**Estado:** INBOX → ACTIVE → REVIEW  

---

## 1. Objetivo

Mellorar o dashboard de EnergyOS para que sexa mais útil e visualmente atractivo.

## 2. Supostos

- Proxecto en: ~/.openclaw/workspace/energyos
- Next.js 13 + Tailwind CSS
- Datos de exemplo: 3 propiedades xa engadidas

## 3. Melloras a aplicar

### 3.1 Engadir gráfico de barras simple
Engadir un gráfico SVG simple que mostre o consumo mensual das propiedades:
- Uso Tailwind para cores
- Datos dende data/listings.json

### 3.2 Engadir selector de período
Engadir dropdown ou botones para seleccionar:
- Último mes
- Último trimestre
- Último ano

### 3.3 Engadir indicadores visuais
- Icono de raio ⚡ para propiedades con alto consumo (>1000 kWh)
- Badge verde para propiedades con aforro >20%

### 3.4 Melhorar layout mobile
- Cards en columna única en móvil
- Grid de 2-3 columnas en desktop

## 4. Ficheiros a modificar

- `app/page.tsx` (dashboard principal)

## 5. Non modificar

- package.json
- next.config.js
- API routes

## 6. Validación

- [ ] Gráfico de consumo visible
- [ ] Selector de período funcional
- [ ] Layout responsive
- [ ] npm run dev funciona sen errores

## 7. Modelo

**MiniMax M2.7** (OpenRouter) - coding agentic con contexto de proxecto
