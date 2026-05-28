# Setup - EnergyOS Development

## Variables de Contorno Requiridas

Engade a `~/.bashrc` (ou `~/.zshrc` se usas Zsh):

```bash
# OpenRouter API Key
export OPENROUTER_API_KEY="sk-or-v1-A_TUA_KEY_AQUI"

# Modelo para Codex CLI
export CODEX_MODEL="minimax/minimax-m2.7"

# Opcional: Stitch API
export STITCH_API_KEY="AQ.Ab8..."
```

Despois de engadir:
```bash
source ~/.bashrc
```

## Verificar Configuración

```bash
echo $OPENROUTER_API_KEY   # Debe mostrar a key
echo $CODEX_MODEL           # Debe mostrar: minimax/minimax-m2.7
```

## Probar Codex CLI

```bash
cd ~/.openclaw/workspace/energyos
codex
```

## Workflow Automático

```bash
# Ver estado
bash TASKS/process-tasks.sh status

# Procesar tarefas
bash TASKS/process-tasks.sh process
```
