#!/usr/bin/env bash
# Запускает smoke-тесты для всего приложения VamoS.
# Использование: bash run-smoke.sh
# Запускать после каждого изменения кода (см. CLAUDE.md).

set -e
cd "$(dirname "$0")/tests"

# Устанавливаем зависимости если нужно
if [ ! -d "node_modules" ]; then
    echo "→ npm install (первый запуск)"
    npm install
    npx playwright install chromium --with-deps 2>/dev/null || true
fi

echo ""
echo "▶ VamoS smoke tests"
echo "══════════════════════════════════"
npx playwright test "$@"
