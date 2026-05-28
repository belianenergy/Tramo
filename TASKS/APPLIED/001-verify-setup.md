# Tarefa: 001 - Verificación Inicial EnergyOS

**Autor:** Nécora (OpenClaw)  
**Data:** 2026-04-25  
**Estado:** INBOX → ACTIVE → REVIEW  

---

## 1. Objetivo

Verificar o estado actual do proxecto EnergyOS e garantir que está listo para desenvolvemento.

## 2. Supostos

- Proxecto en: ~/.openclaw/workspace/energyos
- Next.js 13.5.6 instalado
- Puerto: 3001

## 3. Pasos

### 3.1 Verificar TypeScript
Executar: `cd ~/.openclaw/workspace/energyos && npx tsc --noEmit 2>&1`
Se hai erros, resolvelos antes de continuar.

### 3.2 Verificar estrutura
Confirmar que existen:
- app/page.tsx
- app/api/listings/route.ts
- app/api/tariffs/route.ts
- data/listings.json
- data/tariffs.json

### 3.3 Engadir datos de exemplo
Se listings.json ten menos de 2 propiedades, engade:
- 1 propiedade en Galicia (A Coruña)
- 1 propiedade en Madrid

Con datos realistas (non "test" ou "sdsd").

### 3.4 Verificar dev server
Executar: `cd ~/.openclaw/workspace/energyos && timeout 30 npm run dev 2>&1`
Confirmar que inicia sen errores.

## 4. Validación

- [ ] `npx tsc --noEmit` sale con código 0
- [ ] Existen todos os ficheiros listados
- [ ] listings.json ten 2+ propiedades con nomes reais
- [ ] `npm run dev` inicia correctamente

## 5. Modelo a usar

**DeepSeek V3.2** (OpenRouter) - planificación e verificación rutinaria.

## 6. Output esperado

Ficheiros modificados (se é necesario):
- data/listings.json (engadir propiedades)
- calquera ficheiro con erros TypeScript

Log de execución:
- npm run dev output
- tsc output
