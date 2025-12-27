#!/bin/bash
echo "Testing backend service builds..."
SUCCESS=0
FAIL=0
FAILED=()
for dir in apps/*/; do
  SVC=$(basename "$dir")
  echo -n "$SVC... "
  if npx nest build "$SVC" > /dev/null 2>&1; then
    echo "✅"
    ((SUCCESS++))
  else
    echo "❌"
    ((FAIL++))
    FAILED+=("$SVC")
  fi
done
echo "Success: $SUCCESS, Failed: $FAIL"
[ $FAIL -gt 0 ] && printf '%s\n' "${FAILED[@]}"
