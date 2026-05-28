#!/bin/bash
# EnergyOS Workflow Runner - Estilo Clawsweeper
# Autor: Nécora (OpenClaw)
# Uso: bash workflow-runner.sh [command]

set -e

WORKDIR=~/.openclaw/workspace/energyos
TASKS_DIR=$WORKDIR/TASKS
EXPORT PATH=$PATH:~/.nvm/versions/node/v25.9.0/bin

source ~/.nvm/versions/node/v25.9.0/etc/nvm.sh 2>/dev/null || true

log() { echo "[$(date '+%H:%M:%S')] $*"; }

# Función: Processar seguinte tarefa en INBOX
process_next() {
    local task_file=$(ls -1 "$TASKS_DIR/INBOX/"*.md 2>/dev/null | head -1)
    
    if [ -z "$task_file" ]; then
        log "Non hai tarefas en INBOX"
        return 1
    fi
    
    local task_name=$(basename "$task_file")
    log "Atopada tarefa: $task_name"
    
    # Mover a ACTIVE
    mv "$task_file" "$TASKS_DIR/ACTIVE/$task_name"
    local active_task="$TASKS_DIR/ACTIVE/$task_name"
    
    # Extraer conteúdo da tarefa
    local task_content=$(cat "$active_task")
    local task_objective=$(echo "$task_content" | grep -A 50 "^## 1. Objetivo" | head -20)
    
    log "Executando Cline..."
    log "Tarefa: $task_objective"
    
    # Executar en Cline (headless, auto-approve)
    cd "$WORKDIR"
    local result=$(cline -y "$task_objective" 2>&1) || true
    
    # Gardar resultado
    echo "$result" > "$TASKS_DIR/ACTIVE/${task_name%.md}.log"
    
    # Mover a REVIEW
    mv "$active_task" "$TASKS_DIR/REVIEW/$task_name"
    mv "$TASKS_DIR/ACTIVE/${task_name%.md}.log" "$TASKS_DIR/REVIEW/${task_name%.md}.log"
    
    log "Tarefa movida a REVIEW para verificación"
    echo ""
    echo "=== RESULTADO ==="
    echo "$result" | tail -50
    echo "=================="
    
    return 0
}

# Función: Verificar tarefa en REVIEW
review_task() {
    local task_file=$(ls -1 "$TASKS_DIR/REVIEW/"*.md 2>/dev/null | head -1)
    
    if [ -z "$task_file" ]; then
        log "Non hai tarefas en REVIEW"
        return 1
    fi
    
    local task_name=$(basename "$task_file")
    local log_file="$TASKS_DIR/REVIEW/${task_name%.md}.log"
    
    echo ""
    echo "=== TAREFA EN REVIEW: $task_name ==="
    echo ""
    echo "--- FICHEIRO: ---"
    cat "$task_file"
    echo ""
    echo "--- LOG: ---"
    tail -80 "$log_file" 2>/dev/null || echo "Sen log"
    echo ""
    echo "=================================="
    echo "Accions dispoñibles:"
    echo "  accept - Mover a APPLIED"
    echo "  retry  - Volver a INBOX"
    echo "  reject - Mover a CLOSED"
    echo ""
    read -p "Acción [accept/retry/reject]: " action
    
    case $action in
        accept)
            mv "$task_file" "$TASKS_DIR/APPLIED/$task_name"
            [ -f "$log_file" ] && mv "$log_file" "$TASKS_DIR/APPLIED/${task_name%.md}.log"
            log "Tarefa aceptada e movida a APPLIED"
            ;;
        retry)
            mv "$task_file" "$TASKS_DIR/INBOX/$task_name"
            [ -f "$log_file" ] && rm "$log_file"
            log "Tarefa devolta a INBOX para retry"
            ;;
        reject)
            mv "$task_file" "$TASKS_DIR/CLOSED/$task_name"
            [ -f "$log_file" ] && mv "$log_file" "$TASKS_DIR/CLOSED/${task_name%.md}.log"
            log "Tarefa pechada"
            ;;
        *)
            log "Acción non válida"
            return 1
            ;;
    esac
    
    return 0
}

# Main
case "${1:-}" in
    process)
        process_next
        ;;
    review)
        review_task
        ;;
    status)
        echo "=== ENERGYOS WORKFLOW STATUS ==="
        echo "INBOX:  $(ls -1 "$TASKS_DIR/INBOX/"*.md 2>/dev/null | wc -l) tarefas"
        echo "ACTIVE: $(ls -1 "$TASKS_DIR/ACTIVE/"*.md 2>/dev/null | wc -l) tarefas"
        echo "REVIEW: $(ls -1 "$TASKS_DIR/REVIEW/"*.md 2>/dev/null | wc -l) tarefas"
        echo "APPLIED: $(ls -1 "$TASKS_DIR/APPLIED/"*.md 2>/dev/null | wc -l) tarefas"
        echo "CLOSED: $(ls -1 "$TASKS_DIR/CLOSED/"*.md 2>/dev/null | wc -l) tarefas"
        ;;
    *)
        echo "Uso: $0 [process|review|status]"
        echo ""
        echo "Comandos:"
        echo "  process - Procesa seguinte tarefa en INBOX"
        echo "  review  - Verifica tarefas en REVIEW"
        echo "  status  - Mostra estado do workflow"
        ;;
esac
