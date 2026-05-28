#!/bin/bash
# EnergyOS Workflow - Clawsweeper Style Automation
# Autor: Nécora (OpenClaw)
# Uso: bash process-tasks.sh [options]

set -e

# Config
WORKDIR=~/.openclaw/workspace/energyos
TASKS_DIR=$WORKDIR/TASKS
LOG_DIR=$TASKS_DIR/LOG
# OpenRouter API Key - loaded from environment or .env
if [ -z "$OPENROUTER_API_KEY" ]; then
  if [ -f "$WORKDIR/.env" ]; then
    export $(cat "$WORKDIR/.env" | grep -v '^#' | xargs)
  fi
fi

# Also load .env.local if it exists (additional keys)
if [ -z "$OPENROUTER_API_KEY" ]; then
  if [ -f "$WORKDIR/.env.local" ]; then
    export $(cat "$WORKDIR/.env.local" | grep -v '^#' | xargs)
  fi
fi

# Verify API key is available
if [ -z "$OPENROUTER_API_KEY" ]; then
  echo "ERROR: OPENROUTER_API_KEY not found in environment or .env"
  echo "Please configure it in your shell profile (~/.bashrc)"
  exit 1
fi
# Modelo para Codex CLI - MiniMax M2.7 (fallback se non está definido)
CODEX_MODEL="${CODEX_MODEL:-minimax/minimax-m2.7}"

# Load Stitch API key from .env if exists
if [ -f "$WORKDIR/.env" ]; then
  export $(cat "$WORKDIR/.env" | xargs)
fi

export PATH=$PATH:~/.nvm/versions/node/v25.9.0/bin
export OPENROUTER_API_KEY

source ~/.nvm/versions/node/v25.9.0/etc/nvm.sh 2>/dev/null || true

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_DIR/workflow.log"; }

# Funcions
get_next_task() {
    ls -1 "$TASKS_DIR/INBOX/"*.md 2>/dev/null | head -1
}

move_task() {
    local from=$1
    local to=$2
    local task_name=$(basename "$from")
    mv "$from" "$TASKS_DIR/$to/$task_name"
    echo "$TASKS_DIR/$to/$task_name"
}

# Main
main() {
    log "=== ENERGYOS WORKFLOW START ==="
    
    # Check for tasks in INBOX
    local task_file=$(get_next_task)
    
    if [ -z "$task_file" ]; then
        log "Non hai tarefas en INBOX, esperando..."
        echo "NO_TASKS"
        return 0
    fi
    
    local task_name=$(basename "$task_file")
    log "Atopada tarefa: $task_name"
    
    # Move to ACTIVE
    local active_task=$(move_task "$task_file" "ACTIVE")
    local log_file="$LOG_DIR/${task_name%.md}_$(date '+%Y%m%d_%H%M%S').log"
    
    log "Executando Codex..."
    
    # Extract objective from task
    local objective=$(grep -A 50 "^## 1. Objetivo" "$active_task" 2>/dev/null | grep -v "^##" | head -20 | tr '\n' ' ')
    
    if [ -z "$objective" ]; then
        objective=$(cat "$active_task")
    fi
    
    log "Tarefa: $objective"
    
    # Execute Codex
    cd "$WORKDIR"
    local start_time=$(date '+%s')
    
    local codex_output=$(codex exec "$objective" 2>&1) || {
        log "ERROR: Codex execution failed"
        echo "$codex_output" > "$log_file"
        move_task "$active_task" "INBOX"
        echo "CODEX_ERROR"
        return 1
    }
    
    local end_time=$(date '+%s')
    local duration=$((end_time - start_time))
    
    # Save log
    echo "$codex_output" > "$log_file"
    
    # Extract summary
    local summary=$(echo "$codex_output" | tail -100 | grep -E "resultado|result|summary|✅|❌|error|Error" | head -10 | tr '\n' ' ')
    
    log "Completado en ${duration}s"
    log "Resumo: $summary"
    
    # Move to REVIEW
    move_task "$active_task" "REVIEW"
    
    log "=== ENERGYOS WORKFLOW END ==="
    echo "TASK_COMPLETED:$task_name:$duration"
    
    return 0
}

