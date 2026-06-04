#!/usr/bin/env bash
set -euo pipefail

rot=$(cd "$(dirname "$0")/.." && pwd)
cd "$rot"

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Stash or commit local changes before publishing."
  exit 1
fi

git branch -D publish-only 2>/dev/null || true
git subtree split --prefix=option-1 -b publish-only
git push origin publish-only:main --force
git push origin publish-only:gh-pages --force

echo "Published option-1 to origin main and gh-pages."
echo "Site: https://eliotbosman.github.io/01_BXYZ_AA/"
