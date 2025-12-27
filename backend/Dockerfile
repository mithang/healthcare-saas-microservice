FROM node:20-alpine AS base
RUN apk add --no-cache openssl libc6-compat

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept build argument for the app name (e.g., auth, user, gateway)
ARG APP_NAME

# Generate Prisma Client using the service-specific schema if it exists
RUN if [ -f "apps/${APP_NAME}/prisma/schema.prisma" ]; then \
        npx prisma generate --schema apps/${APP_NAME}/prisma/schema.prisma; \
    fi

RUN npx nest build ${APP_NAME}

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Re-declare ARG APP_NAME to use it in this stage
ARG APP_NAME
ENV NODE_ENV production

COPY --from=builder /app/dist/apps/${APP_NAME} ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
RUN if [ -d "/app/apps/${APP_NAME}/prisma" ]; then \
        cp -r /app/apps/${APP_NAME}/prisma ./prisma; \
    fi

# Expose ports (can be overridden by docker-compose)
EXPOSE 3000

CMD ["node", "dist/main"]
