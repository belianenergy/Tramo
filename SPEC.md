# EnergyOS - Especificación Técnica

## Vocabulario de Arquitectura (Matt Pocock Style)

**OBRIGATORIO:** Usar esta linguaxe para comunicar decisións:

| Termo | Significado | Evitar |
|-------|-------------|--------|
| **Module** | Calquera cousa con interface + implementación | unit, component, service |
| **Interface** | Todo o que un caller debe saber (types + invariants + errors) | API, signature |
| **Depth** | Canto comportamento podes exercer por unidade de interface | — |
| **Seam** | Lugar onde podes cambiar comportamento sen editar alí | boundary |
| **Adapter** | Cousa concreta que satisfai unha interface nun seam | — |
| **Leverage** | O que os callersganan da depth | — |
| **Locality** | O que os maintainersganan da depth | — |

**Deletion test:** Se borras o módulo e a complexidade desaparece, non estaba agochando nada.

**One adapter = seam hipotética. Two adapters = seam real.**

## Modelo de Routing (OBRIGATORIO)

### Prioridade: Local/Groq → Direct APIs → OpenRouter (fallback)

| Tier | Modelo | Provider | Uso |
|------|--------|----------|------|
| **1 - Gratuito/Barato** | DeepSeek V3.2 | Groq (ou local Ollama) | Planificación, revisión rutinaria |
| **1 - Gratuito/Barato** | GLM 4 / Qwen | Groq / Ollama | Coding agentic |
| **2 - Directo** | DeepSeek V3.2 | DeepSeek Direct | Tareas que requieren modelo grande |
| **3 - Fallback** | Calquera | OpenRouter | Só cando Tier 1-2 non dispoñible |

### Regras:
1. **Groq** (gratuito) → Primeira opción para todas as tarefas
2. **Ollama** (local) → Segunda opción, sen coste ningún
3. **Provider Directo** → DeepSeek, Anthropic, etc. (sen markup OpenRouter)
4. **OpenRouter** → Só como fallback extremo

### exceptions:
- Modelos con reasoning obrigatório → OpenRouter (Kimi, etc.)
- Modelos con context window > 128k → OpenRouter (Qwen, etc.)
- Fallback total → Calquera modelo dispoñible en OpenRouter

---

## Stack Tecnolóxico

- **Framework:** Next.js 13.5.6 (App Router)
- ** Linguagem:** TypeScript 5.3.3
- **Estilos:** Tailwind CSS 3.4
- **Almacenamento:** JSON files (data/*.json)
- **Puerto local:** 3001

### Estrutura de Ficheiros

```
energyos/
├── app/
│   ├── page.tsx                    # Dashboard principal
│   ├── layout.tsx                   # Layout global
│   ├── api/
│   │   ├── listings/                # CRUD propiedades
│   │   │   ├── route.ts             # GET all, POST new
│   │   │   └── [id]/route.ts       # GET one, DELETE
│   │   ├── tariffs/route.ts         # GET all, POST new
│   │   ├── savings/route.ts        # POST calculate
│   │   ├── forecasts/route.ts      # GET by listingId
│   │   ├── dashboard/route.ts      # GET summary stats
│   │   └── export/csv/route.ts     # POST export
│   └── propiedades/[id]/page.tsx   # Detalle propiedade
├── lib/
│   ├── storage.ts                  # JSON file utilities
│   └── types.ts                    # TypeScript interfaces
├── data/
│   ├── listings.json
│   ├── tariffs.json
│   └── forecasts.json
└── package.json
```

---

## API Endpoints

### GET /api/listings
Lista todas as propiedades.

### POST /api/listings
```json
{ "name": "string", "location": "string", "monthlyKwh": number, "occupancyRate": number, "ownerContact": "string" }
```

### GET /api/listings/:id
Detalhes dunha propiedade.

### DELETE /api/listings/:id
Eliminar propiedade.

### GET /api/tariffs
Lista todas as tarifas.

### POST /api/tariffs
```json
{ "region": "string", "provider": "string", "baseRate": number, "peakRate": number, "offPeakRate": number }
```

### POST /api/savings
```json
{ "listingId": number }
```
Retorna cálculo de aforro con breakdown.

### GET /api/forecasts?listingId=:id
Historial de cálculos para unha propiedade.

### GET /api/dashboard
Resumo global con totales.

### POST /api/export/csv
Exporta todos os datos a CSV.

---

## Fases do Proxecto

### ✅ Fase 1: MVP Core (Días 1-3) — COMPLETO
- Esqueleto Next.js
- API routes
- UI completa

### ✅ Fase 2: MVP Funcional (Días 4-7) — case completa
Pendentes:
- [ ] TypeScript errors → resolver (se hai)
- [ ] Test con datos reais
- [ ] Validación con 5 usuarios

### 🔲 Fase 3: Validación (Días 8-14) — PENDENTE
- Auditoría casa de Mauro (primeiro caso real)
- Probas con 3-5 propietarios

### 🔲 Fase 4: Produto (Días 15-30) — PENDENTE
- Deploy Vercel
- Autenticación
- Dashboard avanzado
- Informes PDF

---

## Regras de Delegamento a Cline

1. **Dividir en tarefas pequenas** (1-3 ficheiros máximo)
2. **Cada tarefa ten:** objective, supostos, validación
3. **Usar GLM 5.1** como modelo de referencia para Cline
4. **Verificar sempre** antes de marcar como completo

---

## Modelo de Custeo OpenRouter

| Modelo | Input | Output |
|--------|-------|--------|
| DeepSeek V3.2 | $0.07/M | $0.27/M |
| GLM 5.1 | $0.07/M | $0.27/M |
| Qwen 3.6 Plus | $0.07/M | $0.27/M |
| Mimo V2.5 Pro | TBC | TBC |

*Optimizar: usar DeepSeek para planificación, GLM só para coding complexo.*
