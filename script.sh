# ...existing code...
#!/usr/bin/env bash
set -euo pipefail

RENDER_DEPLOY_HOOK_URL="https://api.render.com/deploy/srv-d248knvdiees73agf5l0?key=7s37bY5KGhc"
echo "🚀 Deploying backend to Render..."
RENDER_DEPLOY_HOOK_URL=$(echo "$RENDER_DEPLOY_HOOK_URL" | tr -d '[:space:]')
echo "Length: ${#RENDER_DEPLOY_HOOK_URL} chars"
echo "Deploy Hook URL: '$RENDER_DEPLOY_HOOK_URL'"
curl -X POST "$RENDER_DEPLOY_HOOK_URL"