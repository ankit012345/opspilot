
#!/usr/bin/env bash

echo "================================"
echo "     OpsPilot Health Check"
echo "================================"

if curl -fsS http://localhost:3000/api/health; then
    echo
    echo "SUCCESS: Application is healthy."
else
    echo
    echo "ERROR: Application health check failed."
    exit 1
fi
# Git practice: tracking my first change