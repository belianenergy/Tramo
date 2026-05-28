# Tarefa: Completar Fase 2 MVP

## 1. Objetivo
Validar e pechar a Fase 2 de EnergyOS: garantir que non hai erros de TypeScript e que a aplicación funciona con datos de exemplo.

## 2. Supostos
- Next.js 13.5.6 xa instalado
- Puerto local: 3001
- Almacenamento: JSON files en /data
- OpenClaw orchestrating

## 3. Plan de Fases

### Fase A: Verificación TypeScript
- [ ] Executar `npx tsc --noEmit` 
- [ ] Resolver calquera erro atallado

### Fase B: Datos de Proba
- [ ] Verificar que existen datos de exemplo en /data
- [ ] Engadir datos iniciais se están baleiros (2-3 propiedades, 2-3 tarifas)

### Fase C: Test Funcional
- [ ] Iniciar dev server: `npm run dev`
- [ ] Verificar que dashboard carga
- [ ] Verificar que se poden engadir propiedades
- [ ] Verificar que se poden calcular aforros
- [ ] Verificar páxina de detalle (/propiedades/1)

### Fase D: Documentación
- [ ] Actualizar SPEC.md con estado actual
- [ ]确认 README.md ten instrucións de uso

---

## 4. Tarefa para Cline (usar GLM 5.1)

### Objetivo: Verificación TypeScript e datos de exemplo

**Pasos:**
1. Executa `cd ~/.openclaw/workspace/energyos && npx tsc --noEmit 2>&1`
2. Se hai erros, resólveos editando os ficheiros affected
3. Verifica contenido de /data/listings.json e /data/tariffs.json
4. Se están baleiros, crea datos de exemplo realistas (2 propiedades Galicia, 2 tarifas)
5. Inicia dev server e verifica que http://localhost:3001 carga correctamente

**Ficheiros a tocar se preciso:**
- app/**/*.tsx
- lib/*.ts

**Non tocar:**
- package.json
- next.config.js

**Validación:**
- `npx tsc --noEmit` deve sair con código 0
- http://localhost:3001 deve amosar o dashboard
- Engade unha propiedade de test e verifica que aparece na lista

---

## 5. Riscos

| Riesgo | Probabilidade | Impacto | Mitigación |
|--------|--------------|---------|------------|
| erros TypeScript inesperados | Media | Baixo | Revisar output de tsc |
| Datos baleiros ao inicio | Alta | Medio | Xerar datos exemplo |
| Port 3001 en uso | Baixa | Baixo | Cambiar a 3002 |

---

## 6. Validación

- [ ] `npx tsc --noEmit` = 0 errors
- [ ] Dashboard visible en localhost:3001
- [ ] 2+ propiedades na lista
- [ ] Cálculo de aforro funciona

---

## 7. Modelo a usar

**GLM 5.1** → Coding agentic con tarefas multifichero, necesita verificar TypeScript e potencialmente corrixir erros en múltiples ficheiros.
