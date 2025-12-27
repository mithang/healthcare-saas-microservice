#!/bin/bash

echo "🚀 Healthcare SaaS Microservices - Docker Deployment Script"
echo "=========================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
SERVICES=(
    "api-gateway"
    "auth-service"
    "user-service"
    "partner-service"
    "booking-service"
    "analytic-service"
    "content-service"
    "community-service"
    "education-service"
    "engagement-service"
    "finance-service"
    "gamification-service"
    "live-service"
    "marketing-service"
    "notification-service"
    "payment-service"
    "report-service"
    "search-service"
    "seminar-service"
    "support-service"
    "survey-service"
    "ai-service"
    "apikey-service"
    "audit-log"
    "backgroundjob-service"
    "file-service"
    "setting-service"
)

# Step 1: Start infrastructure services
echo -e "${YELLOW}📦 Step 1: Starting infrastructure services...${NC}"
docker-compose up -d rabbitmq db redis

echo "Waiting for infrastructure to be ready..."
sleep 10

# Step 2: Run database migrations
echo -e "${YELLOW}🗄️  Step 2: Running database migrations...${NC}"
# This will be done by each service on startup

# Step 3: Build Docker images for all services
echo -e "${YELLOW}🔨 Step 3: Building Docker images for all services...${NC}"
BUILD_SUCCESS=0
BUILD_FAILED=0

for SERVICE in "${SERVICES[@]}"; do
    echo -e "${YELLOW}Building $SERVICE...${NC}"
    if docker build --build-arg APP_NAME=$SERVICE -t saas-$SERVICE:latest -f Dockerfile . > /dev/null 2>&1; then
        echo -e "${GREEN}✅ $SERVICE built successfully${NC}"
        ((BUILD_SUCCESS++))
    else
        echo -e "${RED}❌ $SERVICE build failed${NC}"
        ((BUILD_FAILED++))
    fi
done

echo ""
echo "Build Summary:"
echo "  Success: $BUILD_SUCCESS"
echo "  Failed: $BUILD_FAILED"
echo ""

# Step 4: Start all services
echo -e "${YELLOW}🚀 Step 4: Starting all microservices...${NC}"
docker-compose up -d

# Step 5: Show status
echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Services status:"
docker-compose ps

echo ""
echo "📊 Access points:"
echo "  - API Gateway: http://localhost:3001"
echo "  - RabbitMQ Management: http://localhost:15672 (guest/guest)"
echo "  - PostgreSQL: localhost:5432"
echo "  - Redis: localhost:6379"
echo ""
echo "📝 Logs: docker-compose logs -f [service-name]"
echo "🛑 Stop: docker-compose down"
echo ""
