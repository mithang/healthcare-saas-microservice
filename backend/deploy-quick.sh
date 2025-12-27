#!/bin/bash

echo "🏗️  Quick Docker Build - Core Services Only"
echo "=========================================="
echo ""

# Build only essential services for testing
CORE_SERVICES=(
    "api-gateway"
    "auth-service"
    "user-service"
    "partner-service"
    "content-service"
)

echo "📦 Starting infrastructure..."
docker-compose up -d rabbitmq db redis

echo ""
echo "🔨 Building core services..."
for SERVICE in "${CORE_SERVICES[@]}"; do
    echo "  Building $SERVICE..."
    docker build --build-arg APP_NAME=$SERVICE -t saas-$SERVICE:latest -f Dockerfile . 
done

echo ""
echo "🚀 Starting services..."
docker-compose up -d api-gateway auth-service user-service partner-service content-service

echo ""
echo "✅ Core services deployed!"
echo ""
echo "Test API Gateway: curl http://localhost:3001/health"
echo "View logs: docker-compose logs -f api-gateway"
echo ""
