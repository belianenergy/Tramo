#!/usr/bin/env bash
# git-backup.sh — Commit + push automático con reintentos
# Uso: ./scripts/git-backup.sh [mensaxe de commit]
# Se non se pasa mensaxe, úsase "auto-backup YYYY-MM-DD HH:mm"

set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO"

MSG="${1:-auto-backup $(date '+%Y-%m-%d %H:%M')}"

# Asegurar que .gitignore cobre cousas sensibles
if ! git config user.name >/dev/null 2>&1; then
  git config user.name "Nécora 🦀"
fi
if ! git config user.email >/dev/null 2>&1; then
  git config user.email "necora@belian.energy"
fi

# Comprobar se hai cambios
if git diff --quiet && git diff --cached --quiet; then
  echo "✅ Nada que commitar — working tree clean."
  exit 0
fi

# Backup automático — copia os ficheiros críticos antes de commit
TIMESTAMP=$(date '+%Y%m%d-%H%M%S')
mkdir -p backups
for f in app/page.tsx app/globals.css app/app/page.tsx app/app/layout.tsx; do
  if [ -f "$f" ]; then
    cp "$f" "backups/$(basename "$f").pre-commit-$TIMESTAMP"
    echo "📁 Backup: backups/$(basename "$f").pre-commit-$TIMESTAMP"
  fi
done

# Engadir todo e commit
git add -A
git commit -m "$MSG" || echo "ℹ️ Commit baleiro ou xa feito"

# Push con reintentos (ata 3 intentos, 5s entre eles)
for i in 1 2 3; do
  echo "📤 Push intento $i/3..."
  if timeout 15 git push origin main 2>/dev/null; then
    echo "✅ Push exitoso"
    exit 0
  fi
  echo "⚠️ Push fallou, reintento en 5s..."
  sleep 5
done

echo "❌ Push fallou despois de 3 intentos (rede ou gateway inestable)"
echo "   O commit local está seguro: $(git rev-parse HEAD)"
exit 1
