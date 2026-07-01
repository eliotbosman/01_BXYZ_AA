#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
THEME="$ROOT/wp-theme/theme/bxyz-anjaaurand"

cp -R "$ROOT/css/." "$THEME/css/"
cp -R "$ROOT/shared/." "$THEME/shared/"

for f in bild-modal.js galleri-injekt.js galleri-scroll.js innehall-fade.js mobil-index.js sidfot-panel.js verk-index-layout.js verk-index-panel.js; do
  cp "$ROOT/js/$f" "$THEME/js/$f"
done

echo "synced css, shared, and 8 js modules to theme"
echo "not synced: prosjekter.js (static = hardcoded seed, wp = BXYZ_DATA)"
