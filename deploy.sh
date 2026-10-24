#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

npm ci
npm run typecheck
npm test
npm run build
npm run test:dist

release="releases/$(date +%Y%m%d%H%M%S)"
mkdir -p releases
cp -r dist "$release"
ln -sfn "$release" current.tmp
mv -T current.tmp current

ls -1dt releases/* | tail -n +6 | xargs -r rm -rf
echo "Publié : $release"
