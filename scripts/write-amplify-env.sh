#!/usr/bin/env bash
# Writes Amplify Console environment variables into .env.production so Next.js SSR
# can read them at runtime. See: https://docs.aws.amazon.com/amplify/latest/userguide/ssr-environment-variables.html
set -euo pipefail

OUTPUT=".env.production"
: > "$OUTPUT"

append_if_set() {
  local name="$1"
  if [ -n "${!name:-}" ]; then
    printf '%s=%s\n' "$name" "${!name}" >> "$OUTPUT"
  fi
}

# Server-side (required for SSR + next.config rewrites)
append_if_set API_URL
append_if_set LOG_LEVEL
append_if_set IMAGE_REMOTE_HOSTNAMES
append_if_set SERVER_API_BASE

# Client-side (inlined at build; also written for consistency)
if env | grep -E '^NEXT_PUBLIC_' >> "$OUTPUT" 2>/dev/null; then
  :
fi

if ! grep -q '^API_URL=' "$OUTPUT"; then
  echo "ERROR: API_URL is not set in Amplify environment variables." >&2
  echo "Add it under Hosting → Environment variables in the Amplify console." >&2
  exit 1
fi

echo "Amplify env: wrote $(grep -c '=' "$OUTPUT" || true) variables to $OUTPUT"
