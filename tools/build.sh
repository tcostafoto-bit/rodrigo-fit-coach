#!/bin/bash
# Junta as partes de src/ no index.html que a Vercel publica.
set -e
cd "$(dirname "$0")/.."
cat src/00-head.html src/01-lib-base.js src/01b-lib-new.js src/02-program.js src/03-engine.js > index.html
echo "index.html: $(wc -c < index.html) bytes"