# Status command
status() {
    echo "=== ENERGYOS WORKFLOW STATUS ==="
    echo "INBOX:   $(ls -1 "$TASKS_DIR/INBOX/"*.md 2>/dev/null | wc -l)"
    echo "ACTIVE:  $(ls -1 "$TASKS_DIR/ACTIVE/"*.md 2>/dev/null | wc -l)"
    echo "REVIEW:  $(ls -1 "$TASKS_DIR/REVIEW/"*.md 2>/dev/null | wc -l)"
    echo "APPLIED: $(ls -1 "$TASKS_DIR/APPLIED/"*.md 2>/dev/null | wc -l)"
    echo "CLOSED:  $(ls -1 "$TASKS_DIR/CLOSED/"*.md 2>/dev/null | wc -l)"
    echo "LOG:     $(ls -1 "$LOG_DIR/"*.log 2>/dev/null | wc -l)"
    echo ""
    if [ -f "$LOG_DIR/workflow.log" ]; then
        echo "Últimas 5 liñas do log:"
        tail -5 "$LOG_DIR/workflow.log"
    fi
}

# Process single task
process() {
    main
}

# Retry failed tasks
retry() {
    log "=== RETRY FAILED TASKS ==="
    local failed=$(ls -1 "$TASKS_DIR/CLOSED/"*.md 2>/dev/null | head -5)
    for task in $failed; do
        log "Retry: $(basename "$task")"
        move_task "$task" "INBOX"
    done
}

# Accept task in REVIEW
accept() {
    local task_file=$(ls -1 "$TASKS_DIR/REVIEW/"*.md 2>/dev/null | head -1)
    if [ -z "$task_file" ]; then
        echo "Non hai tarefas en REVIEW"
        return 1
    fi
    move_task "$task_file" "APPLIED"
    echo "Tarefa aceptada"
}

# Reject task in REVIEW (back to INBOX)
reject() {
    local task_file=$(ls -1 "$TASKS_DIR/REVIEW/"*.md 2>/dev/null | head -1)
    if [ -z "$task_file" ]; then
        echo "Non hai tarefas en REVIEW"
        return 1
    fi
    move_task "$task_file" "INBOX"
    echo "Tarefa devuelta a INBOX"
}

# List tasks in REVIEW
list_review() {
    local tasks=$(ls -1 "$TASKS_DIR/REVIEW/"*.md 2>/dev/null)
    if [ -z "$tasks" ]; then
        echo "Non hai tarefas en REVIEW"
        return 0
    fi
    echo "=== TAREFAS EN REVIEW ==="
    for task in $tasks; do
        echo "- $(basename "$task")"
        head -10 "$task"
        echo ""
        # Show log if exists
        local log_file="$LOG_DIR/$(basename "$task" .md)_*.log" 2>/dev/null
        echo "--- Output recente ---"
        tail -50 $log_file 2>/dev/null | head -20
        echo ""
    done
}

# Main case
case "${1:-process}" in
    process)
        process
        ;;
    status)
        status
        ;;
    retry)
        retry
        ;;
    accept)
        accept
        ;;
    reject)
        reject
        ;;
    list-review)
        list_review
        ;;
    *)
        echo "Uso: $0 [process|status|retry|accept|reject|list-review]"
        echo ""
        echo "Comandos:"
        echo "  process    - Procesa seguinte tarefa en INBOX (default)"
        echo "  status     - Mostra estado do workflow"
        echo "  retry      - Move tarefas de CLOSED a INBOX"
        echo "  accept     - Move tarefa de REVIEW a APPLIED"
        echo "  reject     - Move tarefa de REVIEW a INBOX"
        echo "  list-review - Lista tarefas en REVIEW"
        ;;
esac
