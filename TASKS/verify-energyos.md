# Tarefa: Verificar e arranxar EnergyOS

## 1. Objetivo
Completar a verificación de EnergyOS: TypeScript, dev server, e datos de exemplo.

## 2. Supostos
- Next.js 13.5.6 xa instalado en ~/.openclaw/workspace/energyos
- Puerto: 3001
- Datos existentes: 1 propiedade + 5 tarifas

## 3. Pasos a executar

### Paso 1: Verificar TypeScript
```bash
cd ~/.openclaw/workspace/energyos && npx tsc --noEmit 2>&1
```
Se hai erros, resolvelos.

### Paso 2: Verificar dev server
```bash
cd ~/.openclaw/workspace/energyos && timeout 20 npm run dev 2>&1
```
Se falla, verificar que o porto 3001 está libre.

### Paso 3: Engadir datos de exemplo
Se data/listings.json ten menos de 2 propiedades, engade polo menos 1 máis con datos realistas dun Airbnb en Galicia.

### Paso 4: Verificar API
Testar que as APIs funcionan:
- GET http://localhost:3001/api/listings
- GET http://localhost:3001/api/tariffs
- GET http://localhost:3001/api/dashboard

## 4. Validación
- [ ] npx tsc --noEmit = 0 errors
- [ ] npm run dev inicia correctamente
- [ ] 2+ propiedades en listings.json
- [ ] APIs responden con JSON válido

## 5. Modelo a usar
GLM 5.1 (OpenRouter) - para coding agentic con verificación de múltiples ficheiros.
