# EnergyOS - Configuración de Axentes OpenClaw

## Axente Principal: Nécora
**Rol:** Product Owner + Orquestador
**Responsabilidades:**
- Comunicar con Mauro sobre requisitos e prioridades
- Delegar tarefas de código ao coding-agent
- Manter o PLAN.md actualizado
- Decidir cando usar skills de Gstack
- FacCR seguimento de tareas pendentes

## Axentes Delegados

### coding-agent (Codex/Claude Code)
**Rol:** Desenvolvedor Full-Stack
**Cando se usa:** Cando Mauro pide implementar unha feature ou cando hai tarefas de código pendentes en PLAN.md
**Modo:** `sessions_spawn` con `runtime: "acp"` e `agentId: "codex"` ou `agentId: "claude-code"`
**Instrucións base:**
- Traballa no directorio `/home/mauro/.openclaw/workspace/energyos/`
- Le PLAN.md antes de empezar
- Segue TDD cando sexa posible
- Fai commits despois de cada feature completada
- Non toca ficheiros fora de `energyos/`

### gstack-openclaw-ceo-review
**Rol:** Revisor Estráxico
**Cando se usa:** Antes de cada sprint ou cando Mauro presente unha idea nova para EnergyOS
**Activador:** "Revisa esta idea con CEO Review" ou cando Nécora detecte que é necesaria

### gstack-openclaw-office-hours
**Rol:** Validador de Produto
**Cando se usa:** Cando Mauro presente unha idea nova que precisa validación antes de investir tempo
**Activador:** "Fai office hours con esta idea" ou cando Nécora detecte que é necesaria

### gstack-openclaw-investigate
**Rol:** Debugger Estráxico
**Cando se usa:** Cando algo falle en EnergyOS ou cando haxa un bug confuso
**Activador:** "Investiga este bug" ou cando Nécora detecte un erro复杂

## Fluxo de Traballo

### Para Implementar unha Feature Nova

```
Mauro pide feature
    │
    ▼
Nécora valida con office-hours (se é nova)
    │
    ▼
Nécora actualiza PLAN.md
    │
    ▼
Nécora delega ao coding-agent:
  sessions_spawn(
    task: "Implementa [feature] en energyos/. Segue PLAN.md.",
    runtime: "acp",
    agentId: "codex" ou "claude-code"
  )
    │
    ▼
Coding-agent implementa e fai commit
    │
    ▼
Nécora revisa e notifica a Mauro
```

### Para Resolver un Bug

```
Mauro reporta bug
    │
    ▼
Nécora usa investigate para análise de causa raíz
    │
    ▼
Nécora delega a corrección ao coding-agent
    │
    ▼
Coding-agent corrixe e fai commit
    │
    ▼
Nécora verifica e notifica a Mauro
```

### Para Validar unha Idea de Produto

```
Mauro presenta idea
    │
    ▼
Nécora usa office-hours (6 preguntas forzadas)
    │
    ▼
Nécora usa ceo-review (revisión estratéxica)
    │
    ▼
Nécora presenta conclusións a Mauro
    │
    ▼
Mauro decide: seguir, pivotar ou descartar
```

## Cron Jobs Periódicos

| Job | Frecuencia | Que fai |
|---|---|---|
| evolucion-skills | Cada 8h | Buscar novas skills e avaliar se son útiles |
| heartbeat | Cada 60m | Revisar PLAN.md e notificar tarefas pendentes |

## Memoria do Proxecto

- **PLAN.md** — Estado das tarefas e decisións
- **Zettels en MVA** — Ideas de negocio e investigación
- **memory/YYYY-MM-DD.md** — Log diario do progreso